import { describe, expect, it } from "vitest";
import { describeRace, type JRace } from "./jolpica";

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
