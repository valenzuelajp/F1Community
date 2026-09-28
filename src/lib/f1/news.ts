/**
 * F1 news — live RSS feeds (ADR-style: keyless, server-only).
 *
 * Primary:  Sky Sports F1 RSS (`https://www.skysports.com/rss/12433`)
 * Fallback: BBC Sport F1 RSS (`https://feeds.bbci.co.uk/sport/formula1/rss.xml`)
 * Last resort: 3-item static fallback so the section never renders empty.
 *
 * Zero dependencies: a tiny targeted parser (regex over `<item>` blocks),
 * not a general XML parser. Import from Server Components / Route Handlers.
 */

export type NewsSource = "Sky Sports F1" | "BBC Sport" | "F1 Community";

export interface F1NewsItem {
  title: string;
  summary: string;
  url: string;
  image: string | null;
  source: NewsSource;
  /** ISO timestamp, or null when the feed omits it. */
  publishedAt: string | null;
}

const SKY_RSS = "https://www.skysports.com/rss/12433";
const BBC_RSS = "https://feeds.bbci.co.uk/sport/formula1/rss.xml";

/** News refreshes faster than race data: at most once per 30 minutes. */
const NEWS_REVALIDATE_SECONDS = 1800;

/** How many cards the home page renders (1 hero + 4 sidebar + grid). */
const MAX_ITEMS = 9;

function stripCdata(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function plainText(html: string, maxLen = 160): string {
  const text = decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

/** First `<tag ...>…</tag>` inner text inside an `<item>` block. */
function pickTag(block: string, tag: string): string | null {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return match ? stripCdata(match[1]) : null;
}

/** `url="…"` of the first self-closing `<tag …>` (enclosure/thumbnail). */
function pickAttrUrl(block: string, tag: string): string | null {
  const match = block.match(
    new RegExp(`<${tag}\\b[^>]*?url="([^"]+)"`, "i"),
  );
  return match ? match[1] : null;
}

/** Feed dates use abbreviations ("BST") V8 can't parse — map to offsets. */
const TZ_OFFSETS: Record<string, string> = {
  BST: "+0100",
  GMT: "+0000",
  UTC: "+0000",
  CET: "+0100",
  CEST: "+0200",
};

function toIso(dateValue: string | null): string | null {
  if (!dateValue) return null;
  const normalized = dateValue.replace(
    /\b([A-Z]{3,4})$/,
    (abbr) => TZ_OFFSETS[abbr] ?? abbr,
  );
  const time = new Date(normalized).getTime();
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function parseFeed(xml: string, source: NewsSource): F1NewsItem[] {
  const items: F1NewsItem[] = [];
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  for (const block of blocks) {
    const title = pickTag(block, "title");
    const url = pickTag(block, "link");
    if (!title || !url) continue;
    // Sky ships full-size images as enclosures; BBC as media thumbnails.
    const image =
      pickAttrUrl(block, "enclosure") ?? pickAttrUrl(block, "media:thumbnail");
    items.push({
      title: decodeEntities(title),
      summary: plainText(pickTag(block, "description") ?? ""),
      url,
      image,
      source,
      publishedAt: toIso(pickTag(block, "pubDate")),
    });
    if (items.length >= MAX_ITEMS) break;
  }
  return items;
}

async function fetchFeed(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    next: { revalidate: NEWS_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`News feed error: ${res.status}`);
  return res.text();
}

/** Shown only when both live feeds are unreachable. Links go to the source front pages. */
function fallbackNews(): F1NewsItem[] {
  return [
    {
      title: "Formula 1 news is temporarily unavailable",
      summary: "The live feeds could not be reached. Check the source front pages for the latest headlines.",
      url: "https://www.skysports.com/f1",
      image: null,
      source: "F1 Community",
      publishedAt: null,
    },
    {
      title: "BBC Sport Formula 1 front page",
      summary: "Race reports, analysis and gossip from the BBC Sport F1 desk.",
      url: "https://www.bbc.com/sport/formula1",
      image: null,
      source: "F1 Community",
      publishedAt: null,
    },
    {
      title: "Jolpica schedule and standings API",
      summary: "Session times and championship tables still load from the Ergast-compatible API.",
      url: "https://api.jolpi.ca/ergast/f1/",
      image: null,
      source: "F1 Community",
      publishedAt: null,
    },
  ];
}

/**
 * Newest-first F1 headlines: Sky Sports, else BBC Sport, else static fallback.
 * Never throws — callers always get renderable cards.
 */
export async function getTopNews(): Promise<F1NewsItem[]> {
  try {
    const sky = parseFeed(await fetchFeed(SKY_RSS), "Sky Sports F1");
    if (sky.length > 0) return sky;
  } catch {
    // fall through to BBC
  }
  try {
    const bbc = parseFeed(await fetchFeed(BBC_RSS), "BBC Sport");
    if (bbc.length > 0) return bbc;
  } catch {
    // fall through to static fallback
  }
  return fallbackNews();
}
