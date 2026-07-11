"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import {
  brandsContent,
  brandsColors,
  homeTitleAccentStyle,
} from "@/content/brands";
import { useTheme } from "@/context/ThemeContext";
import { homeStagger, homeEase } from "@/lib/animations";
import yakaBlue from "@/assets/yaka_blue.png";
import waveDark from "@/assets/home/wave-dark.png";
import waveLight from "@/assets/home/wave-light.png";

const { hero } = brandsContent;
const C = brandsColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function BrandsHero() {
  const { isDark } = useTheme();

  return (
    <section
      id="brands-hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-x-clip pt-24 pb-28 select-none sm:pt-28 sm:pb-32 md:pt-32 md:pb-36"
      style={{ background: isDark ? C.bg : "#F8FAFC" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[38%] w-full md:h-[50%]"
      >
        <Image
          src={isDark ? waveDark : waveLight}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="pointer-events-none absolute top-16 right-3 z-20 w-[56px] sm:top-20 sm:right-4 sm:w-[72px] md:top-24 md:right-8 md:w-[88px] xl:right-12 xl:w-[100px]">
        <div className="flex flex-col items-center gap-1 sm:gap-1.5">
          <div className="relative h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 xl:h-16 xl:w-16">
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
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6"
      >
        <motion.h1
          variants={heroItem}
          className="font-heading mb-4 px-1 text-[1.85rem] leading-[1.12] font-[800] tracking-tight sm:mb-5 sm:text-5xl md:mb-6 md:text-6xl xl:text-[4.25rem]"
          style={{ color: isDark ? C.text : "#0F172A" }}
        >
          {hero.titleLine1}
          <br />
          <span style={homeTitleAccentStyle}>{hero.titleAccent}</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-7 max-w-xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base"
          style={{ color: isDark ? C.textMuted : "#64748B" }}
        >
          {hero.description}
          <br className="hidden sm:block" /> {hero.descriptionLine2}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href={hero.primaryCta.href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 sm:w-auto md:h-12"
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
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border px-7 text-sm font-semibold no-underline transition-colors sm:w-auto md:h-12"
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
