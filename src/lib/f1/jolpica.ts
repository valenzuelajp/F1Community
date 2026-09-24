/**
 * F1 Schedule data — Jolpica F1 API (ADR-013).
 *
 * Docs: f1storewiki/F1_API_REFERENCE.md
 * Base: https://api.jolpi.ca/ergast/f1/
 * Rate limit: 500 req/hour → cache with ISR (revalidate 1h).
 *
 * This module is server-only (import from Server Components / Route Handlers).
 */

export const JOLPICA_BASE_URL =
  process.env.JOLPICA_BASE_URL ?? "https://api.jolpi.ca/ergast/f1";

/** Caching strategy from the wiki: refetch at most once per hour. */
const REVALIDATE_SECONDS = 3600;

/* -------------------------------------------------------------------------- */
/*  API response types (subset of Jolpica/Ergast)                             */
/* -------------------------------------------------------------------------- */

export interface JSession {
  date: string; // "2026-09-20"
  time: string; // "13:00:00Z"
}

export interface JRace {
  season: string;
  round: string;
  raceName: string; // "Singapore Grand Prix"
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: { locality: string; country: string };
  };
  date: string;
  time: string;
  FirstPractice?: JSession;
  SecondPractice?: JSession;
  ThirdPractice?: JSession;
  SprintQualifying?: JSession; // "Sprint Shootout"
  SprintQuali?: JSession;
  Sprint?: JSession;
  Qualifying?: JSession;
}

interface JolpicaResponse {
  MRData: {
    RaceTable: { season: string; Races: JRace[] };
  };
}

/* Standings API response (subset) + normalized model */
interface JolpicaStandingsResponse {
  MRData: {
    StandingsTable: {
      season: string;
      round: string;
      StandingsLists: [
        {
          season: string;
          round: string;
          DriverStandings: JDriverStanding[];
        },
      ];
    };
  };
}

interface JDriverStanding {
  position: string;
  points: string;
  wins: string;
  Driver: {
    code: string;
    givenName: string;
    familyName: string;
  };
  Constructors: [{ name: string }];
}

/** A row in the championship leaderboard (from /current/driverstandings/). */
export interface F1StandingDriver {
  position: number;
  code: string;
  name: string;
  team: string;
  points: number;
  wins: number;
  /** Local portrait asset for the driver (public/imgDrivers*.png), if we have one. */
  photo: string | null;
}

/* Driver code -> local portrait asset (public/). All 2026 grid drivers that
   have a photo in the repo are listed; missing ones fall back to null and the
   podium simply hides the avatar for them. */
const DRIVER_PHOTO_BY_CODE: Record<string, string> = {
  ANT: "/imgDriversAntonelli12.png",
  RUS: "/imgDriversRussel63.png",
  HAM: "/imgDriversHamilton44.png",
  NOR: "/imgDriversNorris4.png",
  LEC: "/imgDriversLeclerc16.png",
  VER: "/imgDriversVerstappen3.png",
  PIA: "/imgDriversPiastri81.png",
  HAD: "/imgDriversHadjar6.png",
  LAW: "/imgDriversLawson30.png",
  GAS: "/imgDriversGasly10.png",
  LIN: "/imgDriversLindblad41.png",
  COL: "/imgDriversColapinto43.png",
  BEA: "/imgDriversBearman87.png",
  BOR: "/imgDriversBortoleto5.png",
  HUL: "/imgDriversHulkenberg27.png",
  SAI: "/imgDriversSainz55.png",
  ALB: "/imgDriversAlbon23.png",
  OCO: "/imgDriversOcon31.png",
  ALO: "/imgDriversAlonso14.png",
  STR: "/imgDriversStroll18.png",
  BOT: "/imgDriversBottas77.png",
  PER: "/imgDriversPerez11.png",
};

/* -------------------------------------------------------------------------- */
/*  Our normalized model                                                      */
/* -------------------------------------------------------------------------- */

export type SessionType =
  "practice" | "qualifying" | "sprint-qualifying" | "sprint" | "race";

export interface F1Event {
  /** What to shout in the hero — e.g. "GRAND PRIX!" / "FREE PRACTICE!" */
  headline: string;
  /** Two-line hero title (uppercase), e.g. ["GRAND", "PRIX!"] */
  title: [string, string];
  /** True while a session is currently in progress. */
  isLive: boolean;
  /** Next/current session start (ISO). */
  nextSessionStart: string | null;
  /** Name of the related Grand Prix. */
  raceName: string;
  circuitName: string;
  locality: string;
  country: string;
  round: number;
  season: number;
  totalRounds: number;
  racesCompleted: number;
  racesRemaining: number;
  /** Season is over (last race finished). */
  seasonOver: boolean;
}

interface SessionSlot {
  type: SessionType;
  start: Date;
}

/* -------------------------------------------------------------------------- */
/*  Data fetching                                                             */
/* -------------------------------------------------------------------------- */

async function fetchCurrentRaces(): Promise<JRace[]> {
  const res = await fetch(`${JOLPICA_BASE_URL}/current/races/`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`Jolpica error: ${res.status}`);

  const data = (await res.json()) as JolpicaResponse;
  return data.MRData.RaceTable.Races ?? [];
}

/**
 * Returns the championship drivers ranked by points (default: top 3).
 * Same ISR caching + fallback pattern as the races fetch.
 */
export async function getTopDrivers(limit = 3): Promise<F1StandingDriver[]> {
  const res = await fetch(`${JOLPICA_BASE_URL}/current/driverstandings/`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`Jolpica standings error: ${res.status}`);

  const data = (await res.json()) as JolpicaStandingsResponse;
  const standings =
    data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];

  return standings.slice(0, limit).map((s) => ({
    position: Number(s.position),
    code: s.Driver.code,
    name: `${s.Driver.givenName} ${s.Driver.familyName}`,
    team: s.Constructors[0]?.name ?? "—",
    points: Number(s.points),
    wins: Number(s.wins),
    photo: DRIVER_PHOTO_BY_CODE[s.Driver.code] ?? null,
  }));
}

