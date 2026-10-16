import './telemetry-alternatives.css';

/**
 * H03 alternatives — three restyles of the Live Timing Telemetry Ticker
 * (baseline: the live `.login-telemetry` markup on /login, styles in
 * login.css `.login-telemetry*`).
 *
 * Classic renders the original login markup via the shared
 * `.login-telemetry*` classes; the sample timing values stand in for the
 * [TIMEDATA] / [NAM] placeholders the live page renders. TelemetryNoLive
 * mirrors the live page's conditional branch for days with no running
 * session (OFFLINE badge + next-session info, sample schedule values).
 * The variants re-skin the same strip to pair with the matching H01
 * header / H02 footer variant. Shared accessibility upgrades in the
 * variants:
 *  - real <ul>/<li> timing semantics with a screen-reader copy of each
 *    cell (labels stack in Pit Wall / HUD and run inline in Grandstand)
 *  - contrast >= 4.5:1 in every state (red on black, not white on red)
 *  - the LIVE dot is decorative; the LIVE word carries the state
 */

const SAMPLE_TIMING = {
  lap: { label: 'LAP', value: '46 / 57' },
  p1: { label: 'VER', value: '1:31.482' },
  p2: { label: 'NOR', value: '+0.412' },
  p3: { label: 'LEC', value: '+1.203' },
};

const TIMING_ITEMS = [
  SAMPLE_TIMING.lap,
  SAMPLE_TIMING.p1,
  SAMPLE_TIMING.p2,
  SAMPLE_TIMING.p3,
];

const SAMPLE_PHASE = 'SPA · RACE';

/* sample schedule values for the no-races state — stand in for the
   Jolpica fields the live page reads (event.raceName / event.headline) */
const IDLE_SESSION = {
  race: 'Belgian Grand Prix',
  phase: 'NEXT: SPA · SUN 15:00',
};

/* ==========================================================================
   CLASSIC — the live login markup (`.login-telemetry*` from login.css).
   ========================================================================== */

export function TelemetryClassic() {
  return (
    <section aria-label="Live race telemetry timing" className="login-telemetry">
      <div className="login-live-cell">
        <span className="login-live-dot" />
        <span>LIVE</span>
      </div>

      <div className="login-telemetry-data">
        <span>{SAMPLE_TIMING.lap.label} {SAMPLE_TIMING.lap.value}</span>
        <span className="login-telemetry-slash">/</span>
        <span>{SAMPLE_TIMING.p1.label} {SAMPLE_TIMING.p1.value}</span>
        <span className="login-telemetry-slash">/</span>
        <span>{SAMPLE_TIMING.p2.label} {SAMPLE_TIMING.p2.value}</span>
        <span className="login-telemetry-slash">/</span>
        <span>{SAMPLE_TIMING.p3.label} {SAMPLE_TIMING.p3.value}</span>
        <span className="login-telemetry-slash">/</span>
        <span className="login-telemetry-phase">{SAMPLE_PHASE}</span>
      </div>
    </section>
  );
}

/* ==========================================================================
   NO LIVE RACES — the conditional state of the same strip, shown below
   the live ticker specimen. The real page swaps the timing data for the
   next session whenever no race is running (login/page.tsx: OFFLINE
   badge, gray dot via `login-live-cell--off`, "NO LIVE SESSION / race /
   NEXT: …" — read-only baseline, never edited). Sample schedule values
   stand in for the Jolpica fields.
   ========================================================================== */

export function TelemetryNoLive() {
  return (
    <section aria-label="Race telemetry offline" className="login-telemetry">
      <div className="login-live-cell login-live-cell--off">
        <span className="login-live-dot" />
        <span>OFFLINE</span>
      </div>

      <div className="login-telemetry-data">
        <span>NO LIVE SESSION</span>
        <span className="login-telemetry-slash">/</span>
        <span>{IDLE_SESSION.race}</span>
        <span className="login-telemetry-slash">/</span>
        <span className="login-telemetry-phase">{IDLE_SESSION.phase}</span>
      </div>
    </section>
  );
}

/* ==========================================================================
   VARIANT FRAME — one strip, three re-skins. Live cell + timing list +
   phase chip; labels stack above the values in Pit Wall / HUD and run
   inline beside them in Grandstand (like the live "VER 1:31.482").
   ========================================================================== */

type TelemetryVariant = 'f1tk--pitwall' | 'f1tk--grandstand' | 'f1tk--hud';

