"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { aboutContent, aboutColors } from "@/content/about";
import { homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeFadeLeft,
  homeStagger,
  homeViewport,
} from "@/lib/animations";

const { philosophy } = aboutContent;
const C = aboutColors;

export default function AboutPhilosophy() {
  const { isDark } = useTheme();

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
    >
      {isDark && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-24 h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(4,21,101,0.85) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/3 h-[380px] w-[380px] translate-y-1/3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(4,21,101,0.7) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10">
          <h2
            className="font-heading text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: isDark ? C.textHeading : "#0F172A" }}
          >
            {philosophy.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{philosophy.titleAccent}</span>
          </h2>
        </HomeReveal>

        <HomeReveal variants={homeFadeUp}>
          <div
            className="mb-5 rounded-[22px] border px-4 py-8 sm:mb-6 sm:px-10 sm:py-14 md:px-14"
            style={{
              background: isDark ? "#0B1324" : "#FFFFFF",
              borderColor: isDark ? "rgba(248,248,248,0.08)" : "#E2E8F0",
            }}
          >
            <p
              className="mb-12 text-center text-[10px] font-semibold uppercase tracking-[0.18em] sm:mb-14 sm:text-[11px]"
              style={{ color: isDark ? "#707880" : "#64748B" }}
            >
              {philosophy.intro}
            </p>

            <div className="mx-auto mb-12 max-w-4xl sm:mb-14">
              {/* —— Mobile: stacked steps —— */}
              <div className="flex flex-col items-center gap-0 sm:hidden">
                {philosophy.principles.map((item, i) => (
                  <div
                    key={`m-${item.number}`}
                    className="flex w-full flex-col items-center text-center"
                  >
                    <div className="relative">
                      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] text-[13px] font-bold text-[#0F172A] shadow-[0_4px_12px_rgba(15,23,42,0.08)] dark:border-[rgba(176,200,248,0.35)] dark:bg-[#0E1628] dark:text-white dark:shadow-[0_0_24px_rgba(47,128,237,0.35)]">
                        {item.number}
                      </div>
                    </div>
                    <p className="mt-3 max-w-[260px] text-sm font-semibold leading-snug text-[#0F172A] dark:text-[#F0F0F0]">
                      {item.text}
                    </p>
                    {i < philosophy.principles.length - 1 && (
                      <div
                        aria-hidden
                        className="my-4 h-8 w-px border-l border-dashed border-[rgba(47,128,237,0.4)] dark:border-[rgba(200,220,255,0.55)]"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* —— Desktop/tablet: side-by-side with wave —— */}
              <div className="hidden sm:block" aria-hidden={false}>
                <div className="relative h-14">
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                    viewBox="0 0 100 56"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 16.7 28 C 24 28, 28 10, 33 10 S 42 28, 50 28 S 58 10, 67 10 S 76 28, 83.3 28"
                      stroke="rgba(200, 220, 255, 0.75)"
                      strokeWidth="1.5"
                      strokeDasharray="3.5 5.5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  <div className="relative z-10 grid h-full grid-cols-3 items-center">
                    {philosophy.principles.map((item) => (
                      <div key={`d-${item.number}`} className="flex justify-center">
                        <div className="relative">
                          <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] text-[13px] font-bold text-[#0F172A] shadow-[0_4px_12px_rgba(15,23,42,0.08)] dark:border-[rgba(176,200,248,0.35)] dark:bg-[#0E1628] dark:text-white dark:shadow-[0_0_24px_rgba(47,128,237,0.35)]">
                            {item.number}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">
                  {philosophy.principles.map((item) => (
                    <p
                      key={`dl-${item.number}`}
                      className="px-1 text-center text-sm font-semibold leading-snug text-[#0F172A] dark:text-[#F0F0F0]"
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <p
              className="text-center text-sm font-bold uppercase tracking-[0.08em] sm:text-base"
              style={{ color: isDark ? C.textAccentSoft : C.accentSoft }}
            >
              {philosophy.verdict}
            </p>
          </div>
        </HomeReveal>

        <motion.div
          variants={homeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={homeViewport}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {philosophy.pillars.map((item) => (
            <HomeItem key={item.number} variants={homeFadeUp}>
              <div
                className="flex items-center gap-4 rounded-[16px] border px-5 py-[18px] transition-colors hover:border-[rgba(90,150,227,0.35)]"
                style={{
                  background: isDark ? "#0B1324" : "#FFFFFF",
                  borderColor: isDark
                    ? "rgba(248,248,248,0.08)"
                    : "#E2E8F0",
                }}
              >
                <span
                  className="w-7 shrink-0 font-heading text-sm font-bold tabular-nums"
                  style={{ color: isDark ? C.textMuted : "#94A3B8" }}
                >
                  {item.number}
                </span>
                <span
                  className="min-w-0 flex-1 text-sm font-medium"
                  style={{ color: isDark ? C.textHeading : "#0F172A" }}
                >
                  {item.label}
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    borderColor: isDark
                      ? "rgba(248,248,248,0.16)"
                      : "#E2E8F0",
                    color: isDark ? C.textMuted : "#64748B",
                    background: isDark ? "rgba(18,28,51,0.6)" : "#F8FAFC",
                  }}
                >
                  <ChevronRight size={14} />
                </span>
              </div>
            </HomeItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
