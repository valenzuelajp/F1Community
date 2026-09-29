import Image from "next/image";
import type { F1NewsItem } from "@/lib/f1/news";

/** "2026-09-28T05:00:00.000Z" -> "28 Sep 2026" (UTC, stable for SSR). */
export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/**
 * One story card for the news grid (used on /home and /news).
 * Card styles live in the page stylesheets (`.news-card*`).
 */
const TOPIC_KEYWORDS: Array<{ topic: string; words: string[] }> = [
  { topic: 'Race', words: ['race', 'grand prix', 'qualifying', 'quali', 'practice', 'sprint', 'pole', 'podium', 'win', 'victory', 'winner'] },
  { topic: 'Tech', words: ['upgrade', 'aero', 'engine', 'chassis', 'suspension', 'floor', 'wing', 'power unit', 'wind tunnel'] },
  { topic: 'Transfers', words: ['signs', 'joins', 'contract', 'confirmed', 'line-up', 'lineup', 'seat', 'replace', 'switch', 'hire'] },
  { topic: 'Rules', words: ['fia', 'regulation', 'penalty', 'stewards', 'investigation', 'appeal', 'rule'] },
];

/** Naive topic label from headline keywords — good enough to sort the river. */
export function getNewsTopic(title: string): string {
  const lower = title.toLowerCase();
  for (const { topic, words } of TOPIC_KEYWORDS) {
    if (words.some((w) => lower.includes(w))) return topic;
  }
  return 'F1';
}
/** "2026-09-28T05:00:00.000Z" -> "28 Sep" (UTC, stable for SSR). */
export function formatNewsShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(iso));
}
export function NewsCard({ item }: { item: F1NewsItem }) {
  return (
    <a
      className="news-card"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.image ? (
        <div className="news-card__media">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="news-card__noimg" aria-hidden="true">
          <span>{item.source}</span>
        </div>
      )}
      <div className="news-card__body">
        <p className="news-card__meta">
          <span className="topic-chip">{getNewsTopic(item.title)}</span>
          {item.source}
          {item.publishedAt ? ` · ${formatNewsShortDate(item.publishedAt)}` : ""}
        </p>
        <h3 className="news-card__title">{item.title}</h3>
      </div>
    </a>
  );
}
