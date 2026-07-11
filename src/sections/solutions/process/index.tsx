"use client";

import type { CSSProperties } from "react";
import {
  solutionsContent,
  solutionsColors,
  homeTitleAccentStyle,
} from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

const { process } = solutionsContent;
const C = solutionsColors;

const T = {
  bg: "#03081A",
  card: "#0B1324",
  ball: "#041565",
  muted: "#7B8494",
  number: "#5FA8FF",
} as const;

function Ball({
  size,
  style,
  className,
}: {
  size: number;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        backgroundColor: T.ball,
        ...style,
      }}
    />
  );
}

export default function SolutionsProcess() {
  const { isDark } = useTheme();

  return (
    <section
      id="process"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? T.bg : "#FFFFFF" }}
    >
      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <Ball
            size={180}
            style={{ left: -40, bottom: 40 }}
            className="sm:!bottom-[50px] sm:!-left-[50px] sm:!h-[250px] sm:!w-[250px]"
          />
          <Ball
            size={80}
            style={{ right: "6%", top: 48 }}
            className="sm:!top-[72px] sm:!right-[8%] sm:!h-[130px] sm:!w-[130px]"
          />
          <Ball
            size={64}
            style={{ right: 24, bottom: 40 }}
            className="sm:!right-[100px] sm:!bottom-[70px] sm:!h-[100px] sm:!w-[100px]"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-10 sm:mb-12 md:mb-14">
          <h2
            className="font-heading text-left text-[1.75rem] font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
          >
            {process.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{process.titleAccent}</span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-left text-[10px] font-semibold leading-relaxed tracking-[0.14em] uppercase sm:text-[11px] sm:tracking-[0.16em]"
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
                style={{ background: isDark ? T.card : "#F8FAFC" }}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <p
                    className="font-heading text-sm font-bold sm:text-[15px]"
                    style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                  >
                    {step.label}
                  </p>
                  <span
                    className="font-heading text-2xl font-black tracking-tight sm:text-3xl"
                    style={{ color: isDark ? T.number : C.accentStrong }}
                  >
                    {step.number}
                  </span>
                </div>
                <p
                  className="text-[13px] leading-relaxed sm:text-sm"
                  style={{ color: isDark ? "#D8DEE8" : "#475569" }}
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
