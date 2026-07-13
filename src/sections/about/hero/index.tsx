"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { aboutContent, aboutColors } from "@/content/about";
import { useTheme } from "@/context/ThemeContext";
import { homeStagger, homeEase } from "@/lib/animations";
import yakaBlue from "@/assets/yaka_blue.png";
import yakaLight from "@/assets/yaka_light.png";
import HeroWave from "@/components/home/HeroWave";

const { hero } = aboutContent;
const C = aboutColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function AboutHero() {
  const { isDark } = useTheme();

  return (
    <section
      id="about-hero"
      className="relative flex min-h-[100svh] items-center justify-start overflow-hidden pt-24 pb-10 select-none sm:justify-center sm:pt-28 sm:pb-24 md:pt-32 md:pb-28"
      style={{ background: isDark ? C.bg : "#F8FAFC" }}
    >
      <HeroWave isDark={isDark} />

      <div className="pointer-events-none absolute top-16 right-3 z-20 w-[56px] sm:top-20 sm:right-4 sm:w-[72px] md:top-24 md:right-8 md:w-[88px] xl:right-12 xl:w-[100px]">
        <div className="flex flex-col items-center gap-1 sm:gap-1.5">
          <div className="relative h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 xl:h-16 xl:w-16">
            <Image
              src={isDark ? yakaBlue : yakaLight}
              alt="YAKA"
              fill
              priority
              sizes="(max-width: 640px) 36px, 64px"
              className="object-contain"
            />
          </div>
          <p
            className="max-w-[64px] text-center text-[7px] leading-tight font-medium tracking-wide sm:max-w-none sm:text-[8px] md:text-[9px]"
            style={{ color: isDark ? C.textSoftBlue : "#475569" }}
          >
            A{" "}
            <span
              className="font-bold"
              style={{ color: isDark ? C.text : "#0F172A" }}
            >
              YAKA
            </span>{" "}
            Enterprise
          </p>
        </div>
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
        variants={homeStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pr-16 text-center sm:px-6 sm:pr-6"
      >
        <motion.h1
          variants={heroItem}
          className="font-heading mb-3 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-[4.25rem]"
          style={{ color: isDark ? C.text : "#0F172A" }}
        >
          {hero.titleLine1}
          <br />
          <span
            className="inline-block sm:whitespace-nowrap"
            style={{ color: isDark ? C.textAccent : C.accentSoft }}
          >
            {hero.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-6 max-w-xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base"
          style={{ color: isDark ? C.textMuted : "#64748B" }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex w-full max-w-[280px] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href={hero.primaryCta.href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 sm:w-auto sm:px-7 md:h-12"
            style={{
              background: C.buttonGradient,
              boxShadow: `0 8px 28px ${C.glow}`,
            }}
          >
            <Play size={13} className="fill-current" />
            {hero.primaryCta.label}
          </a>

          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold no-underline transition-colors sm:w-auto sm:px-7 md:h-12"
            style={{
              borderColor: isDark
                ? "rgba(248,248,248,0.28)"
                : "rgba(15,23,42,0.15)",
              color: isDark ? C.text : "#0F172A",
              background: "transparent",
            }}
          >
            {hero.secondaryCta.label}
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
