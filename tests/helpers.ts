import type {
  HassDeviceRegistryEntry,
  HassEntityRegistryEntry,
  HomeAssistant,
} from "../src/types";

export interface MockState {
  state: string;
  attributes?: Record<string, unknown>;
  last_updated?: string;
}

export function makeHass(
  states: Record<string, MockState>,
  registry: Record<string, Partial<HassEntityRegistryEntry>> = {},
  devices: Record<string, Partial<HassDeviceRegistryEntry>> = {}
): HomeAssistant {
  const now = "2026-01-01T00:00:00.000Z";
  const hassStates: HomeAssistant["states"] = {};
  for (const [entityId, entry] of Object.entries(states)) {
    hassStates[entityId] = {
      entity_id: entityId,
      state: entry.state,
      attributes: entry.attributes ?? {},
      last_changed: entry.last_updated ?? now,
      last_updated: entry.last_updated ?? now,
    };
  }

  const hassEntities: NonNullable<HomeAssistant["entities"]> = {};
  for (const [entityId, entry] of Object.entries(registry)) {
    hassEntities[entityId] = { entity_id: entityId, ...entry };
  }

  const hassDevices: NonNullable<HomeAssistant["devices"]> = {};
  for (const [id, device] of Object.entries(devices)) {
    hassDevices[id] = { id, ...device };
  }

  return {
    states: hassStates,
    entities: hassEntities,
    devices: hassDevices,
    callWS: async <T>() => ({}) as T,
  };
}
