"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ourJourneyContent } from "@/content/ourJourney";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import HashLink from "@/components/ui/HashLink";
import heroBg from "@/assets/about/hero_section_bg_our_journey.png";
import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
} from "@/components/home/heroLayout";

const { hero } = ourJourneyContent;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function OurJourneyHero() {
  const { heroStagger } = useHomeMotion();

  return (
    <section
      id="our-journey-hero"
      className={`${HERO_SECTION_CLASS} relative overflow-hidden md:!pt-0`}
      style={{
        background: `url(${heroBg.src}) center/cover no-repeat`,
      }}
    >
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className={`${HERO_CONTENT_CLASS} max-w-6xl`}
      >
        <motion.h1
          variants={heroItem}
          className="text-white font-heading mb-2 px-1 text-[2rem] leading-[0] sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1] font-heading"
        >
          {hero.titleLine1}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-4 max-w-5xl px-1 text-white text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base font-semibold font-jakarta"
        >
          {hero.description}
        </motion.p>

        {/* <motion.div
          variants={heroItem}
          className="flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <HashLink
            href={hero.primaryCta.href}
            className="inline-flex h-11 w-full items-center bg-[#FFFFFF14] justify-center gap-2 px-6 text-sm text-white no-underline transition-opacity hover:opacity-90 sm:w-auto sm:px-7 md:h-12"
            style={{ backdropFilter: "blur(34px)" }}
          >
            {hero.primaryCta.label}
          </HashLink>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
