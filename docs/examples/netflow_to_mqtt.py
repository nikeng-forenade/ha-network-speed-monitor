#!/usr/bin/env python3
"""Publish per-device network rates from ntopng to Home Assistant over MQTT.

ntopng (fed by OPNsense softflowd or os-ntopng) reports cumulative bytes per
host and interface. This script turns those counters into Mbps and publishes
Home Assistant MQTT discovery sensors:

    sensor.netflow_<device>_download
    sensor.netflow_<device>_upload

Both use ``device_class: data_rate`` and ``unit_of_measurement: Mbit/s``, which
is what the Network Speed Monitor Lovelace card discovers automatically.

Point ``--ifid`` at the NordVPN interface to get "which devices use the VPN"
with real per-device rates. See docs/netflow-per-device-vpn.md for the setup.

Requires: requests, paho-mqtt >= 2  (pip install requests "paho-mqtt>=2")
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import re
import signal
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import requests

try:
    import paho.mqtt.client as mqtt
except ImportError:  # pragma: no cover - only hit when the dependency is missing
    mqtt = None  # type: ignore[assignment]


LOG = logging.getLogger("netflow_to_mqtt")

MIB = 1_000_000


@dataclass
class Rate:
    """Current rate for one host."""

    ip: str
    name: str
    download_mbps: float
    upload_mbps: float

    @property
    def slug(self) -> str:
        return slugify(self.name)


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")
    return slug or "host"


def fetch_interfaces(
    session: requests.Session, base_url: str, timeout: float
) -> list[dict[str, Any]]:
    """Return ntopng's monitored interfaces so the right `--ifid` can be picked."""
    url = f"{base_url.rstrip('/')}/lua/rest/v2/get/ntopng/interfaces.lua"
    response = session.get(url, timeout=timeout)
    response.raise_for_status()
    payload = response.json()
    if payload.get("rc") != 0:
        raise RuntimeError(f"ntopng error: {payload.get('rc_str') or payload}")
    return list(payload.get("rsp") or [])


def fetch_hosts(
    session: requests.Session, base_url: str, ifid: int, timeout: float
) -> dict[str, dict[str, Any]]:
    """Return the active hosts of one interface, keyed by IP."""
    url = f"{base_url.rstrip('/')}/lua/rest/v2/get/host/custom_data.lua"
    response = session.get(
        url,
        params={"ifid": ifid, "field_alias": "ip,name,bytes.sent,bytes.rcvd"},
        timeout=timeout,
    )
    response.raise_for_status()
    payload = response.json()

    if payload.get("rc") != 0:
        raise RuntimeError(f"ntopng error: {payload.get('rc_str') or payload}")

    hosts: dict[str, dict[str, Any]] = {}
    for entry in payload.get("rsp") or []:
        ip = entry.get("ip")
        if not ip:
            continue
        hosts[str(ip)] = entry
    return hosts


def byte_value(entry: dict[str, Any], key: str) -> float:
    value = entry.get(key, 0)
    try:
        return max(0.0, float(value))
    except (TypeError, ValueError):
        return 0.0


def compute_rates(
    hosts: dict[str, dict[str, Any]],
    previous: dict[str, tuple[float, float]],
    elapsed: float,
    names: dict[str, str],
) -> tuple[list[Rate], dict[str, tuple[float, float]]]:
    """Convert cumulative byte counters into Mbps rates."""
    counters: dict[str, tuple[float, float]] = {}
    rates: list[Rate] = []

    for ip, entry in hosts.items():
        sent = byte_value(entry, "bytes.sent")
        received = byte_value(entry, "bytes.rcvd")
        counters[ip] = (sent, received)

        before = previous.get(ip)
        if before is None or elapsed <= 0:
            # First sample: no rate yet, publish 0 instead of a bogus spike.
            download = upload = 0.0
        else:
            prev_sent, prev_rcvd = before
            # A counter that went backwards was reset; count what we see now.
            delta_sent = sent - prev_sent if sent >= prev_sent else sent
            delta_rcvd = received - prev_rcvd if received >= prev_rcvd else received
            upload = (delta_sent * 8) / (elapsed * MIB)
            download = (delta_rcvd * 8) / (elapsed * MIB)

        name = names.get(ip) or str(entry.get("name") or "").strip() or ip
        rates.append(Rate(ip=ip, name=name, download_mbps=download, upload_mbps=upload))

    return rates, counters


def load_names(path: str | None) -> dict[str, str]:
    if not path:
        return {}
    content = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(content, dict):
        raise ValueError("--names must point to a JSON object of ip -> name")
    return {str(key): str(value) for key, value in content.items()}


