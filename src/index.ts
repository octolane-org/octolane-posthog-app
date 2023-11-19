import { Plugin, PluginEvent } from "@posthog/plugin-scaffold";

import { enrichOctoLaneIp } from "./sendEventToOctolane";

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
 * Plugin method that processes event
 * @param event - The event to process
 * @param meta - The plugin metadata
 * @returns
 */
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
