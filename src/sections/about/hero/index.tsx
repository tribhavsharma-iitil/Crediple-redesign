"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { aboutContent, aboutColors } from "@/content/about";
import { useTheme } from "@/context/ThemeContext";
import { homeStagger, homeEase } from "@/lib/animations";
import yakaBlue from "@/assets/yaka_blue.png";
import HeroWave from "@/components/home/HeroWave";

const { hero, trust } = aboutContent;
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
      className="relative min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-28 sm:pb-32 md:pb-36 overflow-hidden select-none"
      style={{ background: isDark ? C.bg : "#F8FAFC" }}
    >
      <HeroWave isDark={isDark} />

      <div className="absolute top-16 sm:top-20 md:top-24 right-3 sm:right-4 md:right-8 xl:right-12 z-20 w-[56px] sm:w-[72px] md:w-[88px] xl:w-[100px] pointer-events-none">
        <div className="flex flex-col items-center gap-1 sm:gap-1.5">
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-16 xl:h-16">
            <Image
              src={yakaBlue}
              alt="YAKA"
              fill
              priority
              sizes="(max-width: 640px) 36px, 64px"
              className="object-contain"
            />
          </div>
          <p
            className="text-[7px] sm:text-[8px] md:text-[9px] font-medium tracking-wide text-center leading-tight max-w-[64px] sm:max-w-none"
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
          className="absolute left-1/2 top-[36%] -translate-x-1/2 w-[min(640px,100vw)] h-[min(360px,50vw)] pointer-events-none z-0"
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
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6"
      >
        <motion.h1
          variants={heroItem}
          className="font-heading font-[800] text-[1.85rem] sm:text-5xl md:text-6xl xl:text-[4.25rem] leading-[1.12] tracking-tight mb-4 sm:mb-5 md:mb-6 px-1"
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
          className="text-[13px] sm:text-sm md:text-[15px] lg:text-base max-w-xl leading-relaxed mb-7 sm:mb-8 md:mb-9 px-1"
          style={{ color: isDark ? C.textMuted : "#64748B" }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 w-full max-w-sm sm:max-w-none"
        >
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-7 h-11 md:h-12 rounded-full font-semibold text-sm text-white no-underline transition-opacity hover:opacity-90 w-full sm:w-auto"
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
            className="inline-flex items-center justify-center gap-2 px-7 h-11 md:h-12 rounded-full font-semibold text-sm no-underline border transition-colors w-full sm:w-auto"
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

        <motion.div
          variants={heroItem}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center -space-x-2">
            {trust.marks.map((mark) => (
              <div
                key={mark}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[8px] font-bold"
                style={{
                  background: C.buttonGradient,
                  color: "#fff",
                  boxShadow: `0 0 0 2px ${isDark ? C.bg : "#F8FAFC"}`,
                }}
              >
                {mark}
              </div>
            ))}
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: isDark ? C.textTrust : "#64748B" }}
          >
            {trust.label}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
