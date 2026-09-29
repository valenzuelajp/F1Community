import React from 'react';

interface NewsTickerProps {
  /** Headline strings, newest first. */
  headlines: string[];
  /** e.g. "Next session · Singapore Grand Prix · Fri 17:30 UTC". */
  nextLabel: string;
  /** Shows the red LIVE tag at the head of the tape. */
  isLive: boolean;
}

/**
 * Timing-tower tape under the navbar: latest headlines plus the next
 * session, scrolling on a seamless CSS loop. Server-rendered, zero JS —
 * motion is CSS-only (pauses on hover, static under
 * prefers-reduced-motion). The track holds two identical groups so a
 * -50% shift loops without a jump.
 */
export function NewsTicker({ headlines, nextLabel, isLive }: NewsTickerProps) {
  return (
    <div className="ticker" role="marquee" aria-label="Latest Formula 1 headlines">
      <span className="ticker__tag">Latest</span>
      <div className="ticker__viewport">
        <div className="ticker__track">
          {[0, 1].map((copy) => (
            <div key={copy} className="ticker__group" aria-hidden={copy === 1}>
              {isLive && <span className="ticker__live">Live</span>}
              <span className="ticker__item ticker__item--next">{nextLabel}</span>
              {headlines.slice(0, 8).map((headline, index) => (
                <span key={index} className="ticker__item">
                  {headline}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