/* -------------------------------------------------------------------------- */
/*  Session helpers                                                           */
/* -------------------------------------------------------------------------- */

function toDate(session: JSession | undefined): Date | null {
  if (!session) return null;
  const iso = session.time
    ? `${session.date}T${session.time.replace(/Z$/, "")}Z`
    : `${session.date}T00:00:00Z`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function collectSlots(race: JRace): SessionSlot[] {
  const slots: SessionSlot[] = [];

  const practiceSlots: [JSession | undefined, SessionType][] = [
    [race.FirstPractice, "practice"],
    [race.SecondPractice, "practice"],
    [race.ThirdPractice, "practice"],
    [race.SprintQualifying, "sprint-qualifying"],
    [race.SprintQuali, "sprint-qualifying"],
    [race.Sprint, "sprint"],
    [race.Qualifying, "qualifying"],
  ];

  for (const [session, type] of practiceSlots) {
    const start = toDate(session);
    if (start) slots.push({ type, start });
  }

  // The race itself
  const raceStart = toDate({ date: race.date, time: race.time } as JSession);
  if (raceStart) slots.push({ type: "race", start: raceStart });

  return slots.sort((a, b) => a.start.getTime() - b.start.getTime());
}

const HEADLINES: Record<SessionType, string> = {
  practice: "FREE PRACTICE!",
  "sprint-qualifying": "SPRINT SHOOTOUT!",
  qualifying: "QUALIFYING!",
  sprint: "SPRINT!",
  race: "GRAND PRIX!",
};

/** Two-line hero title for each session type (matches the outline style). */
const TITLES: Record<SessionType, [string, string]> = {
  practice: ["FREE", "PRACTICE!"],
  "sprint-qualifying": ["SPRINT", "SHOOTOUT!"],
  qualifying: ["QUALI", "TIME!"],
  sprint: ["SPRINT", "RACE!"],
  race: ["GRAND", "PRIX!"],
};

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Returns normalized info about the next/current F1 event on the calendar.
 * Throws if the API is unreachable — callers should fall back to defaults.
 */
export async function getNextF1Event(): Promise<F1Event> {
  const races = await fetchCurrentRaces();
  if (races.length === 0) throw new Error("Jolpica returned no races");

  const now = Date.now();
  // Approximate session length, used to detect "live now" and weekend bounds.
  const SESSION_WINDOW_MS = 3 * 60 * 60 * 1000;
  const totalRounds = races.length;
  const racesCompleted = races.filter(
    (r) => new Date(`${r.date}T23:59:59Z`).getTime() < now,
  ).length;

  let event: F1Event | null = null;

  for (const race of races) {
    const slots = collectSlots(race);
    if (slots.length === 0) continue;

    const first = slots[0].start.getTime();
    const last = slots[slots.length - 1].start.getTime();

    // 1) A session is running right now → "LIVE"
    const live = slots.find(
      (s) =>
        now >= s.start.getTime() && now < s.start.getTime() + SESSION_WINDOW_MS,
    );

    if (live) {
      event = buildEvent(race, live, now, totalRounds, racesCompleted, true);
      break;
    }

    // 2) Weekend is upcoming, or started but not finished
    //    → count down to this weekend's next session.
    const weekendActive =
      first > now || (now >= first && now < last + SESSION_WINDOW_MS);

    if (weekendActive) {
      const upcoming = slots.find((s) => s.start.getTime() > now) ?? slots[0];
      event = buildEvent(
        race,
        upcoming,
        now,
        totalRounds,
        racesCompleted,
        false,
      );
      break;
    }
  }

  // Everything already ran → off season
  if (!event) {
    const last = races[races.length - 1];
    event = {
      headline: "SEASON COMPLETE!",
      title: ["SEASON", "COMPLETE!"],
      isLive: false,
      nextSessionStart: null,
      raceName: `${last.raceName} Champion`,
      circuitName: last.Circuit.circuitName,
      locality: last.Circuit.Location.locality,
      country: last.Circuit.Location.country,
      round: Number(last.round),
      season: Number(last.season),
      totalRounds,
      racesCompleted,
      racesRemaining: 0,
      seasonOver: true,
    };
  }

  return event;
}

/** Build a normalized event from a race + the next/live session slot. */
function buildEvent(
  race: JRace,
  slot: SessionSlot,
  now: number,
  totalRounds: number,
  racesCompleted: number,
  isLive: boolean,
): F1Event {
  void now;
  return {
    headline: HEADLINES[slot.type],
    title: TITLES[slot.type],
    isLive,
    nextSessionStart: slot.start.toISOString(),
    raceName: race.raceName,
    circuitName: race.Circuit.circuitName,
    locality: race.Circuit.Location.locality,
    country: race.Circuit.Location.country,
    round: Number(race.round),
    season: Number(race.season),
    totalRounds,
    racesCompleted,
    racesRemaining: totalRounds - racesCompleted,
    seasonOver: false,
  };
}

/** Static fallback so the login page never breaks if the API is down. */
export function fallbackF1Event(): F1Event {
  return {
    headline: "GRAND PRIX!",
    title: ["GRAND", "PRIX!"],
    isLive: false,
    nextSessionStart: null,
    raceName: "Formula 1 Season",
    circuitName: "—",
    locality: "—",
    country: "Worldwide",
    round: 1,
    season: 2026,
    totalRounds: 23,
    racesCompleted: 0,
    racesRemaining: 23,
    seasonOver: false,
  };
}
