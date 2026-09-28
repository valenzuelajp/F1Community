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
export function NewsCard({ item }: { item: F1NewsItem }) {
  return (
    <article className="news-card">
      {item.image ? (
        <div className="news-card__media">
          <Image
            src={item.image}
            alt=""
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
          {item.source}
          {item.publishedAt ? ` · ${formatNewsDate(item.publishedAt)}` : ""}
        </p>
        <h3 className="news-card__title">{item.title}</h3>
        <a
          className="news-card__cta"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Story
        </a>
      </div>
    </article>
  );
}
