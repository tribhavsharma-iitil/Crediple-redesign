"use client";

import type { StaticImageData } from "next/image";
import waveDark from "@/assets/home/wave-dark.png";
import waveLight from "@/assets/home/wave-light.png";

type HeroWaveProps = {
  isDark: boolean;
};

/**
 * Full-bleed hero wave used on Home / About / Solutions / Brands / Contact.
 *
 * Pinned to the first viewport (`100svh`) so when the hero grows taller than
 * the screen on mobile, the wave stays on-screen — not below the fold.
 *
 * Mobile: full wave shape (no object-cover crop), lifted behind the copy.
 * Desktop: width-locked at the bottom so line art never mid-crops.
 */
export default function HeroWave({ isDark }: HeroWaveProps) {
  const wave: StaticImageData = isDark ? waveDark : waveLight;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] overflow-hidden leading-[0]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={wave.src}
        alt=""
        width={wave.width}
        height={wave.height}
        decoding="async"
        draggable={false}
        className="absolute top-[36%] left-1/2 block h-auto w-[200%] max-w-none -translate-x-1/2 select-none sm:top-auto sm:bottom-0 sm:left-0 sm:w-full sm:translate-x-0"
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