def _host_display(entry: dict[str, Any]) -> str:
    """Friendly label from ntopng's hostname (`appletv.fritz.box` -> `Appletv`)."""
    raw = str(entry.get("name") or "").strip()
    if "." in raw:
        raw = raw.split(".")[0]
    if raw and raw == raw.lower():
        raw = raw.replace("_", " ").title()
    return raw


def render_ha_yaml(
    base_url: str,
    ifid: int,
    hosts: dict[str, dict[str, Any]],
    names: dict[str, str],
) -> str:
    """Render a copy-paste Home Assistant `rest` block for the given hosts."""
    resource = (
        f"{base_url.rstrip('/')}/lua/rest/v2/get/host/custom_data.lua"
        f"?ifid={ifid}&field_alias=ip,name,bytes.sent,bytes.rcvd"
    )
    lines = [
        "rest:",
        f'  - resource: "{resource}"',
        "    authentication: basic",
        "    username: admin",
        "    password: !secret ntopng_password",
        "    scan_interval: 10",
        "    timeout: 10",
        "    sensor:",
    ]

    ordered = sorted(
        hosts.items(),
        key=lambda item: (
            names.get(item[0]) or _host_display(item[1]) or item[0]
        ).lower(),
    )
    for ip, entry in ordered:
        display = names.get(ip) or _host_display(entry) or ip
        for direction, key in (("Download", "bytes.rcvd"), ("Upload", "bytes.sent")):
            lines.extend(
                [
                    f'      - name: "{display} {direction} Bytes"',
                    "        value_template: >-",
                    f"          {{{{ (value_json.rsp | selectattr('ip', 'equalto', '{ip}')",
                    f"              | map(attribute='{key}') | first) | default(0, true) }}}}",
                    "        unit_of_measurement: B",
                    "        device_class: data_size",
                    "        state_class: total_increasing",
                    "",
                ]
            )

    return "\n".join(lines)


