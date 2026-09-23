"use client";

import { motion } from "framer-motion";
import { aboutContent, aboutColors } from "@/content/about";
import { useTheme } from "@/context/ThemeContext";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import HashLink from "@/components/ui/HashLink";
import aboutBg from "@/assets/about/about_us_bg.png";
import aboutBgLight from "@/assets/about/about_us_bg_light.png";
import { cn } from "@/lib/utils";
import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
} from "@/components/home/heroLayout";
import { CredipleButton } from "@/components/ui/CredipleButton";

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
  const { heroStagger } = useHomeMotion();

  return (
    <section
      id="about-hero"
      className={HERO_SECTION_CLASS}
      // style={{ background: "transparent" }}
      style={{
        background: isDark
          ? `url(${aboutBg.src}) center/cover no-repeat, #000000`
          : `url(${aboutBgLight.src}) center/cover no-repeat, #FFFFFF`,
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
          className={cn("text-white text-white font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1]",
            isDark ? "text-white" : "text-black",
          )}
        >
          {hero.titleLine1}
          <br />
          <span
            className={cn("text-white inline-block md:whitespace-nowrap",
              isDark ? "text-white" : "text-black",
            )}
          >
            {hero.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className={cn("mb-4 px-1 text-white text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base font-semibold",
            isDark ? "text-white" : "text-black",
          )}
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
              className="inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 !mb-0"
              style={{
                background: "rgba(255, 255, 255, 0.16)"
              }}
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
      {!isDark && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-1] h-[10%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
          }}
        />
      )}
    </section>
  );
}
