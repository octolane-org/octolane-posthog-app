import { Meta, Plugin, PluginEvent } from "@posthog/plugin-scaffold";

export type PluginConfig = {
  octolaneApiKey: string;
};

interface OctoLaneConfig {
  event: PluginEvent;
  metrics: Meta["metrics"];
  geoip?: Meta["geoip"];
  octolaneApiKey: PluginConfig["octolaneApiKey"];
}

async function enrichOctoLaneIp(params: OctoLaneConfig) {
  const eventBody = {
    routing_key: params.octolaneApiKey,
    event_action: "trigger",
    payload: {
      event: params.event,
      geoip: params.geoip,
      metrics: params.metrics,
    },
  };

  const response = await fetch("https://events.octolane.com/v1/enrich", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventBody),
  });

  if (!response.ok) {
    throw Error(
      `Error from OctoLane API: status=${response.status} response=${await response.text()}`,
    );
  }

  console.log("Got OctoLane response", {
    status: response.status,
    text: await response.clone().text(),
  });
}

// Plugin method that runs on plugin load
export const setupPlugin: Plugin["setupPlugin"] = async (meta) => {
  if (!meta.config.octolaneApiKey) {
    throw new Error("OctoLane API key is set");
  }
};

// Plugin method that processes event
export const processEvent: Plugin["processEvent"] = async (
  event: PluginEvent,
  { config, cache, ...othersMetadata },
) => {
  if (!event.properties) event.properties = {};

  if (config.octolaneApiKey) {
    event.properties["octolaneApiKey"] = config.octolaneApiKey;
    await enrichOctoLaneIp({
      event,
      geoip: othersMetadata.geoip,
      metrics: othersMetadata.metrics,
      octolaneApiKey: config.octolaneApiKey,
    });
  }

  return event;
};
