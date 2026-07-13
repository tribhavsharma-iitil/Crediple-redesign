"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeFadeLeft,
  homeFadeRight,
  homeScaleIn,
  homeStagger,
  homeStaggerFast,
  homeViewport,
  homeEase,
} from "@/lib/animations";

const { about, values } = homeContent;
const C = homeColors;

export default function About() {
  const { isDark } = useTheme();
  const [activeValue, setActiveValue] = useState(0);

  return (
    <>
      <section
        id="about"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: isDark ? C.bg : homeLight.bgSoft }}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 720"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -40 80 C 180 40, 260 160, 120 280"
            stroke={
              isDark ? "rgba(255,255,255,0.35)" : "rgba(47,128,237,0.35)"
            }
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <path
            d="M 1480 60 C 1180 20, 1280 200, 1380 320"
            stroke={
              isDark ? "rgba(255,255,255,0.28)" : "rgba(47,128,237,0.28)"
            }
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <path
            d="M 520 700 C 640 620, 800 640, 920 720"
            stroke={
              isDark ? "rgba(255,255,255,0.22)" : "rgba(47,128,237,0.22)"
            }
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
        </svg>
        <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
          <HomeReveal variants={homeFadeUp}>
            <h2
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-8 sm:mb-12"
              style={{ color: isDark ? C.text : homeLight.heading }}
            >
              {about.titleBefore}{" "}
              <span style={getHomeTitleAccentStyle(isDark)}>
                {about.titleAccent}
              </span>
            </h2>
          </HomeReveal>

          <motion.div
            variants={homeStagger}
            initial="hidden"
            whileInView="visible"
            viewport={homeViewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
          >
            <HomeItem variants={homeFadeLeft}>
              <div
                className="rounded-2xl border p-5 sm:p-8 md:p-10 flex flex-col justify-center min-h-[220px] sm:min-h-[280px] h-full"
                style={{
                  background: isDark ? `${C.bgCard}CC` : homeLight.card,
                  borderColor: isDark ? C.border : homeLight.border,
                }}
              >
                <h3
                  className="font-black text-base sm:text-lg uppercase tracking-[0.2em] mb-4 sm:mb-5 text-center"
                  style={{ color: isDark ? C.text : homeLight.heading }}
                >
                  {about.mission.title}
                </h3>
                <p
                  className="text-[13px] sm:text-sm leading-relaxed text-center"
                  style={{ color: isDark ? "#D8E0F0" : homeLight.body }}
                >
                  {about.mission.text}
                </p>
              </div>
            </HomeItem>

            <HomeItem variants={homeScaleIn}>
              <div
                className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[280px] aspect-[4/3] md:aspect-auto border h-full"
                style={{ borderColor: isDark ? C.border : homeLight.border }}
              >
                <Image
                  src={about.missionImage}
                  alt="Collaborative workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </HomeItem>

            <HomeItem variants={homeScaleIn}>
              <div
                className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[280px] aspect-[4/3] md:aspect-auto border h-full"
                style={{ borderColor: isDark ? C.border : homeLight.border }}
              >
                <Image
                  src={about.visionImage}
                  alt="Digital infrastructure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </HomeItem>

            <HomeItem variants={homeFadeRight}>
              <div
                className="rounded-2xl border p-5 sm:p-8 md:p-10 flex flex-col justify-center min-h-[220px] sm:min-h-[280px] h-full"
                style={{
                  background: isDark ? `${C.bgCard}CC` : homeLight.card,
                  borderColor: isDark ? C.border : homeLight.border,
                }}
              >
                <h3
                  className="font-black text-base sm:text-lg uppercase tracking-[0.2em] mb-4 sm:mb-5 text-center"
                  style={{ color: isDark ? C.text : homeLight.heading }}
                >
                  {about.vision.title}
                </h3>
                <p
                  className="text-[13px] sm:text-sm leading-relaxed text-center"
                  style={{ color: isDark ? "#D8E0F0" : homeLight.body }}
                >
                  {about.vision.text}
                </p>
              </div>
            </HomeItem>
          </motion.div>
        </div>
      </section>

      <section
        id="values"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: isDark ? C.bgSection : homeLight.bg }}
      >
        {/* Soft blue glow — behind image column, not over the list */}
        <div
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
        />

        <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
            <div>
              <HomeReveal variants={homeFadeLeft}>
                <h2
                  className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-8 sm:mb-10"
                  style={{ color: isDark ? "#DCE2F6" : homeLight.heading }}
                >
                  {values.titleBefore}{" "}
                  <span style={getHomeTitleAccentStyle(isDark)}>
                    {values.titleAccent}
                  </span>
                </h2>
              </HomeReveal>

              <motion.div
                variants={homeStaggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={homeViewport}
                className="flex flex-col gap-3"
              >
                {values.items.map((item, i) => {
                  const open = activeValue === i;
                  return (
                    <HomeItem key={item.number} variants={homeFadeUp}>
                      <button
                        type="button"
                        onClick={() => setActiveValue(i)}
                        className="w-full rounded-xl border px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-all duration-300"
                        style={{
                          borderColor: open
                            ? "#2F80ED"
                            : isDark
                              ? "rgba(255,255,255,0.08)"
                              : homeLight.border,
                          background: isDark
                            ? "rgba(18,28,51,0.92)"
                            : homeLight.card,
                          boxShadow: open
                            ? "0 0 0 1px rgba(47,128,237,0.4), 0 0 28px rgba(47,128,237,0.4)"
                            : "none",
                        }}
                      >
                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                          <span
                            className="font-heading font-semibold text-sm sm:text-base md:text-lg min-w-0 flex items-center gap-2 sm:gap-2.5"
                            style={{
                              color: isDark ? "#FFFFFF" : homeLight.heading,
                            }}
                          >
                            <span
                              className="font-medium tabular-nums shrink-0"
                              style={{
                                color: isDark
                                  ? "rgba(220,226,246,0.45)"
                                  : "#94A3B8",
                              }}
                            >
                              {item.number}
                            </span>
                            {item.title}
                          </span>
                          {!open && (
                            <span
                              className="relative flex h-8 w-8 shrink-0 items-center justify-center"
                              style={{
                                color: isDark
                                  ? "rgba(220,226,246,0.7)"
                                  : homeLight.muted,
                              }}
                            >
                              <span
                                aria-hidden
                                className="absolute inset-[2px] rotate-45 rounded-[5px] border"
                                style={{
                                  borderColor: isDark
                                    ? "rgba(220, 226, 246, 0.45)"
                                    : "rgba(15, 23, 42, 0.2)",
                                }}
                              />
                              <ChevronRight size={14} className="relative z-10" />
                            </span>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: homeEase }}
                              className="overflow-hidden"
                            >
                              <p
                                className="pt-3 text-[13px] sm:text-sm leading-relaxed"
                                style={{
                                  color: isDark
                                    ? "rgba(255,255,255,0.65)"
                                    : homeLight.muted,
                                }}
                              >
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </HomeItem>
                  );
                })}
              </motion.div>
            </div>

            <HomeReveal variants={homeFadeRight} delay={0.15}>
              <div
                className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden border aspect-[4/3] shadow-2xl w-full"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : homeLight.border,
                }}
              >
                <Image
                  key={values.items[activeValue].number}
                  src={values.items[activeValue].image}
                  alt={values.items[activeValue].title}
                  fill
                  className="object-cover object-left-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(3,8,26,0.75) 100%)",
                  }}
                />
                <p
                  className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 font-heading font-bold text-lg sm:text-xl md:text-2xl z-10"
                  style={{ color: "#FFFFFF" }}
                >
                  {values.imageLabel}
                </p>
              </div>
            </HomeReveal>
          </div>
        </div>
      </section>
    </>
  );
}
