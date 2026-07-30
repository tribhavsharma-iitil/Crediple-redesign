"use client";

import { solutionsContent, solutionsColors } from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

const { foundation } = solutionsContent;
const C = solutionsColors;

export default function SolutionsFoundation() {
  const { isDark } = useTheme();

  return (
    <section
      id="foundation"
      className="relative overflow-hidden section-py"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <div
            className="border px-6 py-8 sm:px-10 sm:py-10"
            style={{
              background: isDark ? "#FFFFFF0A" : "#F8FAFC",
              borderColor: isDark ? "#232323" : "#E2E8F0",
            }}
          >
            <p
              className="font-heading mb-4 text-xl leading-[1.35] font-bold sm:text-2xl md:text-[1.65rem]"
              style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
            >
              {foundation.headline}
            </p>
            <p
              className="mb-4 text-sm leading-relaxed md:text-[15px]"
              style={{ color: isDark ? "#FFFFFFCC" : "#64748B" }}
            >
              {foundation.body}
            </p>
            <p
              className="text-sm leading-relaxed md:text-[15px]"
              style={{ color: isDark ? "#FFFFFFCC" : "#64748B" }}
            >
              {foundation.accent}
            </p>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
