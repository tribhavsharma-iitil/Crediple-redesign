"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { homeContent, homeColors } from "@/content/home";
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
        style={{ background: isDark ? C.bg : "#FFFFFF" }}
      >
        <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeFadeUp}>
            <h2
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-8 sm:mb-12"
              style={{ color: isDark ? C.text : "#0F172A" }}
            >
              {about.titleBefore}{" "}
              <span style={{ color: C.accent }}>{about.titleAccent}</span>
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
                  background: isDark ? `${C.bgCard}CC` : "#F8FAFC",
                  borderColor: isDark ? C.border : "#E2E8F0",
                }}
              >
                <h3
                  className="font-black text-base sm:text-lg uppercase tracking-[0.2em] mb-4 sm:mb-5 text-center"
                  style={{ color: isDark ? C.text : "#0F172A" }}
                >
                  {about.mission.title}
                </h3>
                <p
                  className="text-[13px] sm:text-sm leading-relaxed text-center"
                  style={{ color: isDark ? "#D8E0F0" : "#475569" }}
                >
                  {about.mission.text}
                </p>
              </div>
            </HomeItem>

            <HomeItem variants={homeScaleIn}>
              <div
                className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[280px] aspect-[4/3] md:aspect-auto border h-full"
                style={{ borderColor: C.border }}
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
                style={{ borderColor: C.border }}
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
                  background: isDark ? `${C.bgCard}CC` : "#F8FAFC",
                  borderColor: isDark ? C.border : "#E2E8F0",
                }}
              >
                <h3
                  className="font-black text-base sm:text-lg uppercase tracking-[0.2em] mb-4 sm:mb-5 text-center"
                  style={{ color: isDark ? C.text : "#0F172A" }}
                >
                  {about.vision.title}
                </h3>
                <p
                  className="text-[13px] sm:text-sm leading-relaxed text-center"
                  style={{ color: isDark ? "#D8E0F0" : "#475569" }}
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
        style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
      >
        {isDark && (
          <div
            aria-hidden
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[min(500px,90vw)] h-[min(500px,90vw)] pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        )}

        <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
            <HomeReveal stagger>
              <HomeItem variants={homeFadeLeft}>
                <h2
                  className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-8 sm:mb-10"
                  style={{ color: isDark ? C.text : "#0F172A" }}
                >
                  {values.titleBefore}{" "}
                  <span style={{ color: C.accent }}>{values.titleAccent}</span>
                </h2>
              </HomeItem>

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
                        className="w-full flex items-center justify-between gap-3 sm:gap-4 rounded-xl border px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-all"
                        style={{
                          borderColor: open
                            ? `${C.accent}99`
                            : isDark
                              ? C.border
                              : "#E2E8F0",
                          background: isDark ? C.bgCard : "#FFFFFF",
                          boxShadow: open ? `0 0 20px ${C.glow}` : "none",
                        }}
                      >
                        <span
                          className="font-heading font-semibold text-sm sm:text-base md:text-lg min-w-0"
                          style={{ color: isDark ? C.text : "#0F172A" }}
                        >
                          <span
                            className="mr-2 font-medium"
                            style={{ color: C.textDim }}
                          >
                            {item.number}
                          </span>
                          {item.title}
                        </span>
                        <ChevronRight
                          size={18}
                          className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
                          style={{ color: C.textMuted }}
                        />
                      </button>

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
                              className="px-4 sm:px-5 py-3 sm:py-4 text-[13px] sm:text-sm leading-relaxed"
                              style={{
                                color: isDark ? C.textMuted : "#475569",
                              }}
                            >
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </HomeItem>
                  );
                })}
              </motion.div>
            </HomeReveal>

            <HomeReveal variants={homeFadeRight} delay={0.15}>
              <p
                className="font-heading font-bold text-lg sm:text-xl mb-4"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {values.imageLabel}
              </p>
              <div
                className="relative rounded-2xl overflow-hidden border aspect-[4/3] shadow-2xl w-full"
                style={{ borderColor: C.border }}
              >
                <Image
                  src={values.image}
                  alt="Analytics dashboard"
                  fill
                  className="object-cover object-left-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </HomeReveal>
          </div>
        </div>
      </section>
    </>
  );
}
