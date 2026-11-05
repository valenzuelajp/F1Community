import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import "./site-shell.css";

/**
 * Original text wordmark — red slash bar + condensed uppercase name.
 * Real text (not an image), so screen readers announce the product name.
 * Sizing is em-based: set font-size on the `.max-wordmark` box per context.
 */
export function Wordmark({ href = "/home" }: { href?: string }) {
  return (
    <Link href={href} className="max-wordmark" aria-label={`${SITE_NAME} home`}>
      <span className="max-wordmark__slash" aria-hidden="true" />
      <span className="max-wordmark__text">{SITE_NAME}</span>
    </Link>
  );
}
