import { Plugin } from "@posthog/plugin-scaffold";

/**
 * Plugin method that runs on plugin load
 * @description Check if the OctoLane API key is set
 * @param meta
 */
export const setupPlugin: Plugin["setupPlugin"] = async (meta) => {
  if (!meta.config.octolaneApiKey) {
    throw new Error("OctoLane API key is set");
  }
};

/**
 * Plugin method that send the event to OctoLane webhook
 * @param event - The event to process
 * @param meta - The plugin metadata
 * @returns The webhook payload
 */
export const composeWebhook: Plugin["composeWebhook"] = (
  event,
  { config, cache, ...othersMetadata },
) => {
  if (!event.properties) event.properties = {};

  if (config.octolaneApiKey) {
    event.properties["octolaneApiKey"] = config.octolaneApiKey;
    return {
      url: "https://events.octolane.com/posthog",
      body: JSON.stringify({
        event,
        geoip: othersMetadata.geoip,
        metrics: othersMetadata.metrics,
      }),
      headers: { "Content-Type": "application/json", "x-api-key": config.octolaneApiKey },
      method: "POST",
    };
  }

  return null;
};
