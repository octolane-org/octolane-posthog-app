import { OctoLaneConfig } from "./types";

/**
 * Send an event to OctoLane for IP enrichment
 * @param {OctoLaneConfig} params
 */
export const enrichOctoLaneIp = async (params: OctoLaneConfig) => {
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
};
