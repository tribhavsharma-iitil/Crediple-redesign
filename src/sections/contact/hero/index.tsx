"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import {
  contactContent,
  contactColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/contact";
import { useTheme } from "@/context/ThemeContext";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import HeroWave from "@/components/home/HeroWave";
import YakaBrandMark from "@/components/home/YakaBrandMark";

const { hero } = contactContent;
const C = contactColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function ContactHero() {
  const { isDark } = useTheme();
  const { heroStagger } = useHomeMotion();

  return (
    <section
      id="contact-hero"
      className="relative flex min-h-0 items-start justify-center overflow-x-clip pt-28 pb-10 select-none md:min-h-[var(--hero-min-h)] md:items-center md:pt-24 md:pb-14 lg:pt-28 lg:pb-16"
      style={{ background: isDark ? C.bg : homeLight.bgSoft }}
    >
      <HeroWave isDark={isDark} />

      <div className="pointer-events-none absolute top-[4.5rem] right-3 z-20 md:top-20 md:right-4 lg:top-24 lg:right-8 xl:right-12">
        <YakaBrandMark />
      </div>

      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-[36%] left-1/2 z-0 h-[min(360px,50vw)] w-[min(640px,100vw)] -translate-x-1/2"
          style={{
            background: `radial-gradient(ellipse, ${C.glow} 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
        />
      )}

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-6"
      >
        <motion.h1
          variants={heroItem}
          className="font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-[4.25rem]"
          style={{ color: isDark ? C.text : homeLight.heading }}
        >
          {hero.titleLine1}
          <br />
          <span style={getHomeTitleAccentStyle(isDark)}>{hero.titleAccent}</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-4 max-w-xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base"
          style={{ color: isDark ? C.textMuted : homeLight.muted }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
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

          <Link
            href={hero.secondaryCta.href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold no-underline transition-colors sm:w-auto sm:px-7 md:h-12"
            style={{
              borderColor: isDark
                ? "rgba(248,248,248,0.28)"
                : "rgba(15,23,42,0.15)",
              color: isDark ? C.text : homeLight.heading,
              background: "transparent",
            }}
          >
            {hero.secondaryCta.label}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
