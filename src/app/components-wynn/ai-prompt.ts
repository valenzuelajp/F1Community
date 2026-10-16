/**
 * Copy-ready AI prompts for the H01–H05 specimen fieldsets (Header →
 * Sponsors). Each prompt carries:
 *   - TASK line: implement the fieldset's component on the main page
 *     (src/app/home/page.tsx — the /home member page)
 *   - CODE REFERENCES: component/css paths + exports, the live baseline
 *     the Classic variant renders as-is, and the showcase wiring
 *   - SELECTIONS: the variant + skeleton dropdowns baked at copy time
 *   - GUIDANCE: placement, component-specific rules, tokens, a11y,
 *     scope guardrails and the verification step
 *
 * References only — no code is inlined; the AI reads the repo files.
 */

export type AiPromptKey = 'header' | 'footer' | 'telemetry' | 'standings' | 'sponsors';

interface AiPromptSection {
  legend: string;
  sources: string[];
  placement: string;
  notes: string[];
}

export const AI_PROMPT_SECTIONS: Record<AiPromptKey, AiPromptSection> = {
  header: {
    legend: 'Header (H01) — Login navigation bar',
    sources: [
      'Component source: src/app/components-wynn/header-alternatives.tsx — exports: HeaderPitWall, HeaderGrandstand, HeaderTelemetryHud, HeaderSkeleton',
      'Styles: src/app/components-wynn/header-alternatives.css',
      'Live baseline (the Classic variant renders it as-is): src/components/layout/LoginNavHeader.tsx',
      'Showcase wiring: src/app/components-wynn/page.tsx — "Header" fieldset',
    ],
    placement:
      'Mount the nav bar at the top of /home, above the hero section, spanning the full width.',
    notes: [
      'Keep every link, auth action and dropdown behaviour from LoginNavHeader — the variants only re-skin the chrome, they never drop functionality.',
    ],
  },
  footer: {
    legend: 'Footer (H02) — Site footer',
    sources: [
      'Component source: src/app/components-wynn/footer-alternatives.tsx — exports: FooterPitWall, FooterGrandstand, FooterTelemetryHud, FooterSkeleton',
      'Styles: src/app/components-wynn/footer-alternatives.css',
      'Live baseline (the Classic variant renders it as-is): src/components/layout/LoginFooter.tsx',
      'Showcase wiring: src/app/components-wynn/page.tsx — "Footer" fieldset',
    ],
    placement:
      'Mount the footer after the hero section at the end of the /home main element, spanning the full width.',
    notes: [
      'Keep the footer link groups and legal line from LoginFooter — the variants re-skin the same columns.',
    ],
  },
  telemetry: {
    legend: 'Telemetry (H03) — Live timing ticker',
    sources: [
      'Component source: src/app/components-wynn/telemetry-alternatives.tsx — exports: TelemetryClassic, TelemetryNoLive, TelemetryPitWall, TelemetryGrandstand, TelemetryHud, TelemetrySkeleton',
      'Styles: src/app/components-wynn/telemetry-alternatives.css',
      'Live baseline (live + OFFLINE branches): src/app/login/page.tsx section 3, styles in src/app/login/login.css (.login-telemetry*)',
      'Showcase wiring: src/app/components-wynn/page.tsx — "Telemetry" fieldset',
    ],
    placement:
      'Place the strip directly below the header, spanning the full width of /home.',
    notes: [
      'Include TelemetryNoLive for days with no running session (OFFLINE badge + next-session info) — the live page switches on event.isLive, so mirror that condition instead of hard-coding a state.',
      'The strip scrolls horizontally by design (overflow-x: auto, scrollbar hidden) — do not wrap or clip the cells.',
    ],
  },
  standings: {
    legend: 'Standings (H04) — Championship leaderboard',
    sources: [
      'Component source: src/app/components-wynn/standings-alternatives.tsx — exports: StandingsClassic, StandingsPitWall, StandingsGrandstand, StandingsTelemetryHud, StandingsSkeleton',
      'Styles: src/app/components-wynn/standings-alternatives.css',
      'Live baseline (the Classic variant renders it as-is): src/app/login/page.tsx championship leaderboard section, styles in src/app/login/login.css (.login-podium*)',
      'Showcase wiring: src/app/components-wynn/page.tsx — "Standings" fieldset',
    ],
    placement: 'Add a standings section after the hero on /home.',
    notes: [
      'The standings components take { drivers, season } — reuse the existing F1 standings data from src/lib/f1/jolpica instead of hard-coding names or points.',
    ],
  },
  sponsors: {
    legend: 'Sponsors (H05) — Team sponsors carousel',
    sources: [
      'Component source: src/app/components-wynn/sponsors-alternatives.tsx — exports: SponsorsClassic, SponsorsPitWall, SponsorsGrandstand, SponsorsTelemetryHud, SponsorsSkeleton',
      'Styles: src/app/components-wynn/sponsors-alternatives.css',
      'Live baseline (the Classic variant renders it as-is): login wrap-row styles in src/app/login/login.css (.login-teams*)',
      'Showcase wiring: src/app/components-wynn/page.tsx — "Sponsors" fieldset',
    ],
    placement:
      'Add the sponsors strip after the standings section on /home, above the footer.',
    notes: [
      'The animated variants scroll ONE copy of the logo set (each logo absolutely positioned on its own timeline) — never duplicate the logos, and keep every logo link in the tab order exactly once.',
    ],
  },
};

