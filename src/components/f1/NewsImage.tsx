"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TrackLine } from "./TrackLine";

/**
 * Remote story photo with loading shimmer + branded fallback.
 *
 * Server components can't catch image failures, so this tiny client
 * leaf owns the error state: while the photo loads the media slot shows
 * a red shimmer; when there is no URL — or the download fails — it shows
 * a branded fallback (source name) instead of an empty black box.
 */
export function NewsImage({
  src,
  alt,
  sizes,
  fallbackLabel,
  mediaClassName,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  fallbackLabel: string;
  mediaClassName: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset per photo; a hung download (no load AND no error) falls back
  // after 10s so the shimmer can never spin forever.
  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!src || loaded || failed) return;
    const id = setTimeout(() => setFailed(true), 10000);
    return () => clearTimeout(id);
  }, [src, loaded, failed]);

  if (!src || failed) {
    return (
      <div className={`${mediaClassName} news-media--fallback`} aria-hidden="true">
        <TrackLine className="news-fallback__track" />
        <span className="news-media__fallback-label">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <div className={`${mediaClassName} news-media--loading`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
