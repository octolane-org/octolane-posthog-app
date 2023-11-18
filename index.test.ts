import { PluginConfig, setupPlugin } from "./index";
// @ts-ignore
import { createPageview, resetMeta } from "@posthog/plugin-scaffold/test/utils";

import * as index from "./index";
import { Plugin, PluginMeta } from "@posthog/plugin-scaffold";

const { processEvent } = index as Required<Plugin>;

// const events = [
//   {
//     event: "test",
//     properties: {},
//     distinct_id: "did1",
//     team_id: 1,
//     uuid: "37114ebb-7b13-4301-b849-0d0bd4d5c7e5",
//     ip: "127.0.0.1",
//     timestamp: "2022-08-18T15:42:32.597Z",
//   },
//   {
//     event: "test2",
//     properties: {},
//     distinct_id: "did1",
//     team_id: 1,
//     uuid: "37114ebb-7b13-4301-b859-0d0bd4d5c7e5",
//     ip: "127.0.0.1",
//     timestamp: "2022-08-18T15:42:32.597Z",
//     elements: [{ attr_id: "haha" }],
//   },
// ];

const defaultConfig: PluginConfig = {
  octolaneApiKey: "KEY",
};

async function resetMetaWithMmdb(): Promise<PluginMeta<string>> {
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

    // mockedMeta = {
    //   global: {
    //     buffer: {
    //       add: jest.fn(),
    //     },
    //     eventsToIgnore: new Set(["ignore me"]),
    //   },
    //   config: defaultConfig,
    // };
  });

  describe("setupPlugin()", () => {
    function callSetupPlugin(configOverrides: Partial<PluginConfig>): any {
      const meta = { config: { ...configOverrides } };
      setupPlugin!(meta as any);
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

  describe("processEvent()", () => {
    const MOCK_IP = "89.160.20.129";

    it("does not process events that should be ignored", async () => {
      const event = await processEvent(
        { ...createPageview(), ip: MOCK_IP },
        await resetMetaWithMmdb(),
      );

      expect(event?.event).toEqual("$pageview");
      expect(event?.ip).toEqual(MOCK_IP);
    });
  });
});