const SHARED_GUIDANCE = [
  'Read the reference files before writing any code — every specimen renders live at /components-wynn; Classic is the baseline markup as-is and the variants re-skin the same structure.',
  'Design tokens: --brand-red #ff1801, --font-display (Anton), --font-inter; each -alternatives.css file documents its variant palettes in the header comment.',
  'Loading state: pair with the selected skeleton export — shimmer wave stagger delays must stay after the animation shorthand, and the loading state announces itself via role="status".',
  'Accessibility: aria-hidden on decorative chrome, contrast >= 4.5:1 in every state (red on black, never white on red), focus-visible rings on interactive elements.',
  'Scope: edit only the main page (src/app/home/page.tsx) and the files you add for it — /components-wynn and the /login + layout baselines are read-only references.',
  'Verify with `npx tsc --noEmit`, then check /home visually.',
];

export function buildAiPrompt(key: AiPromptKey, variant: string, skeleton: string): string {
  const section = AI_PROMPT_SECTIONS[key];

  const guidance = [
    SHARED_GUIDANCE[0],
    `Placement: ${section.placement}`,
    ...section.notes,
    ...SHARED_GUIDANCE.slice(1),
  ];

  return [
    `Implement the "${section.legend}" component from the Wynn components showcase on the main page (src/app/home/page.tsx — the /home member page).`,
    '',
    'CODE REFERENCES',
    ...section.sources.map((s) => `- ${s}`),
    '',
    'SELECTIONS AT COPY TIME',
    `- Variant: ${variant}`,
    `- Loading skeleton: ${skeleton} (locked to the variant — always paired)`,
    '',
    'GUIDANCE',
    ...guidance.map((g, i) => `${i + 1}. ${g}`),
  ].join('\n');
}

/* ---- Login components (Field controls cards) ----
   Each card copies a prompt describing how its modular block is built
   from the Mini Login web builder: palette label, MiniBody recipe,
   builder config panel (cfg keys), variants and the current selection. */

export interface LoginBuilderBlockDef {
  type: string;
  name: string;
  tag: string;
  paletteLabel: string;
  usage?: string;
  variants?: string[];
}

/* What the builder's right-hand config panel exposes per block type —
   mirrors the MiniPanel hooks in LOGIN_COMPONENTS (page.tsx). */
const BUILDER_PANEL_NOTES: Record<string, string> = {
  password: 'Builder config panel: "Reveal password" switch (cfg.passwordVisible).',
  login: 'Builder config panel: Variant dropdown (cfg.loginVariant) + Label text field (cfg.loginLabel).',
  guest: 'Builder config panel: Variant dropdown (cfg.guestVariant) + Label text field (cfg.guestLabel).',
  header: 'Builder config panel: accent color swatches + custom color input (cfg.accent).',
  footer: 'Builder config panel: Note text field (cfg.footerNote) + Link text field (cfg.footerLink).',
  sticker: 'Backdrop block: fixed decorative layer under the form; the showcase passes a 2-digit watermark number (num) into ShowcaseBody.',
};

export function buildLoginComponentPrompt(def: LoginBuilderBlockDef, variant: string): string {
  const panel = BUILDER_PANEL_NOTES[def.type] ?? 'None — static block, no builder config panel.';
  const hasVariants = (def.variants?.length ?? 0) > 1;
  const recipe = def.usage ?? '(read MiniBody in the LOGIN_COMPONENTS entry)';

  return [
    `Rebuild the "${def.name}" (${def.tag}) component from the UI Kit showcase on the main page (src/app/home/page.tsx — the /home member page), matching the specimen.`,
    '',
    'BUILDER ORIGIN (modular)',
    `This is one modular block in the Mini Login web builder — registry LOGIN_COMPONENTS in src/app/components-wynn/page.tsx, type "${def.type}":`,
    `- Palette label: "${def.paletteLabel}" — the block is dragged from the palette; default layout order lives in MINI_DEFAULT_ORDER.`,
    `- Preview body: def.MiniBody renders: ${recipe}`,
    `- ${panel}`,
    '',
    'CODE REFERENCES',
    `- Specimen source: src/app/components-wynn/page.tsx — LOGIN_COMPONENTS entry type "${def.type}" (MiniBody / ShowcaseBody / MiniPanel) plus the underlying auth component`,
    '- Styles: src/app/login/login.css — the auth__* classes the builder reuses (auth__input, auth__btn--primary, …)',
    '- Composition context: MiniLoginCard + the builder shell in src/app/components-wynn/page.tsx — blocks stack vertically inside the mini login form',
    '',
    'SELECTIONS AT COPY TIME',
    hasVariants ? `- Variant: ${variant}` : '- Variant: Classic (only variant for this block)',
    '',
    'GUIDANCE',
    '1. Implement the block as a self-contained component with the same class contract the builder expects — it must drop into the /home login form AND stay usable as a Mini Login palette block.',
    '2. Keep the builder modular: one component per block; anything the builder configures (variant, label, note, password visibility, watermark number) arrives as a prop — never inline builder cfg into markup.',
    `3. Usage recipe from the builder: ${recipe}`,
    '4. Tokens: --brand-red #ff1801, --font-display (Anton), --font-inter; dark surfaces rgba(255,255,255,0.03–0.06) on black.',
    '5. Accessibility: label every input, focus-visible rings, aria-hidden on decorative icons, contrast >= 4.5:1.',
    '6. Scope: edit only src/app/home/page.tsx and files you add for it — /components-wynn and the /login baselines are read-only references.',
    '7. Verify with `npx tsc --noEmit`, then check /home visually.',
  ].join('\n');
}

