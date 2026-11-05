# Future Plans (parked ideas — not scheduled)

## AI "Why this weekend matters" + real-time stakes (parked 2026-09-29)

**Idea:** homepage card that tells fans why the upcoming race weekend matters,
computed live from data on every load.

**Agreed split (no API key needed for v1):**
- **Math engine (free forever):** points gaps, races remaining, maximum
  catchable points, title-clinch scenarios ("seals it if…"), what-if tables
  ("a Norris win + Verstappen P3 makes the gap X") — pure computation over
  the existing free Jolpica feed. No keys, no cost, works on clone.
- **Story engine (no-key prose):** rule-based narrative templates fed by the
  live math, e.g. "Trails by 14 with 6 rounds left — a win + fastest lap cuts
  it to single digits, but Singapore's walls have ended title charges before."
  Reads like analysis, never breaks.

**Open decision (parked):** which AI provider to wire for real generated text
(OpenAI vs Anthropic vs fallback-only). Code must leave a clean seam: one
function swaps templates for model output, no redesign.

**Planned shape:** new `src/lib/f1/weekend-stakes.ts` (compute + templates),
stakes card above the news river on `/home`.

**Concrete design (documented 2026-09-29, unapproved — do not build until yes):**
- Data inputs (all already in-repo, no new deps): `getTopDrivers(20)` gaps,
  `getSeasonCalendar()` rounds remaining, `getNextF1Event()` circuit/round —
  recomputed live on every load (ISR-cached upstream anyway).
- Outputs: leader↔P2 gap, max catchable points, clinch condition text,
  2–3 what-if lines, one template paragraph ("why watch").
- Honest limits: no track trivia, no weather, no predictions — only what the
  numbers prove. No API key, no cost, works on clone.
