"use client";

import type { StaticImageData } from "next/image";
import waveDark from "@/assets/home/wave-dark.png";
import waveLight from "@/assets/home/wave-light.png";

type HeroWaveProps = {
  isDark: boolean;
};

/**
 * Full-bleed hero wave used on Home / About / Solutions / Brands / Contact.
 * Fills the hero bounds (`inset-0`) and anchors to the bottom edge.
 */
export default function HeroWave({ isDark }: HeroWaveProps) {
  const wave: StaticImageData = isDark ? waveDark : waveLight;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 top-0 overflow-hidden leading-[0]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={wave.src}
        alt=""
        width={wave.width}
        height={wave.height}
        decoding="async"
        draggable={false}
        className="absolute bottom-0 left-1/2 block h-auto w-[155%] max-w-none -translate-x-1/2 select-none sm:left-0 sm:w-full sm:translate-x-0"
        style={{
          opacity: isDark ? 1 : 0.92,
          filter: isDark
            ? "brightness(1.75) contrast(1.5)"
            : "brightness(1.12) contrast(1.65) saturate(1.35)",
        }}
      />
    </div>
  );
}
