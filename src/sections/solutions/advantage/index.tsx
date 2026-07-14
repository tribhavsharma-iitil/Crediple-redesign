"use client";

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
      className="relative overflow-hidden section-py"
      style={{ background: isDark ? C.bg : homeLight.bg }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
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
                className="group relative overflow-hidden rounded-2xl border px-5 py-5 sm:px-6 sm:py-6"
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
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ background: C.buttonGradient }}
                />
                <div className="flex items-baseline gap-4 pl-1">
                  <span
                    className="font-heading shrink-0 text-[11px] font-bold tracking-[0.14em] tabular-nums sm:text-xs"
                    style={{
                      color: isDark ? C.textAccent : C.accentStrong,
                    }}
                  >
                    {item.number}
                  </span>
                  <p
                    className="font-heading min-w-0 text-[15px] font-semibold leading-snug tracking-tight sm:text-base"
                    style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            </HomeItem>
          ))}
        </HomeReveal>
      </div>
    </section>
  );
}
