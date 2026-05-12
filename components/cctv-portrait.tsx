"use client";

import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/hud/CornerBrackets";

const SCAN_DURATION_MS = 1450;
const PAUSE_MIN_MS = 5000;
const PAUSE_MAX_MS = 12000;

/**
 * The hero's CCTV viewfinder: feathered grayscale portrait + scanlines + dark
 * gradient + sweeping scanner line + corner brackets + HUD overlays.
 *
 * Layout swap:
 *   - Mobile (< lg): an in-flow block at the top of the header, 50vh tall.
 *     Scrolls with the page — user can scroll past it.
 *   - Desktop (≥ lg): absolute-positioned, fills the sticky sidebar behind
 *     the content. Stays put as the right column scrolls.
 *
 * All overlay children (scanner, "Scanning Profile..." indicator, HUD stats,
 * corner brackets) sit inside the wrapper so they position relative to the
 * viewfinder's box in both layouts.
 */
export function CctvPortrait() {
  const [scanIteration, setScanIteration] = useState<number | null>(null);

  useEffect(() => {
    let triggerTimer: ReturnType<typeof setTimeout> | undefined;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;
    let counter = 0;

    const schedule = () => {
      const pause =
        PAUSE_MIN_MS + Math.random() * (PAUSE_MAX_MS - PAUSE_MIN_MS);
      triggerTimer = setTimeout(() => {
        counter += 1;
        setScanIteration(counter);
        stopTimer = setTimeout(() => {
          setScanIteration(null);
          schedule();
        }, SCAN_DURATION_MS);
      }, pause);
    };

    schedule();

    return () => {
      if (triggerTimer) clearTimeout(triggerTimer);
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, []);

  const isScanning = scanIteration !== null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mb-8 h-[55vh] w-full overflow-hidden lg:absolute lg:inset-0 lg:mb-0 lg:h-auto lg:w-auto"
    >
      <div className="cctv-portrait absolute inset-0" />
      <div className="cctv-scanlines absolute inset-0" />
      <div className="cctv-gradient absolute inset-0" />
      <div className="cctv-scanner-wrap absolute inset-0">
        {isScanning && (
          <div
            key={scanIteration}
            className="cctv-scanner-line cctv-scanning"
          />
        )}
      </div>
      <CornerBrackets size="size-4" />

      {/* "Scanning Profile..." indicator — only while sweeping */}
      {isScanning && (
        <div className="absolute right-4 top-4 flex items-center gap-2 lg:right-6 lg:top-6">
          <span className="scan-rec-dot inline-block size-1.5 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            Scanning Profile...
          </span>
        </div>
      )}

      {/* HUD stat readout — always visible */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.18em] text-fg-faint lg:bottom-6 lg:right-6">
        <span>// CAM_01 · WC-ZA</span>
        <span>// LAT -32.50° · LON +18.40°</span>
        <span>// FEED · NOMINAL</span>
      </div>
    </div>
  );
}
