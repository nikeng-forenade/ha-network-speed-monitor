"""Network Speed Monitor: registers the bundled Lovelace card.

The integration does not create any entities. Its only job is to serve
``network-speed-monitor.js`` and register it as a frontend module, so the card
is available in the dashboard card picker right after the integration is added.
"""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .const import CARD_FILE, DOMAIN, FRONTEND_URL, VERSION

_LOGGER = logging.getLogger(__name__)

DATA_FRONTEND_REGISTERED = f"{DOMAIN}_frontend_registered"


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Serve the card and add it to the frontend module URLs (idempotent)."""
    if hass.data.get(DATA_FRONTEND_REGISTERED):
        return

    card_path = Path(__file__).parent / CARD_FILE
    if not card_path.is_file():
        _LOGGER.error("Card bundle is missing: %s", card_path)
        return

    try:
        from homeassistant.components.http import StaticPathConfig

        await hass.http.async_register_static_paths(
            [StaticPathConfig(FRONTEND_URL, str(card_path), cache_headers=False)]
        )
    except (ImportError, AttributeError):
        # Home Assistant < 2024.7
        hass.http.register_static_path(FRONTEND_URL, str(card_path), cache_headers=False)
    except Exception:  # noqa: BLE001 - never break setup because of the card
        _LOGGER.exception("Could not serve the card at %s", FRONTEND_URL)
        return

    try:
        from homeassistant.components.frontend import add_extra_js_url
    except ImportError:  # pragma: no cover - very old Home Assistant
        add_extra_js_url = None  # type: ignore[assignment]

    url = f"{FRONTEND_URL}?v={VERSION}"
    if add_extra_js_url is not None:
        add_extra_js_url(hass, url)
    else:  # pragma: no cover - fallback for older cores
        hass.data.setdefault("frontend_extra_module_url", set()).add(url)

    hass.data[DATA_FRONTEND_REGISTERED] = True
    _LOGGER.info("Network Speed Monitor card registered at %s", url)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up via YAML (`network_speed_monitor:`)."""
    await _async_register_frontend(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry) -> bool:
    """Set up from a config entry."""
    await _async_register_frontend(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry) -> bool:
    """The frontend registration stays for the lifetime of Home Assistant."""
    return True
