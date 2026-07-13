"use client";

import Image from "next/image";
import { solutionsContent, solutionsColors } from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeFadeRight } from "@/lib/animations";

const { foundation } = solutionsContent;
const C = solutionsColors;

export default function SolutionsFoundation() {
  const { isDark } = useTheme();

  return (
    <section
      id="foundation"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <HomeReveal stagger>
            <HomeItem variants={homeFadeLeft}>
              <h2
                className="font-heading mb-5 text-3xl font-black tracking-tight sm:text-4xl md:text-[2.75rem]"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {foundation.title}
              </h2>
              <p
                className="font-heading mb-6 max-w-md text-xl leading-[1.35] font-bold sm:text-2xl md:text-[1.65rem]"
                style={{ color: isDark ? "#D8D8D8" : "#1E293B" }}
              >
                {foundation.headline} {foundation.subheadline}
              </p>
              <p
                className="mb-5 max-w-lg text-sm leading-relaxed md:text-[15px]"
                style={{ color: isDark ? C.textBody : "#64748B" }}
              >
                {foundation.body}
              </p>
              <p
                className="max-w-lg text-sm leading-relaxed md:text-[15px]"
                style={{ color: isDark ? C.textSoftBlue : C.accentStrong }}
              >
                {foundation.accent}
              </p>
            </HomeItem>
          </HomeReveal>

          <HomeReveal variants={homeFadeRight} delay={0.1}>
            <div
              className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
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
