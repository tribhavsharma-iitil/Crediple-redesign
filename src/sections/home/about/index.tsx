"use client";

import { motion } from "framer-motion";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";


/** Motion for About cards — no opacity:0 so copy stays readable on mobile */
const aboutCardReveal = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: homeEase },
  },
};

const { about } = homeContent;
const C = homeColors;

export default function About() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <>
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
        style={{ background: isDark ? '#000000' : '#FFFFFF' }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <HomeReveal variants={aboutCardReveal}>
            <h2
              className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: isDark ? C.text : homeLight.heading, lineHeight: 1.05 }}
            >
              {about.titleBefore}{" "}
              <span style={getHomeTitleAccentStyle(isDark)}>
                {about.titleAccent}
              </span>
            </h2>
            <p
              className="mb-8 text-sm sm:mb-10 sm:text-base font-medium"
              style={{ color: isDark ? '#FFFFFF' : homeLight.muted }}
            >
              {about.subtitle}
            </p>
          </HomeReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 overflow-hidden border sm:grid-cols-2"
            style={{
              background: isDark ? '#FFFFFF0A' : homeLight.card,
              borderColor: isDark ? C.border : homeLight.border,
            }}
          >
            {(
              [
                { key: "mission", ...about.mission },
                { key: "vision", ...about.vision },
              ] as const
            ).map((item, i) => (
              <HomeItem key={item.key} variants={aboutCardReveal}>
                <div
                  className={`h-full p-8 sm:p-10 lg:p-12 ${
                    i === 0
                      ? "border-b sm:border-b-0 sm:border-r"
                      : "border-t sm:border-t-0 sm:border-l"
                  }`}
                  style={{ borderColor: isDark ? C.border : homeLight.border }}
                >
                  <span
                    className="text-xs font-bold tracking-[0.18em] uppercase"
                    style={{ color: isDark ? C.accentSoft : homeLight.accent }}
                  >
                    {item.label}
                  </span>
                  <h3
                    className="font-heading mt-3 mb-4 text-2xl font-black tracking-tight md:text-3xl"
                    style={{ color: isDark ? C.text : homeLight.heading }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-base leading-7"
                    style={{ color: isDark ? "#D8E0F0" : homeLight.body }}
                  >
                    {item.text}
                  </p>
                </div>
              </HomeItem>
            ))}
          </motion.div>
        </div>
      </section>


    </>
  );
}
