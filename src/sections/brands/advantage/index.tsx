"use client";

import { ChevronRight } from "lucide-react";
import {
  brandsContent,
  brandsColors,
  homeTitleAccentStyle,
} from "@/content/brands";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

const { advantage } = brandsContent;
const C = brandsColors;

export default function BrandsAdvantage() {
  const { isDark } = useTheme();

  return (
    <section
      id="advantage"
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
      style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
    >
      {isDark && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute -top-20 -left-16 h-[280px] w-[280px] rounded-full opacity-80"
            style={{
              background: "radial-gradient(circle, #041565 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute right-[-40px] bottom-[15%] h-[220px] w-[220px] rounded-full opacity-75"
            style={{
              background: "radial-gradient(circle, #041565 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="font-heading text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: isDark ? "#DCE2F6" : "#0F172A" }}
          >
            {advantage.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{advantage.titleAccent}</span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-sm leading-relaxed md:text-[15px]"
            style={{ color: isDark ? C.textSoftBlue : "#64748B" }}
          >
            {advantage.subtitle}
          </p>
        </HomeReveal>

        <HomeReveal
          stagger
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {advantage.items.map((item) => (
            <HomeItem key={item.number} variants={homeFadeUp}>
              <div
                className="flex items-center gap-3 rounded-2xl border px-4 py-4 transition-opacity hover:opacity-90 sm:gap-4 sm:px-5 sm:py-5"
                style={{
                  background: isDark ? "rgba(11, 19, 36, 0.85)" : "#FFFFFF",
                  borderColor: isDark
                    ? "rgba(248,248,248,0.08)"
                    : "#E2E8F0",
                }}
              >
                <span
                  className="shrink-0 text-xs font-semibold tabular-nums"
                  style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                >
                  {item.number}
                </span>
                <p
                  className="min-w-0 flex-1 text-sm font-medium sm:text-[15px]"
                  style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                >
                  {item.label}
                </p>
                <ChevronRight
                  size={16}
                  className="shrink-0"
                  style={{
                    color: isDark ? "rgba(248,248,248,0.55)" : "#94A3B8",
                  }}
                />
              </div>
            </HomeItem>
          ))}
        </HomeReveal>
      </div>
    </section>
  );
}
