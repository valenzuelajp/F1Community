import { describe, expect, it } from "vitest";
import {
  describeRace,
  shouldShowPodium,
  type JRace,
} from "./jolpica";

/** Relocated round fixture: 2026 Bahrain GP at Sepang (round 16). */
const bahrain2026: JRace = {
  season: "2026",
  round: "16",
  raceName: "Bahrain Grand Prix",
  Circuit: {
    circuitId: "sepang",
    circuitName: "Sepang International Circuit",
    Location: { locality: "Kuala Lumpur", country: "Malaysia" },
  },
  date: "2026-10-04",
  time: "12:00:00Z",
};

/** Normal round fixture: title venue matches the circuit country. */
const singapore2026: JRace = {
  season: "2026",
  round: "17",
  raceName: "Singapore Grand Prix",
  Circuit: {
    circuitId: "marina_bay",
    circuitName: "Marina Bay Street Circuit",
    Location: { locality: "Singapore", country: "Singapore" },
  },
  date: "2026-10-11",
  time: "12:00:00Z",
};

describe("describeRace", () => {
  it("keeps title + venue from the same race object and badges the relocated round", () => {
    const display = describeRace(bahrain2026);
    expect(display.title).toBe("Bahrain Grand Prix");
    expect(display.venue).toBe(
      "Sepang International Circuit, Kuala Lumpur, Malaysia",
    );
    expect(display.relocatedLabel).toBe("Relocated");
  });

  it("leaves normal rounds unbadged", () => {
    const display = describeRace(singapore2026);
    expect(display.title).toBe("Singapore Grand Prix");
    expect(display.relocatedLabel).toBeNull();
  });
});

describe("shouldShowPodium", () => {
  const HOUR = 3600000;
  const DAY = 24 * HOUR;
  // Sepang lights-out + the 3h live window = moment the podium takes over.
  const end = Date.parse("2026-10-04T15:00:00Z");
  const singaporeFp1 = Date.parse("2026-10-09T09:00:00Z");

  it("stays on countdown before the race", () => {
    expect(shouldShowPodium(end - 2 * DAY, end, singaporeFp1)).toBe(false);
  });

  it("stays live-owned while the race is running", () => {
    expect(shouldShowPodium(end - HOUR, end, singaporeFp1)).toBe(false);
  });

  it("celebrates the podium after the race", () => {
    expect(shouldShowPodium(end + 2 * DAY, end, singaporeFp1)).toBe(true);
  });

  it("rolls over to the next round once the window expires", () => {
    expect(shouldShowPodium(end + 8 * DAY, end, null)).toBe(false);
  });

  it("rolls over as soon as the next weekend starts", () => {
    expect(shouldShowPodium(end + 2 * DAY, end, end + DAY)).toBe(false);
  });

  it("needs no next-weekend info to celebrate inside the window", () => {
    expect(shouldShowPodium(end + 2 * DAY, end, null)).toBe(true);
  });
});
