"use client";

import Image from "next/image";
import { aboutContent, aboutColors } from "@/content/about";
import { homeLight } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeScaleIn } from "@/lib/animations";
import cardBg from "@/assets/gradient.png";

const { closing } = aboutContent;
const C = aboutColors;

export default function AboutClosing() {
  const { isDark } = useTheme();

  return (
    <section
      className="relative overflow-hidden pt-2 pb-16 sm:pt-4 sm:pb-20 md:pb-24"
      style={{ background: isDark ? C.bg : homeLight.bg }}
    >
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeScaleIn}>
          {/* Same container treatment as Home CTA — both themes */}
          <div
            className="relative overflow-hidden rounded-2xl px-5 py-12 text-center sm:rounded-[28px] sm:px-12 sm:py-20 md:px-20 md:py-24"
            style={{
              backgroundColor: "#050B18",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
            >
              <Image
                src={cardBg}
                alt=""
                fill
                sizes="(max-width: 1260px) 100vw, 1260px"
                className="object-cover object-center opacity-90"
                priority={false}
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background: `
                  radial-gradient(ellipse 45% 55% at 12% 88%, rgba(70, 50, 140, 0.28) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 50% at 90% 12%, rgba(47, 128, 237, 0.18) 0%, transparent 70%)
                `,
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(160, 190, 240, 0.14) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(160, 190, 240, 0.14) 1px, transparent 1px)
                `,
                backgroundSize: "52px 52px",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 35%, transparent 78%)",
              }}
            />

            <h2 className="font-heading relative z-10 mb-5 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              {closing.brand}
            </h2>
            <p
              className="font-heading relative z-10 mx-auto max-w-2xl text-base leading-snug font-bold sm:text-lg md:text-xl"
              style={{ color: "#A8B0BC" }}
            >
              {closing.line}
            </p>
          </div>
        </HomeReveal>

        <p
          className="mt-8 text-center text-base leading-6 font-semibold"
          style={{ color: isDark ? C.textClosing : "#94A3B8" }}
        >
          {closing.copyright}
        </p>
      </div>
    </section>
  );
}
