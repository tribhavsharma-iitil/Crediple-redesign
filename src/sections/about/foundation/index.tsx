"use client";

import Image from "next/image";
import { aboutContent, aboutColors } from "@/content/about";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeFadeRight } from "@/lib/animations";

const { foundation } = aboutContent;
const C = aboutColors;

export default function AboutFoundation() {
  const { isDark } = useTheme();

  return (
    <section
      id="foundation"
      className="relative section-py overflow-hidden"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
          <HomeReveal stagger>
            <HomeItem variants={homeFadeLeft}>
              <h2
                className="font-heading mb-5 text-2xl font-black tracking-tight sm:text-3xl md:text-[2.75rem]"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {foundation.title}
              </h2>
              <p
                className="font-heading font-bold text-xl sm:text-2xl md:text-[1.65rem] leading-[1.35] mb-6 max-w-md"
                style={{ color: isDark ? "#D8D8D8" : "#1E293B" }}
              >
                {foundation.headline}
              </p>
              <p
                className="text-sm md:text-[15px] leading-relaxed mb-5 max-w-lg"
                style={{ color: isDark ? C.textBody : "#64748B" }}
              >
                {foundation.body}
              </p>
              <p
                className="text-sm md:text-[15px] leading-relaxed max-w-lg"
                style={{ color: isDark ? C.textSoftBlue : C.accentStrong }}
              >
                {foundation.accent}
              </p>
            </HomeItem>
          </HomeReveal>

          <HomeReveal variants={homeFadeRight} delay={0.1}>
            <div
              className="relative rounded-[20px] overflow-hidden w-full aspect-[5/4] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              style={{
                border: isDark
                  ? "1px solid rgba(248,248,248,0.08)"
                  : "1px solid #E2E8F0",
              }}
            >
              <Image
                src={foundation.image}
                alt="Digital ecosystem network"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </HomeReveal>
        </div>
      </div>
    </section>
  );
}
