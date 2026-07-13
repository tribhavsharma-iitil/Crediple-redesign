"use client";

import { ChevronRight } from "lucide-react";
import {
  solutionsContent,
  solutionsColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

const { advantage } = solutionsContent;
const C = solutionsColors;

export default function SolutionsAdvantage() {
  const { isDark } = useTheme();

  return (
    <section
      id="advantage"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? C.bg : homeLight.bg }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="font-heading text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: isDark ? "#DCE2F6" : homeLight.heading }}
          >
            {advantage.titleBefore}{" "}
            <span style={getHomeTitleAccentStyle(isDark)}>
              {advantage.titleAccent}
            </span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-sm leading-relaxed md:text-[15px]"
            style={{ color: isDark ? C.textSoftBlue : homeLight.muted }}
          >
            {advantage.subtitle}
          </p>
        </HomeReveal>

        <HomeReveal
          stagger
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {advantage.items.map((item) => (
            <HomeItem key={item.number} variants={homeFadeUp}>
              <div
                className="flex items-center gap-3 rounded-2xl border px-4 py-4 transition-opacity hover:opacity-90 sm:gap-4 sm:px-5 sm:py-5"
                style={{
                  background: isDark
                    ? "rgba(11, 19, 36, 0.85)"
                    : homeLight.card,
                  borderColor: isDark
                    ? "rgba(248,248,248,0.08)"
                    : homeLight.border,
                }}
              >
                <span
                  className="shrink-0 text-xs font-semibold tabular-nums"
                  style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
                >
                  {item.number}
                </span>
                <p
                  className="min-w-0 flex-1 text-sm font-medium sm:text-[15px]"
                  style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
                >
                  {item.label}
                </p>
                <span
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center"
                  style={{
                    color: isDark ? "rgba(220,226,246,0.7)" : "#475569",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-[2px] rotate-45 rounded-[6px] border"
                    style={{
                      borderColor: isDark
                        ? "rgba(220, 226, 246, 0.45)"
                        : "rgba(15, 23, 42, 0.18)",
                      background: isDark ? "transparent" : "#FFFFFF",
                    }}
                  />
                  <ChevronRight size={14} className="relative z-10" />
                </span>
              </div>
            </HomeItem>
          ))}
        </HomeReveal>
      </div>
    </section>
  );
}
