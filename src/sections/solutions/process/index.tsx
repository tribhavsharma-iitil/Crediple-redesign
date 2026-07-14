"use client";

import {
  solutionsContent,
  homeTitleAccentStyle,
} from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

const { process } = solutionsContent;

const T = {
  bg: "#03081A",
  card: "#0B1324",
  muted: "#7B8494",
  number: "#5FA8FF",
} as const;

export default function SolutionsProcess() {
  const { isDark } = useTheme();

  return (
    <section
      id="process"
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
      style={{ background: isDark ? T.bg : "#FFFFFF" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-10 sm:mb-12 md:mb-14">
          <h2
            className="font-heading text-left text-[1.5rem] font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
          >
            {process.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{process.titleAccent}</span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-left text-sm leading-relaxed sm:text-[15px]"
            style={{ color: isDark ? T.muted : "#64748B" }}
          >
            {process.subtitle}
          </p>
        </HomeReveal>

        <HomeReveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 md:gap-6">
          {process.steps.map((step) => (
            <HomeItem key={step.number} variants={homeFadeUp}>
              <article
                className="flex h-full flex-col rounded-2xl p-5 text-left sm:p-6 md:p-7"
                style={{
                  background: isDark ? T.card : "#F8FAFC",
                  border: isDark
                    ? "1px solid rgba(248,248,248,0.06)"
                    : "1px solid #E2E8F0",
                }}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3
                    className="font-heading text-lg font-bold sm:text-xl"
                    style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                  >
                    {step.label}
                  </h3>
                  <span
                    className="font-heading text-2xl font-black tabular-nums sm:text-3xl"
                    style={{ color: T.number }}
                  >
                    {step.number}
                  </span>
                </div>
                <p
                  className="text-[13px] leading-relaxed sm:text-sm"
                  style={{ color: isDark ? "#D8E0F0" : "#475569" }}
                >
                  {step.text}
                </p>
              </article>
            </HomeItem>
          ))}
        </HomeReveal>
      </div>
    </section>
  );
}
