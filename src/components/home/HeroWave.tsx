"use client";

import type { StaticImageData } from "next/image";
import waveDark from "@/assets/home/wave-dark.png";
import waveLight from "@/assets/home/wave-light.png";

type HeroWaveProps = {
  isDark: boolean;
};

/**
 * Full-bleed hero wave used on Home / About / Solutions / Brands.
 * Width-locked (`w-full h-auto`) so the continuous line art never mid-crops
 * or shows a seam the way `object-cover` does in a short frame.
 */
export default function HeroWave({ isDark }: HeroWaveProps) {
  const wave: StaticImageData = isDark ? waveDark : waveLight;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full overflow-hidden leading-[0]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 28%, black 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 28%, black 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={wave.src}
        alt=""
        width={wave.width}
        height={wave.height}
        decoding="async"
        draggable={false}
        className="block h-auto w-full max-w-none select-none"
      />
    </div>
  );
}
