"use client";

import { useEffect, useState } from "react";

const NAME = "Dewald Scholtz";
const GLITCH_DURATION_MS = 2000;
const GLITCH_MIN_DELAY_MS = 1000;
const GLITCH_MAX_DELAY_MS = 15000;

/**
 * Hero title rendered as a terminal command: `$ Dewald Scholtz█`.
 * The `$` and the blinking cursor are accent-teal; the name is white.
 *
 * Every random 1–15 seconds the name briefly glitches (RGB-split slice
 * animation, ~500 ms). Respects prefers-reduced-motion (handled in CSS).
 */
export function HeroName() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let triggerTimer: ReturnType<typeof setTimeout> | undefined;
    let clearTimer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      const delay =
        GLITCH_MIN_DELAY_MS +
        Math.random() * (GLITCH_MAX_DELAY_MS - GLITCH_MIN_DELAY_MS);
      triggerTimer = setTimeout(() => {
        setGlitching(true);
        clearTimer = setTimeout(() => {
          setGlitching(false);
          schedule();
        }, GLITCH_DURATION_MS);
      }, delay);
    };

    schedule();

    return () => {
      if (triggerTimer) clearTimeout(triggerTimer);
      if (clearTimer) clearTimeout(clearTimer);
    };
  }, []);

  return (
    <h1
      aria-label={NAME}
      className="flex flex-wrap items-baseline gap-x-3 font-[family-name:var(--font-digital)] text-xl leading-snug text-fg sm:text-2xl"
    >
      <span aria-hidden="true" className="text-accent">
        &gt;
      </span>
      <span
        data-text={NAME}
        className={`glitch-text ${glitching ? "glitch-active" : ""}`}
      >
        {NAME}
      </span>
      <span aria-hidden="true" className="cursor-blink text-accent">
        _
      </span>
    </h1>
  );
}
