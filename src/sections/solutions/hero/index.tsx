"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import {
  solutionsContent,
  solutionsColors,
  getHomeTitleAccentStyle,
} from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import HashLink from "@/components/ui/HashLink";
import HeroWave from "@/components/home/HeroWave";
import YakaBrandMark from "@/components/home/YakaBrandMark";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { homeLight } from "@/content/home";
import { cn } from "@/lib/utils";
import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
  HERO_YAKA_SLOT_CLASS,
} from "@/components/home/heroLayout";

const { hero } = solutionsContent;
const C = solutionsColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function SolutionsHero() {
  const { isDark } = useTheme();
  const { heroStagger } = useHomeMotion();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // A <video> paints solid black until its first frame decodes, no matter
    // what CSS background it has — reset so the section's own themed
    // background shows through while the newly-selected source loads.
    setVideoReady(false);
  }, [isDark]);

  return (
    <section className="relative bg-[transparent] ">
      {isDark ? (
        <video
          key="solutions-video-dark"
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoReady(true)}
          className={cn(
            "absolute inset-0 z-0 w-full lg:block hidden pointer-events-none transition-opacity duration-500",
            videoReady ? "opacity-100" : "opacity-0",
          )}
        >
          <source src="/videos/solution_bg.mp4" type="video/mp4" />
        </video>
      ) : (
          <video
            key="solutions-video-light"
            aria-hidden
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoReady(true)}
            className={cn(
              "absolute inset-0 z-0 w-full h-[30rem] lg:block hidden pointer-events-none transition-opacity duration-500",
              videoReady ? "opacity-100" : "opacity-0",
            )}
          >
            <source src="/videos/section_bg_light.mp4" type="video/mp4" />
          </video>
      )

      }
      <div id="solutions-hero"
        className={cn(
          HERO_SECTION_CLASS,
          isDark ? "lg:bg-[#00000066] bg-[#000000]" : "bg-[#FFFFFF99] !backdrop-blur-[134px]",
        )}
        style={{ backdropFilter: isDark ? "blur(136px)" : "none" }}>
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className={`${HERO_CONTENT_CLASS} max-w-4xl`}
        >
          <motion.h1
            variants={heroItem}
            className="font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1]"
            style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
          >
            {hero.titleLine1}
            <br />
            <span>{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mb-4 max-w-xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base font-semibold font-jakarta"
            style={{ color: isDark ? "#FFFFFF" : homeLight.body }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
          >
            {isDark ? (
              <HashLink
                href={hero.primaryCta.href}
                className="inline-flex h-11 w-full items-center bg-[#FFFFFF14] justify-center gap-2 px-6 text-sm text-white no-underline transition-opacity hover:opacity-90 sm:w-auto sm:px-7 md:h-12"
                style={{ backdropFilter: "blur(34px)" }}
              >
                {hero.primaryCta.label}
              </HashLink>
            ) : (
              <CredipleButton
                href={hero.primaryCta.href}
                className="h-10 shrink-0 rounded-lg px-5 font-semibold"
              >
                {hero.primaryCta.label}
              </CredipleButton>
            )}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
