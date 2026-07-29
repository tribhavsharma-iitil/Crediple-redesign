"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  brandsContent,
  brandsColors,
  getHomeTitleAccentStyle,
} from "@/content/brands";
import { useTheme } from "@/context/ThemeContext";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import HashLink from "@/components/ui/HashLink";
import aboutBg from "@/assets/about/brands_bg.png";
import HeroWave from "@/components/home/HeroWave";
import YakaBrandMark from "@/components/home/YakaBrandMark";
import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
  HERO_YAKA_SLOT_CLASS,
} from "@/components/home/heroLayout";

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
  const { heroStagger } = useHomeMotion();

  return (
    <section
      id="brands-hero"
      className={HERO_SECTION_CLASS}
      style={{
        background:
          `url(${aboutBg.src}) center/cover no-repeat`,
      }}
    >
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className={`${HERO_CONTENT_CLASS} max-w-4xl`}
      >
        <motion.h1
          variants={heroItem}
          className="text-white font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-[4.25rem]"

        >
          {hero.titleLine1}
          <br />
          <span className="text-white inline-block md:whitespace-nowrap">{hero.titleAccent}</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-4 max-w-xl px-1 text-white text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base"
        >
          {hero.description}
          <br className="hidden sm:block" /> {hero.descriptionLine2}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >

          <HashLink
            href={hero.secondaryCta.href}
            className="inline-flex h-11 w-full items-center bg-[#FFFFFF14] justify-center gap-2 px-6 text-sm text-white no-underline transition-opacity hover:opacity-90 sm:w-auto sm:px-7 md:h-12"
            style={{ backdropFilter: "blur(34px)" }}
          >
            {hero.secondaryCta.label}
          </HashLink>

        </motion.div>
      </motion.div>
    </section>
  );
}
