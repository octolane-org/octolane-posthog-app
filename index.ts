import { Meta, Plugin, PluginEvent, RetryError } from "@posthog/plugin-scaffold";

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

  console.log("eventBody");
  console.log(eventBody);

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
    throw new RetryError("OctoLane API key is set");
  }
};

// Plugin method that processes event
export const processEvent: Plugin["processEvent"] = async (
  event: PluginEvent,
  { config, cache, ...othersMetadata },
) => {
  const counterValue = (await cache.get("greeting_counter", 0)) as number;
  cache.set("greeting_counter", counterValue + 1);

  if (!event.properties) event.properties = {};

  if (config.octolaneApiKey) {
    event.properties["octolaneApiKey"] = config.octolaneApiKey;
    event.properties["greeting_counter"] = counterValue;
    await enrichOctoLaneIp({
      event,
      geoip: othersMetadata.geoip,
      metrics: othersMetadata.metrics,
      octolaneApiKey: config.octolaneApiKey,
    });
  }

  return event;
};
