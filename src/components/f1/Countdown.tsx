"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  /** ISO date string (UTC) of the session start. */
  target: string;
  className?: string;
  /**
   * Also render the session start in the visitor's local time zone
   * together with the detected zone, e.g.
   * "Thu 16:30 · Asia/Manila (GMT+8)".
   */
  showStartTime?: boolean;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function format(ms: number): string {
  if (ms <= 0) return "LIVE NOW";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${pad(hours)}h ${pad(minutes)}m`;
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

/** IANA time zone of the visitor's device, e.g. "Asia/Manila". */
function getTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/** Short offset label, e.g. "GMT+8" / "GMT-5". Manual fallback if Intl lacks it. */
function getUtcOffsetLabel(date: Date): string {
  const zone = getTimeZone();
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      timeZoneName: "shortOffset",
    }).formatToParts(date);
    const name = parts.find((p) => p.type === "timeZoneName")?.value;
    if (name && /GMT|UTC/i.test(name)) return name;
  } catch {
    // fall through to manual calculation
  }
  const off = date.getTimezoneOffset(); // minutes behind UTC
  const sign = off > 0 ? "-" : "+";
  const abs = Math.abs(off);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${pad(m)}` : ""}`;
}

/** Session start converted to the visitor's local time (12-hour), e.g. "Thu 24 Sep 4:30 PM". */
function formatLocalStart(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

/**
 * Live-ticking countdown to a session start.
 *
 * The timer only renders after mount. The wall-clock readout depends on the
 * visitor's time zone, so rendering it during SSR would mismatch hydration —
 * by rendering nothing until the browser mounts, we never disagree with SSR.
 */
export function Countdown({
  target,
  className,
  showStartTime,
}: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || now === null) {
    // SSR + first client paint agree on an empty span → no hydration mismatch.
    return <span className={className ?? ""} />;
  }

  const diff = new Date(target).getTime() - now;

  return (
    <span className={className ?? ""}>
      {format(diff)}
      {showStartTime && diff > 0 && (
        <span className="login-countdown-start">
          {formatLocalStart(target)} · {getTimeZone()} (
          {getUtcOffsetLabel(new Date(now))})
        </span>
      )}
    </span>
  );
}
