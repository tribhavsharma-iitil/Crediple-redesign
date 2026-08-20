"use client";

import { motion } from "framer-motion";
import { blogHero } from "@/content/blog";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import blogHeroBg from "@/assets/blog_hero.png";
import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
} from "@/components/home/heroLayout";
import HashLink from "@/components/ui/HashLink";

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

  return (
    <section
      id="blog-hero"
      className={HERO_SECTION_CLASS}
      style={{
        background: `url(${blogHeroBg.src}) center/cover no-repeat, #000000`,
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
          className="text-white font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1]"
        >
          {blogHero.title}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-4 max-w-2xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base font-jakarta font-semibold text-white"
        >
          {blogHero.description}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mb-4 flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:mb-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 md:mb-12 !mb-0"
        >
          <HashLink
            href={blogHero.cta.href}
            className="inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 !mb-0"
            // style={{
            //   background: C.buttonGradient,
            //   boxShadow: `0 8px 28px ${C.glow}`,
            // }}
            style={{
              background: "rgba(255, 255, 255, 0.16)"
            }}
          >
            {/* <Play size={13} className="fill-current" /> */}
            {blogHero.cta.label}
          </HashLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