/* ---- Mini Login builder (composite) ----
   The builder's Copy AI Prompt captures the LIVE composition: block
   order (with palette labels), form width, cfg values and the back
   image — the same snapshot buildMiniLoginTsx/Css consume. */

export interface MiniLoginPromptSnapshot {
  order: { type: string; label: string }[];
  width: number;
  cfg: {
    loginVariant: string;
    guestVariant: string;
    accent: string;
    passwordVisible: boolean;
    loginLabel: string;
    guestLabel: string;
    footerNote: string;
    footerLink: string;
  };
  back: { on: boolean; variant: string; num: string };
}

export function buildMiniLoginPrompt(snap: MiniLoginPromptSnapshot): string {
  const blockLines = snap.order.map((b, i) => `${i + 1}. ${b.label} (type "${b.type}")`);
  const backLine = snap.back.on
    ? `on — variant ${snap.back.variant}, watermark "${snap.back.num}" (decorative layer behind the card)`
    : 'off';

  return [
    'Rebuild the Mini Login form exactly as currently composed in the Mini Login web builder (specimen at /components-wynn) on the main page (src/app/home/page.tsx — the /home member page).',
    '',
    'COMPOSITION AT COPY TIME (live builder state)',
    `- Block order, top to bottom: ${snap.order.length ? '' : '(builder is empty)'}`,
    ...(blockLines.length ? blockLines.map((l) => `  ${l}`) : []),
    `- Form width: ${snap.width}px (drag-resized; render inside a max-width container with horizontal padding)`,
    `- Login CTA: label "${snap.cfg.loginLabel}", variant ${snap.cfg.loginVariant}`,
    `- Guest CTA: label "${snap.cfg.guestLabel}", variant ${snap.cfg.guestVariant}`,
    `- Footer callout: note "${snap.cfg.footerNote}", link "${snap.cfg.footerLink}"`,
    `- Accent: ${snap.cfg.accent} (drives --auth-accent across the form)`,
    `- Password field: ${snap.cfg.passwordVisible ? 'revealed (switch on)' : 'masked (switch off)'}`,
    `- Back image: ${backLine}`,
    '',
    'CODE REFERENCES',
    '- Composition + state: src/app/components-wynn/page.tsx — MiniLoginCard (blocks, cfg, width, back, cursor-tracked glow), LOGIN_COMPONENTS registry (per-block MiniBody/MiniPanel), MINI_DEFAULT_ORDER (factory layout)',
    '- Same-state export reference: buildMiniLoginTsx / buildMiniLoginCss in src/app/components-wynn/export-code.ts consume the identical { order, width, cfg, back } snapshot',
    '- Styles: src/app/login/login.css (auth__* classes); showcase chrome in src/app/components-wynn/components.css',
    '- Per-block detail: each Field controls card carries its own "Copy AI Prompt" chip — consult those for single-block markup recipes',
    '',
    'GUIDANCE',
    '1. Compose the form from the block list above IN ORDER — one small component per LOGIN_COMPONENTS entry, stacked in a column; never collapse the composition into a single monolithic form component.',
    '2. Drive every editable value from props that mirror the builder cfg (loginLabel, guestVariant, guestLabel, footerNote, footerLink, accent, passwordVisible, back { on, variant, num }) — same modularity the builder assumes.',
    '3. Keep the card chrome: dark surface, cursor-tracked glow via --glow-x/--glow-y custom properties, optional back-image layer with its 2-digit watermark.',
    '4. Each block must match its Field controls specimen — same auth__* class contract so blocks stay interchangeable with the builder palette.',
    '5. Tokens: --brand-red #ff1801 (or the captured accent), --font-display (Anton), --font-inter; dark surfaces rgba(255,255,255,0.03–0.06) on black.',
    '6. Accessibility: label every input, focus-visible rings, aria-hidden on decorative icons, contrast >= 4.5:1.',
    '7. Scope: edit only src/app/home/page.tsx and files you add for it — /components-wynn and the /login baselines are read-only references.',
    '8. Verify with `npx tsc --noEmit`, then check /home visually.',
  ].join('\n');
}