class Publisher:
    """Publishes discovery configs once, then only state updates."""

    def __init__(self, args: argparse.Namespace) -> None:
        if mqtt is None:
            raise RuntimeError("paho-mqtt is not installed (pip install 'paho-mqtt>=2')")
        self.args = args
        self.published: set[str] = set()

        client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=args.mqtt_client_id)
        if args.mqtt_user:
            client.username_pw_set(args.mqtt_user, args.mqtt_password)
        if args.mqtt_tls:
            client.tls_set()
        client.will_set(f"{args.topic_prefix}/status", "offline", retain=True)
        client.connect(args.mqtt_host, args.mqtt_port, keepalive=60)
        client.loop_start()
        client.publish(f"{args.topic_prefix}/status", "online", retain=True)
        self.client = client

    def _discovery_topic(self, slug: str, direction: str) -> str:
        return f"{self.args.discovery_prefix}/sensor/netflow_{slug}_{direction}/config"

    def _state_topic(self, slug: str, direction: str) -> str:
        return f"{self.args.topic_prefix}/{slug}/{direction}"

    def discover(self, rate: Rate) -> None:
        if rate.slug in self.published:
            return

        for direction, label, icon in (
            ("download", "download", "mdi:download-network"),
            ("upload", "upload", "mdi:upload-network"),
        ):
            object_id = f"netflow_{rate.slug}_{direction}"
            payload = {
                "name": f"{rate.name} {label}",
                "object_id": object_id,
                "unique_id": object_id,
                "state_topic": self._state_topic(rate.slug, direction),
                "unit_of_measurement": "Mbit/s",
                "device_class": "data_rate",
                "state_class": "measurement",
                "icon": icon,
                "availability_topic": f"{self.args.topic_prefix}/status",
                "device": {
                    "identifiers": [f"netflow_{rate.slug}"],
                    "name": rate.name,
                    "manufacturer": "NetFlow",
                    "model": "ntopng host",
                },
            }
            self.client.publish(
                self._discovery_topic(rate.slug, direction),
                json.dumps(payload),
                retain=True,
            )

        self.published.add(rate.slug)
        LOG.info("discovered %s (%s)", rate.name, rate.ip)

    def publish(self, rate: Rate) -> None:
        self.discover(rate)
        self.client.publish(
            self._state_topic(rate.slug, "download"), f"{rate.download_mbps:.3f}", retain=True
        )
        self.client.publish(
            self._state_topic(rate.slug, "upload"), f"{rate.upload_mbps:.3f}", retain=True
        )

    def close(self) -> None:
        self.client.publish(f"{self.args.topic_prefix}/status", "offline", retain=True)
        self.client.loop_stop()
        self.client.disconnect()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--ntopng-url", default=os.environ.get("NTOPNG_URL", "http://127.0.0.1:3000"), help="ntopng base URL")
    parser.add_argument("--ntopng-user", default=os.environ.get("NTOPNG_USER", "admin"))
    parser.add_argument("--ntopng-password", default=os.environ.get("NTOPNG_PASSWORD", "admin"))
    parser.add_argument(
        "--ntopng-tls-verify", action="store_true", help="verify the ntopng certificate"
    )
    parser.add_argument(
        "--ifid",
        type=int,
        default=int(os.environ.get("NTOPNG_IFID", "0")),
        help="ntopng interface id (use the VPN interface for per-VPN data)",
    )
    parser.add_argument(
        "--list-interfaces",
        action="store_true",
        help="print the monitored interfaces and exit",
    )
    parser.add_argument(
        "--interval",
        type=float,
        default=float(os.environ.get("POLL_INTERVAL", "10")),
        help="poll interval in seconds",
    )
    parser.add_argument("--timeout", type=float, default=10.0, help="HTTP timeout in seconds")
    parser.add_argument("--names", default=os.environ.get("NAMES_FILE"), help="JSON file with ip -> friendly name")
    parser.add_argument("--mqtt-host", default=os.environ.get("MQTT_HOST", "127.0.0.1"))
    parser.add_argument("--mqtt-port", type=int, default=int(os.environ.get("MQTT_PORT", "1883")))
    parser.add_argument("--mqtt-user", default=os.environ.get("MQTT_USER"))
    parser.add_argument("--mqtt-password", default=os.environ.get("MQTT_PASSWORD"))
    parser.add_argument("--mqtt-tls", action="store_true")
    parser.add_argument("--mqtt-client-id", default=os.environ.get("MQTT_CLIENT_ID", "netflow_to_mqtt"))
    parser.add_argument("--discovery-prefix", default="homeassistant")
    parser.add_argument("--topic-prefix", default="netflow")
    parser.add_argument(
        "--print-ha-yaml",
        action="store_true",
        help="print a Home Assistant rest-sensor block for the hosts of --ifid and exit",
    )
    parser.add_argument("--dry-run", action="store_true", help="print rates instead of publishing")
    parser.add_argument("--once", action="store_true", help="stop after one poll")
    parser.add_argument("-v", "--verbose", action="store_true")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
    )

    session = requests.Session()
    session.auth = (args.ntopng_user, args.ntopng_password)
    session.verify = args.ntopng_tls_verify
    names = load_names(args.names)

    if args.list_interfaces:
        try:
            interfaces = fetch_interfaces(session, args.ntopng_url, args.timeout)
        except (requests.RequestException, RuntimeError) as error:
            LOG.error("could not read interfaces: %s", error)
            return 1
        print(f"{'ifid':>5}  {'ifname':<14} name")
        for item in interfaces:
            print(
                f"{str(item.get('ifid', '')):>5}  "
                f"{str(item.get('ifname', '')):<14} {item.get('name', '')}"
            )
        return 0

    if args.print_ha_yaml:
        try:
            hosts = fetch_hosts(session, args.ntopng_url, args.ifid, args.timeout)
        except (requests.RequestException, RuntimeError) as error:
            LOG.error("could not read hosts: %s", error)
            return 1
        print(render_ha_yaml(args.ntopng_url, args.ifid, hosts, names))
        return 0

    publisher = None if args.dry_run else Publisher(args)
    previous: dict[str, tuple[float, float]] = {}
    last_poll: float | None = None
    stopping = False

    def stop(_signum: int, _frame: Any) -> None:
        nonlocal stopping
        stopping = True

    signal.signal(signal.SIGINT, stop)
    signal.signal(signal.SIGTERM, stop)

    try:
        while not stopping:
            started = time.monotonic()
            try:
                hosts = fetch_hosts(session, args.ntopng_url, args.ifid, args.timeout)
                elapsed = (started - last_poll) if last_poll is not None else 0.0
                rates, previous = compute_rates(hosts, previous, elapsed, names)
                last_poll = started

                for rate in sorted(rates, key=lambda item: item.download_mbps, reverse=True):
                    if publisher is None:
                        print(
                            f"{rate.name:<24} {rate.ip:<15} "
                            f"down {rate.download_mbps:8.3f} Mbps  "
                            f"up {rate.upload_mbps:8.3f} Mbps"
                        )
                    else:
                        publisher.publish(rate)
            except (requests.RequestException, RuntimeError, ValueError) as error:
                LOG.warning("poll failed: %s", error)

            if args.once:
                break
            remaining = args.interval - (time.monotonic() - started)
            if remaining > 0:
                time.sleep(remaining)
    finally:
        if publisher is not None:
            publisher.close()

    return 0


if __name__ == "__main__":
    sys.exit(main())
