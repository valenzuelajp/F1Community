import { NewsTicker } from "./NewsTicker";
import { getTopNews } from "@/lib/f1/news";
import { getNextF1Event } from "@/lib/f1/jolpica";

/** Session start as "Fri 17:30 UTC" — server-safe, no hydration drift. */
function tickerSessionTime(iso: string): string {
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
 * Self-fetching timing tape: one identical strip on every content page.
 * Fetches are ISR-cached (news 30 min, schedule 1 h), so rendering it per
 * page costs no extra upstream calls. Returns null when the schedule feed
 * is unreachable — a missing tape must never sink a page.
 */
export async function SiteTicker() {
  let event;
  try {
    event = await getNextF1Event();
  } catch {
    return null;
  }
  const news = await getTopNews();
  return (
    <NewsTicker
      headlines={news.map((item) => item.title)}
      nextLabel={
        event.nextSessionStart
          ? `Next session · ${event.raceName} · ${tickerSessionTime(event.nextSessionStart)}`
          : `Next race · ${event.raceName}`
      }
      isLive={event.isLive}
    />
  );
}
