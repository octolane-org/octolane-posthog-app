import { Plugin, PluginMeta } from "@posthog/plugin-scaffold";
// @ts-ignore
import { resetMeta } from "@posthog/plugin-scaffold/test/utils";

import * as index from "./index";
import type { PluginConfig } from "./types";

const { setupPlugin } = index as Required<Plugin>;

const defaultConfig: PluginConfig = {
  octolaneApiKey: "KEY",
};

async function resetMetaWithGeoIp(): Promise<PluginMeta<string>> {
  return resetMeta({
    geoip: {
      locate: (ipAddress: string) => {
        return ipAddress;
      },
    },
  }) as PluginMeta<string>;
}

describe("OctoLane Plugin", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe("setupPlugin()", () => {
    function callSetupPlugin(configOverrides: Partial<PluginConfig>): any {
      const meta = { config: { ...configOverrides } };
      setupPlugin(meta as any);
      return meta;
    }

    it("octolane config sets appropriate config for default config", () => {
      const global = callSetupPlugin(defaultConfig);

      expect(global.config).toEqual(
        expect.objectContaining({
          octolaneApiKey: defaultConfig.octolaneApiKey,
        }),
      );
    });

    it("octolane config respects overrides", () => {
      const OVERRIDDEN_API_KEY = "OVERRIDDEN";

      const global = callSetupPlugin({
        octolaneApiKey: OVERRIDDEN_API_KEY,
      });
      expect(global.config).toEqual(
        expect.objectContaining({
          octolaneApiKey: OVERRIDDEN_API_KEY,
        }),
      );
    });
  });
});
