/**
 * Abstract racing-line SVG — a brand device, NOT a real circuit.
 *
 * Two flowing strokes suggest speed without depicting any actual track,
 * so it can sit behind the hero and inside image fallbacks without
 * misleading anyone. Opacity is set by the parent class (hero ~5%,
 * fallback slightly stronger). Decorative: always aria-hidden and
 * pointer-events-none via CSS.
 */
export function TrackLine({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? ""}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M-20 320 C 140 300, 180 180, 320 190 S 520 320, 660 220 S 780 120, 830 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M-20 350 C 150 330, 200 220, 330 228 S 520 350, 655 255 S 775 165, 830 185"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
