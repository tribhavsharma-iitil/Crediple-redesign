"use client";

import { motion } from "framer-motion";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import sectionBg from "@/assets/home/visual_bg.png";

/** Motion for About cards — no opacity:0 so copy stays readable on mobile */
const aboutCardReveal = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: homeEase },
  },
};

const { about, values } = homeContent;
const C = homeColors;

export default function About() {
  const { isDark } = useTheme();
  const { stagger, staggerFast, viewport } = useHomeMotion();

  return (
    <>
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
        style={{ background: isDark ? C.bg : '#FFFFFF' }}
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
              className="mb-8 text-sm sm:mb-10 sm:text-base"
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
              background: isDark ? C.bg : homeLight.card,
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

      <section
        id="values"
        className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
        style={{
          background: isDark
            ? `url(${sectionBg.src}) center/cover no-repeat`
            : "#FFFFFF" }}
      >
        {/* Soft blue glow — behind image column, not over the list */}
        {/* <div
          aria-hidden
          className="absolute right-[-8%] top-[15%] w-[min(560px,70vw)] h-[min(560px,70vw)] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${C.glow} 0%, transparent 68%)`,
            filter: "blur(48px)",
            opacity: isDark ? 0.85 : 0.3,
          }}
        />
        <div
          aria-hidden
          className="absolute left-[35%] bottom-[-15%] w-[min(380px,55vw)] h-[min(380px,55vw)] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(47,128,237,0.14) 0%, transparent 70%)",
            filter: "blur(56px)",
            opacity: isDark ? 1 : 0.2,
          }}
        /> */}

        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            <HomeReveal className="m-auto" variants={homeFadeLeft}>
              <h2
                className="font-heading mb-4 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ color: isDark ? "#ffffff" : homeLight.heading }}
              >
                {values.titleBefore}{" "}
                <span style={getHomeTitleAccentStyle(isDark)}>
                  {values.titleAccent}
                </span>
              </h2>
              <p
                className="mb-6 max-w-md text-sm sm:text-base"
                style={{ color: isDark ? "#ffffff" : homeLight.muted }}
              >
                {values.subtitle}
              </p>
              <CredipleButton href={values.cta.href} size="md" className="uppercase tracking-wide">
                {values.cta.label}
              </CredipleButton>
            </HomeReveal>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 overflow-hidden border"
              style={{
                background: isDark ? `transparent` : "#FBFBFB",
                borderColor: isDark ? C.border : homeLight.border,
              }}
            >
              {values.items.map((item, i) => (
                <HomeItem key={item.number} variants={aboutCardReveal}>
                  <div
                    className={`p-5 sm:p-6 lg:p-7 ${i === 0 ? "" : "border-t"}`}
                    style={{ borderColor: isDark ? C.border : homeLight.border }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: isDark ? C.accentSoft : homeLight.accent }}
                    >
                      {item.number}
                    </span>
                    <h3
                      className="font-heading mt-2 mb-2 text-lg font-black tracking-tight md:text-xl"
                      style={{ color: isDark ? C.text : homeLight.heading }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed sm:text-[15px]"
                      style={{ color: isDark ? "rgba(255,255,255,0.65)" : homeLight.muted }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </HomeItem>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
