"use client";

import { useEffect, useState } from "react";

/**
 * Post-race "what's next" strip: first session of the upcoming round in the
 * viewer's own time zone, plus whole days remaining. Client-rendered because
 * only the browser knows the viewer's zone. Pre-mount renders nothing (no
 * SSR/hydration mismatch); the header countdown owns the live tick.
 */
export function NextRaceStrip({
  raceName,
  sessionLabel,
  sessionStart,
}: {
  raceName: string;
  sessionLabel: string;
  sessionStart: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const start = new Date(sessionStart);
  let zone = "UTC";
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    zone = "UTC";
  }
  // Name the zone for a Filipino audience; every other zone keeps its own
  // Intl short name instead of being mislabeled.
  const zoneLabel =
    zone === "Asia/Manila"
      ? "PHT"
      : (() => {
          try {
            const part = new Intl.DateTimeFormat("en-US", {
              timeZone: zone,
              timeZoneName: "short",
            })
              .formatToParts(start)
              .find((p) => p.type === "timeZoneName")?.value;
            return part ?? zone;
          } catch {
            return zone;
          }
        })();
  const local = (() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(start);
    } catch {
      return "";
    }
  })();
  const days = Math.max(
    0,
    Math.ceil((start.getTime() - Date.now()) / 86400000),
  );

  return (
    <p className="race-hero__next">
      Next: {raceName} · {sessionLabel} {local} {zoneLabel} ·{" "}
      {days === 0 ? "today" : `in ${days}d`}
    </p>
  );
}
