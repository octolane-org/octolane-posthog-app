import { OctoLaneConfig } from "./types";

/**
 * Send an event to OctoLane for IP enrichment
 * @param {OctoLaneConfig} params
 */
export const enrichOctoLaneIp = async (params: OctoLaneConfig) => {
  const eventBody = {
    event: params.event,
    geoip: params.geoip,
    metrics: params.metrics,
  };

  const response = await fetch("https://events.octolane.com/posthog", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": params.octolaneApiKey },
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
