"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { useIntroPhase } from "@/components/layout/AppShell";
import { homeStagger, homeEase } from "@/lib/animations";
import HeroWave from "@/components/home/HeroWave";
import YakaBrandMark from "@/components/home/YakaBrandMark";

const { hero, trust } = homeContent;
const C = homeColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function Hero() {
  const { isDark } = useTheme();
  const { phase } = useIntroPhase();
  const showStaticLogo = phase === "ready";

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-start overflow-hidden px-0 pt-24 pb-10 select-none sm:justify-center sm:pt-28 sm:pb-20 md:pt-32 md:pb-24"
      style={{ background: isDark ? C.bg : homeLight.bgSoft }}
    >
      <HeroWave isDark={isDark} />

      {/* YAKA mark + themed tagline */}
      <div
        id="yaka-logo-anchor"
        className="pointer-events-none absolute top-16 right-2 z-20 sm:top-20 sm:right-4 md:top-24 md:right-8 xl:right-12"
      >
        {showStaticLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <YakaBrandMark />
          </motion.div>
        )}
      </div>

      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-[38%] left-1/2 z-0 h-[min(360px,50vw)] w-[min(640px,100vw)] -translate-x-1/2"
          style={{
            background: `radial-gradient(ellipse, ${C.glow} 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
        />
      )}

      <motion.div
        variants={homeStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pr-16 text-center sm:px-6 sm:pr-6"
      >
        <motion.div
          variants={heroItem}
          className="mb-4 w-fit max-w-full sm:mb-6 md:mb-7"
        >
          <span
            className="inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium tracking-wide sm:px-4 sm:text-[11px] md:text-xs"
            style={{
              borderColor: isDark
                ? "rgba(180, 197, 255, 0.45)"
                : "rgba(21,80,180,0.25)",
              color: isDark ? "#B4C5FF" : C.accentStrong,
              background: isDark
                ? "rgba(10, 20, 45, 0.85)"
                : "rgba(47,128,237,0.08)",
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "#22C55E" }}
            />
            <span className="truncate">{hero.badge}</span>
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="font-heading mb-3 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-[4.25rem]"
          style={{ color: isDark ? C.text : homeLight.heading }}
        >
          {hero.titleLine1}
          <br />
          <span style={getHomeTitleAccentStyle(isDark)}>{hero.titleLine2}</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-6 max-w-xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base"
          style={{ color: isDark ? C.textMuted : homeLight.muted }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mb-7 flex w-full max-w-[280px] flex-col items-stretch justify-center gap-3 sm:mb-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 md:mb-12"
        >
          <Link
            href={hero.primaryCta.href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 sm:w-auto sm:px-7 md:h-12"
            style={{
              background: C.buttonGradient,
              boxShadow: `0 8px 28px ${C.glow}`,
            }}
          >
            <Play size={13} className="fill-current" />
            {hero.primaryCta.label}
          </Link>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3"
        >
          <div className="flex items-center -space-x-2">
            {trust.marks.map((mark) => (
              <div
                key={mark}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[8px] font-bold"
                style={{
                  background: C.buttonGradient,
                  color: "#fff",
                  boxShadow: `0 0 0 2px ${isDark ? C.bg : homeLight.bgSoft}`,
                }}
              >
                {mark}
              </div>
            ))}
          </div>
          <p
            className="text-xs font-medium sm:text-sm"
            style={{ color: isDark ? C.textMuted : homeLight.muted }}
          >
            {trust.label}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
