"use client";

import { useEffect, useState } from "react";
import type { F1SessionEntry } from "@/lib/f1/jolpica";

/** "FP1" -> "Practice 1"; every other session label renders as-is. */
function sessionLabel(label: string): string {
  const match = /^FP(\d)$/.exec(label);
  return match ? `Practice ${match[1]}` : label;
}

/** "Fri 17:30" in the visitor's time zone (client only — never SSR). */
function localSessionTime(iso: string): string {
  const date = new Date(iso);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return `${weekday} ${time}`;
}

/** "Fri 17:30 UTC" — server-safe, matches SSR output exactly. */
function utcSessionTime(iso: string): string {
  const date = new Date(iso);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
  return `${weekday} ${time} UTC`;
}

/**
 * Weekend session rows — timing-tower style.
 *
 * Server and first paint render UTC times; after mount the visitor's
 * local time takes the lead with UTC kept as secondary. No hydration
 * mismatch: pre-mount output is byte-identical to SSR.
 */
export function SessionTimes({ sessions }: { sessions: F1SessionEntry[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className="race-hero__sessions">
      {sessions.map((session) => (
        <li
          key={`${session.label}-${session.start}`}
          className={
            session.type === 'race'
              ? 'race-hero__session race-hero__session--race'
              : 'race-hero__session'
          }
        >
          <span
            className={
              session.state === "live"
                ? "race-hero__session-name race-hero__session-name--live"
                : "race-hero__session-name"
            }
          >
            {sessionLabel(session.label)}
          </span>
          <span className="race-hero__session-local">
            {mounted ? localSessionTime(session.start) : utcSessionTime(session.start)}
          </span>
          {mounted ? (
            <span className="race-hero__session-utc">
              {utcSessionTime(session.start)}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
