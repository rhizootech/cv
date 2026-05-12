"use client";

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CornerBrackets } from "@/components/hud/CornerBrackets";

export type GalleryImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Config-only child. Never renders anything itself — its props are read by
 * <ImageGallery> via React.Children. Used as:
 *
 *   <ImageGallery>
 *     <GalleryImage src="..." alt="..." />
 *     <GalleryImage src="..." alt="..." />
 *   </ImageGallery>
 */
export function GalleryImage(_props: GalleryImageProps): null {
  return null;
}
GalleryImage.displayName = "GalleryImage";

/**
 * Single-image slider with HUD corner brackets, prev/next on hover,
 * dot indicators, image counter, keyboard arrow navigation.
 *
 * Read image config from <GalleryImage> children. The children-based shape
 * (rather than an `images={[...]}` array prop) serializes cleanly across the
 * RSC → client component boundary in next-mdx-remote.
 */
export function ImageGallery({ children }: { children?: ReactNode }) {
  const images: GalleryImageProps[] = Children.toArray(children)
    .filter(isValidElement)
    .map((el) => (el as React.ReactElement<GalleryImageProps>).props)
    .filter(
      (p): p is GalleryImageProps =>
        typeof p?.src === "string" && typeof p?.alt === "string",
    );

  const count = images.length;
  const [index, setIndex] = useState(0);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext, count]);

  if (count === 0) return null;
  const current = images[Math.min(index, count - 1)];

  return (
    <figure className="my-8" aria-roledescription="carousel">
      <div className="group relative overflow-hidden rounded-md border border-edge bg-panel">
        <CornerBrackets />

        {/* Counter (top-right) */}
        <div className="pointer-events-none absolute right-3 top-3 z-10 rounded bg-canvas/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted backdrop-blur">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </div>

        {/* Current image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="block w-full"
          loading="lazy"
        />

        {/* Prev / Next buttons */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-md border border-edge bg-canvas/70 p-2 text-fg-muted opacity-0 backdrop-blur transition-all hover:border-accent hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-md border border-edge bg-canvas/70 p-2 text-fg-muted opacity-0 backdrop-blur transition-all hover:border-accent hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
          {current.caption}
        </figcaption>
      )}

      {/* Dot indicators */}
      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-5 bg-accent"
                  : "w-1.5 bg-edge hover:bg-accent-deep"
              }`}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
