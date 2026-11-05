"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Plain-language F1 definitions for newcomers. Keys are referenced by page sections. */
const GLOSSARY: Record<string, string> = {
  DRS: "Drag Reduction System — an overtaking aid. Drivers open a rear-wing flap in marked zones to go faster in a straight line.",
  Qualifying:
    "Saturday's shootout for grid order. The fastest lap takes pole position.",
  Sprint:
    "A short Saturday race (held at some rounds) that sets part of the grid and pays a few extra points.",
  Pole: "First place on the starting grid — earned by the fastest qualifying lap.",
  Gap: "How far behind the leader: seconds on track, points in the standings.",
};

/**
 * Tap-to-open glossary chips with one shared readout panel.
 *
 * Touch-first by design: terms are real buttons (focusable, tap to open),
 * Escape or a tap anywhere outside closes, the definition is linked with
 * aria-describedby + role="tooltip", and the panel flows in normal layout
 * so it always wraps — even at 390px. Nothing is hover-only.
 */
export function GlossaryTerms({ terms }: { terms: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tipId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const onAway = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onAway);
    };
  }, [open ]);

  const known = terms.filter((term) => GLOSSARY[term]);
  if (known.length === 0) return null;

  return (
    <div ref={rootRef} className="gloss">
      <div className="gloss-row" role="group" aria-label="F1 terms explained">
        {known.map((term) => (
          <button
            key={term}
            type="button"
            className={open === term ? "gloss-term gloss-term--open" : "gloss-term"}
            aria-expanded={open === term}
            aria-describedby={open === term ? tipId : undefined}
            onClick={() => setOpen(open === term ? null : term)}
          >
            {term}
          </button>
        ))}
      </div>
      {open ? (
        <p id={tipId} role="tooltip" className="gloss-tip">
          <strong className="gloss-tip__term">{open}: </strong>
          {GLOSSARY[open]}
        </p>
      ) : null}
    </div>
  );
}
