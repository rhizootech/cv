"use client";

import { useEffect, useState } from "react";
import { CornerBrackets } from "@/components/hud/CornerBrackets";

const SCAN_DURATION_MS = 1450;
const PAUSE_MIN_MS = 5000;
const PAUSE_MAX_MS = 12000;

/**
 * The hero sidebar's background: feathered grayscale portrait + scanlines +
 * dark gradient + sweeping scanner line + teal corner brackets. lg+ only.
 *
 * Random schedule (5–12 s pause between sweeps). Both the scanner line and
 * the top-right "Scanning Profile..." indicator are gated on the same
 * `scanIteration` state, so they appear and disappear together with each
 * sweep. The `key` increments per scan so the CSS animation cleanly remounts.
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
    <>
      {/* Background CCTV layers — behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block"
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
      </div>

      {/* "Scanning Profile..." indicator — overlay, lg+ only, only while sweeping */}
      {isScanning && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-6 hidden items-center gap-2 lg:flex"
        >
          <span className="scan-rec-dot inline-block size-1.5 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            Scanning Profile...
          </span>
        </div>
      )}

      {/* HUD stat readout — bottom-right, always visible, lg+ only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-6 hidden flex-col items-end gap-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.18em] text-fg-faint lg:flex"
      >
        <span>// CAM_01 · WC-ZA</span>
        <span>// LAT -32.50° · LON +18.40°</span>
        <span>// FEED · NOMINAL</span>
      </div>
    </>
  );
}
