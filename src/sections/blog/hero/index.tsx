"use client";

import { motion } from "framer-motion";
import { blogHero } from "@/content/blog";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import blogHeroBg from "@/assets/blog_hero.png";
import blogHeroBgLight from "@/assets/blog_listing_light.png";

import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
} from "@/components/home/heroLayout";
import HashLink from "@/components/ui/HashLink";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function BlogHero() {
  const { heroStagger } = useHomeMotion();
  const { isDark } = useTheme();

  return (
    <section
      id="blog-hero"
      className={HERO_SECTION_CLASS}
      style={{
        background: isDark
          ? `url(${blogHeroBg.src}) center/cover no-repeat, #000000`
          : `url(${blogHeroBgLight.src}) center/cover no-repeat, #FFFFFF`,
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
          className={cn(
            "font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1]",
            isDark ? "text-white" : "text-black",
          )}
        >
          {blogHero.title}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className={cn(
            "mb-4 max-w-2xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base font-jakarta font-semibold",
            isDark ? "text-white" : "text-black",
          )}
        >
          {blogHero.description}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mb-4 flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:mb-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 md:mb-12 !mb-0"
        >
          {isDark ? (
            <HashLink
              href={blogHero.cta.href}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 !mb-0"
              style={{
                background: "rgba(255, 255, 255, 0.16)"
              }}
            >
              {blogHero.cta.label}
            </HashLink>
          ) : (
            <CredipleButton
              href={blogHero.cta.href}
              className="h-10 shrink-0 rounded-lg px-5 font-semibold"
            >
              {blogHero.cta.label}
            </CredipleButton>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
