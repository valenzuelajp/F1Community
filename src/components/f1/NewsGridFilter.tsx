"use client";

import { useMemo, useState } from "react";
import type { F1NewsItem } from "@/lib/f1/news";
import { NewsCard, getNewsTopic } from "./NewsCard";

/**
 * Client-side topic filter for the home news grid.
 * Server renders every card; this only shows/hides by topic chip.
 */
export function NewsGridFilter({ items }: { items: F1NewsItem[] }) {
  const topics = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => getNewsTopic(item.title))))],
    [items],
  );
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? items : items.filter((item) => getNewsTopic(item.title) === active);

  return (
    <div>
      <div className="news-filter" role="group" aria-label="Filter stories by topic">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            className={`news-filter__btn${topic === active ? " news-filter__btn--active" : ""}`}
            aria-pressed={topic === active}
            onClick={() => setActive(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <div className="news-grid">
        {shown.map((item) => (
          <NewsCard key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}