function TelemetryFrame({ variant }: { variant: TelemetryVariant }) {
  return (
    <section aria-label="Live race telemetry timing" className={`f1tk ${variant}`}>
      <div className="f1tk-live">
        <span className="f1tk-dot" aria-hidden="true" />
        <span>LIVE</span>
      </div>

      <ul className="f1tk-data">
        {TIMING_ITEMS.map((item) => (
          <li key={item.label} className="f1tk-cell">
            <span className="f1tk-sr">{item.label} {item.value}</span>
            <span className="f1tk-label" aria-hidden="true">{item.label}</span>
            <span className="f1tk-value" aria-hidden="true">{item.value}</span>
          </li>
        ))}
      </ul>

      <div className="f1tk-phase">
        <span className="f1tk-sr">Phase {SAMPLE_PHASE}</span>
        <span className="f1tk-label" aria-hidden="true">Phase</span>
        <span className="f1tk-value" aria-hidden="true">{SAMPLE_PHASE}</span>
      </div>
    </section>
  );
}

/* ==========================================================================
   A — PIT WALL: timing-sheet editorial. Hairline cell rules, stacked
   label / value pairs, red index slab on the LIVE cell.
   ========================================================================== */

export function TelemetryPitWall() {
  return <TelemetryFrame variant="f1tk--pitwall" />;
}

/* ==========================================================================
   B — GRANDSTAND: velocity. Slipstream hem across the top, Anton values
   leaning forward, skewed slash separators, red phase.
   ========================================================================== */

export function TelemetryGrandstand() {
  return <TelemetryFrame variant="f1tk--grandstand" />;
}

/* ==========================================================================
   C — TELEMETRY HUD: instrument cluster. Notched cells, bracketed
   values, LED labels, red-edged phase chip.
   ========================================================================== */

export function TelemetryHud() {
  return <TelemetryFrame variant="f1tk--hud" />;
}

/* ==========================================================================
   LOADING SKELETON — the H03 loading state, one per variant.

   The skeleton carries the REAL chrome of its variant (Classic reuses
   the live `.login-telemetry*` classes outright, variants carry the
   `.f1tk*` classes), and the bars mirror the real strip anatomy: red
   LIVE badge + red phase (both brand red in every state), label stand-ins
   where the variant shows labels, slash blocks where the real strip
   prints slashes. The loaded swap causes no layout shift.

   a11y: every block is decorative (aria-hidden); one visually-hidden
   role="status" announces "Loading live timing…" to screen readers.
   ========================================================================== */

export type TelemetrySkeletonVariant = 'Classic' | 'Pit Wall' | 'Grandstand' | 'Telemetry HUD';

const SKELETON_CLASS: Record<TelemetrySkeletonVariant, string> = {
  Classic: 'login-telemetry f1tsk f1tsk--classic',
  'Pit Wall': 'f1tk f1tk--pitwall f1tsk f1tsk--pitwall',
  Grandstand: 'f1tk f1tk--grandstand f1tsk f1tsk--grandstand',
  'Telemetry HUD': 'f1tk f1tk--hud f1tsk f1tsk--hud',
};

export function TelemetrySkeleton({ variant = 'Classic' }: { variant?: TelemetrySkeletonVariant }) {
  return (
    <section className={SKELETON_CLASS[variant]}>
      <div className="login-live-cell" aria-hidden="true">
        <span className="login-live-dot f1tsk-dot" />
        <span className="f1tsk-bar f1tsk-bar--badge" />
      </div>

      <div className="login-telemetry-data" aria-hidden="true">
        <span className="f1tsk-cell f1tsk-cell--lap">
          <span className="f1tsk-bar f1tsk-bar--label" />
          <span className="f1tsk-bar f1tsk-bar--lap" />
        </span>
        <span className="f1tsk-slash" />
        <span className="f1tsk-cell f1tsk-cell--ver">
          <span className="f1tsk-bar f1tsk-bar--label" />
          <span className="f1tsk-bar f1tsk-bar--ver" />
        </span>
        <span className="f1tsk-slash" />
        <span className="f1tsk-cell f1tsk-cell--nor">
          <span className="f1tsk-bar f1tsk-bar--label" />
          <span className="f1tsk-bar f1tsk-bar--nor" />
        </span>
        <span className="f1tsk-slash" />
        <span className="f1tsk-cell f1tsk-cell--lec">
          <span className="f1tsk-bar f1tsk-bar--label" />
          <span className="f1tsk-bar f1tsk-bar--lec" />
        </span>
        <span className="f1tsk-slash" />
        <span className="f1tsk-cell f1tsk-cell--phase login-telemetry-phase">
          <span className="f1tsk-bar f1tsk-bar--label" />
          <span className="f1tsk-bar f1tsk-bar--phase" />
        </span>
      </div>

      <span className="components-sr" role="status">
        Loading live timing…
      </span>
    </section>
  );
}
