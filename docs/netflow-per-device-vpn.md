# Which devices use NordVPN?

Short answer: Home Assistant and the OPNsense integration expose **per-interface** counters, not
"which LAN client used which gateway". The card can show the NordVPN tunnel totals
(`NordVPN ↓ 120 Mbps ↑ 12 Mbps`), but it cannot tell you that the laptop is the one saturating it.

The OPNsense firewall knows, and there are four ways to get it:

1. Look at the rules / state table (instant, no extra software).
2. NetFlow + ntopng, then MQTT into Home Assistant (per-device numbers, shows up in this card).
3. Per-device firewall rules with counters (no extra software, coarse).
4. Insight / live log (manual inspection).

---

## 1. The quick check inside OPNsense

### Which rules route to the VPN gateway

**Firewall → Rules → LAN → Edit** on the rules that use a *Gateway* other than `default`.

If those rules match an **alias** (Firewall → Aliases) such as `vpn_clients`, the alias members are
exactly the devices that go out through NordVPN. This is the authoritative answer: policy routing
decides it, not the traffic counters.

### Who is using the tunnel right now

**Diagnostics → States** (or `Diagnostics → pfTop`) and filter on the VPN interface (`tun0`, `wg0`,
`ovpnc1`, ... depending on your NordVPN setup). Every state shows the LAN source address; map it to a
name with **Interfaces → DHCP leases** or your static mappings.

The same data from a shell (SSH / plugin `os-shellcmd`):

```sh
# active states on the VPN interface, grouped by LAN client
pfctl -ss | grep -E 'tun|wg|ovpnc' | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn
```

### Firewall live log

**Firewall → Log Files → Live View**, filter `Interface = <NordVPN interface>`. Source IPs of the
passing traffic are the devices on the VPN.

Both the state table and the log are snapshots of *connections*, not bandwidth, and they are gone as
soon as the connection closes — which is why the next section exists.

---

## 2. NetFlow + ntopng → MQTT → this card

This gives real per-device rates over the tunnel, and they appear in the card automatically.

```
OPNsense (softflowd / os-ntopng)
        │  per-flow records (src IP, interface, bytes)
        ▼
   ntopng (host stats per interface)
        │  REST: /lua/rest/v2/get/host/active.lua
        ▼
 netflow_to_mqtt.py  ──►  MQTT discovery  ──►  Home Assistant sensors
                                                sensor.netflow_laptop_download
                                                sensor.netflow_laptop_upload
                                                        │
                                                        ▼
                                        Network Speed Monitor card
```

The trick: **monitor the NordVPN interface**, not (only) LAN. The clients routed through the tunnel
appear on it with their LAN addresses, so "hosts on `tun0`" == "devices using NordVPN".

### Step 1 – get per-flow data out of OPNsense

Either install **os-ntopng** (Services → ntopng) and enable it on the LAN and VPN interfaces, or enable
**NetFlow** (`os-softflowd`, Reporting → Netflow) and send it to ntopng elsewhere. ntopng Community is
enough; host statistics are not a paid feature.

Make sure **both** the LAN and the VPN interface are monitored:

- LAN gives you the device names/traffic in general.
- VPN gives you the subset that is actually tunnelled.

### Step 2 – find the ntopng interface id

```sh
curl -u admin:admin "http://opnsense.local:3000/lua/rest/v2/get/interface/list.lua"
```

Pick the `ifid` of `tun0` / `wg0` / `ovpnc1` (the NordVPN interface).

### Step 3 – run the poller

[`docs/examples/netflow_to_mqtt.py`](examples/netflow_to_mqtt.py) polls ntopng, converts the byte
counters into Mbps and publishes Home Assistant MQTT discovery sensors with
`device_class: data_rate` and `unit_of_measurement: Mbit/s` — the exact shape this card discovers.

```sh
pip install paho-mqtt requests

python netflow_to_mqtt.py \
  --ntopng-url http://192.168.1.1:3000 --ntopng-user admin --ntopng-password secret \
  --ifid 7 \
  --mqtt-host 192.168.1.10 --mqtt-user mqtt --mqtt-password secret \
  --interval 10 \
  --names names.json
```

`names.json` maps IPs to friendly names (optional, the script uses the hostname from ntopng
otherwise):

```json
{
  "192.168.1.42": "Laptop",
  "192.168.1.60": "Apple TV",
  "192.168.1.77": "NAS Server"
}
```

Run it as a systemd service, Docker container, or on any always-on box. It publishes retained values,
so Home Assistant survives restarts.

### Step 4 – use it in the card

```yaml
type: custom:network-speed-monitor
title: Network Speed Monitor
subtitle: Top 10 devices over NordVPN
include_integrations:
  - mqtt
aggregates: separate
```

Because the sensors are `data_rate` Mbit/s with `download`/`upload` in the entity id, discovery picks
them up without any further configuration. If you prefer exact control:

```yaml
include_entities:
  - sensor.netflow_laptop_download
  - sensor.netflow_laptop_upload
  - sensor.netflow_appletv_download
  - sensor.netflow_appletv_upload
```

### Avoiding double counting

The same bytes are visible twice when you monitor both LAN and the tunnel: once on `lan`, once on
`tun0`. Pick one side per card:

- **"Who uses NordVPN" card** → only the tunnel sensors (`--ifid` of the VPN interface).
- **Whole-network card** → only the LAN sensors.

Never mix LAN and tunnel sensors in one ranking; the tunnel traffic is a subset of the LAN traffic.

---

## 3. Per-device firewall rules with counters (no extra software)

If you already have one rule per device (or per alias) that uses the VPN gateway, OPNsense counts the
bytes per rule. Expose those counters with a `command_line` sensor and the card will convert them to a
rate (they are cumulative, and the card handles counters):

```yaml
command_line:
  - sensor:
      name: Laptop VPN bytes
      command: "ssh root@opnsense 'pfctl -vsr | awk \"/<your rule label>/ {print \\$6}\"'"
      unit_of_measurement: B
      device_class: data_size
      state_class: total_increasing
      scan_interval: 30
```

This is coarser (rule level, not host level) and needs SSH, but it has no extra moving parts.

---

## 4. Insight

**Reporting → Insight** shows per-IP totals and is great for a quick "who is downloading", but it
aggregates all gateways. Use it together with the state-table filter above when you only need a
one-off answer.

---

## Privacy note

NetFlow/ntopng records which device talks to which address. Keep ntopng on your LAN, do not expose it
to the internet, and prefer MQTT over TLS (`--mqtt-tls`) if the broker is not local.
