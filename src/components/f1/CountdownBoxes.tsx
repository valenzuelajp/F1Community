"use client";

import { useEffect, useState } from "react";

interface CountdownBoxesProps {
  /** ISO date string (UTC) of the session start. */
  target: string;
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Live-ticking countdown rendered as timing-tower boxes
 * (days / hours / minutes / seconds), tabular numerals.
 *
 * Renders hyphens until mount so SSR and the first client paint agree —
 * same hydration-safe pattern as `Countdown`.
 */
export function CountdownBoxes({ target, className }: CountdownBoxesProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now === null ? 0 : new Date(target).getTime() - now;
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const units: [string, string][] =
    now === null
      ? [
          ["--", "days"],
          ["--", "hours"],
          ["--", "minutes"],
          ["--", "seconds"],
        ]
      : [
          [pad(Math.floor(totalSeconds / 86400)), "days"],
          [pad(Math.floor((totalSeconds % 86400) / 3600)), "hours"],
          [pad(Math.floor((totalSeconds % 3600) / 60)), "minutes"],
          [pad(totalSeconds % 60), "seconds"],
        ];

  return (
    <div className={className ?? ""} role="timer" aria-label="Countdown to lights out">
      {units.map(([value, label]) => (
        <div key={label} className="countdown-box">
          <span className="countdown-box__value">{value}</span>
          <span className="countdown-box__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
