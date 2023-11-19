import { Meta, PluginEvent } from "@posthog/plugin-scaffold";

export interface PluginConfig {
  octolaneApiKey: string;
}

export interface OctoLaneConfig {
  event: PluginEvent;
  metrics: Meta["metrics"];
  geoip?: Meta["geoip"];
  octolaneApiKey: PluginConfig["octolaneApiKey"];
}
