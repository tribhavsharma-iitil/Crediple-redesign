"use client";

import { aboutContent, aboutColors } from "@/content/about";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

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
        <HomeReveal variants={homeFadeUp}>
          <h2
            className="font-heading mb-5 text-2xl font-black tracking-tight sm:text-3xl md:text-[2.75rem]"
            style={{ color: isDark ? C.text : "#0F172A" }}
          >
            {foundation.title}
          </h2>

          <div
            className="border px-6 py-8 sm:px-10 sm:py-10"
            style={{
              background: isDark ? "transparent" : "#F8FAFC",
              borderColor: isDark ? "#232323" : "#E2E8F0",
            }}
          >
            <p
              className="font-heading font-bold text-xl sm:text-2xl md:text-[1.65rem] leading-[1.35] mb-4 max-w-2xl"
              style={{ color: isDark ? "#ffffff" : "#1E293B" }}
            >
              {foundation.headline}
            </p>
            <p
              className="text-sm md:text-[15px] leading-relaxed max-w-2xl"
              style={{ color: isDark ? '#FFFFFFCC' : "#64748B" }}
            >
              {foundation.body}
            </p>
            <p
              className="text-sm md:text-[15px] font-semibold mt-4 leading-relaxed max-w-2xl"
              style={{ color: isDark ? '#FFFFFFCC' : "#64748B" }}
            >
              {foundation.subtitle}
            </p>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
