"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  homeFadeLeft,
  homeFadeRight,
  homeEase,
} from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";

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
  const [activeValue, setActiveValue] = useState(0);
  const activeItem = values.items[activeValue >= 0 ? activeValue : 0];
  const { stagger, staggerFast, viewport } = useHomeMotion();

  return (
    <>
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
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
        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <HomeReveal variants={aboutCardReveal}>
            <h2
              className="font-heading mb-5 text-2xl font-black tracking-tight sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl lg:text-5xl"
              style={{ color: isDark ? C.text : homeLight.heading }}
            >
              {about.titleBefore}{" "}
              <span style={getHomeTitleAccentStyle(isDark)}>
                {about.titleAccent}
              </span>
            </h2>
          </HomeReveal>

          {/*
            Mobile: one clear card per topic (image + label + copy together).
            Desktop: Mission text|image, Vision image|text zigzag.
          */}
          <div className="flex flex-col gap-5 md:hidden">
            {(
              [
                {
                  key: "mission",
                  title: about.mission.title,
                  text: about.mission.text,
                  image: about.missionImage,
                  alt: "Collaborative workspace",
                },
                {
                  key: "vision",
                  title: about.vision.title,
                  text: about.vision.text,
                  image: about.visionImage,
                  alt: "Digital infrastructure",
                },
              ] as const
            ).map((item) => (
              <HomeReveal key={item.key} variants={aboutCardReveal}>
                <article
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    background: isDark ? `${C.bgCard}CC` : homeLight.card,
                    borderColor: isDark ? C.border : homeLight.border,
                  }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(3,8,26,0.72) 100%)",
                      }}
                    />
                    <h3
                      className="font-heading absolute bottom-3.5 left-3.5 rounded-full border px-3.5 py-1.5 text-[13px] font-black tracking-[0.14em] uppercase"
                      style={{
                        color: "#FFFFFF",
                        borderColor: "rgba(255,255,255,0.4)",
                        background: "rgba(3,8,26,0.6)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="px-4 py-4 text-[13px] leading-relaxed"
                    style={{ color: isDark ? "#D8E0F0" : homeLight.body }}
                  >
                    {item.text}
                  </p>
                </article>
              </HomeReveal>
            ))}
          </div>

          <div className="hidden flex-col gap-6 md:flex">
            {/* Mission */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-2 items-stretch gap-6"
            >
              <HomeItem variants={aboutCardReveal}>
                <div
                  className="flex h-full min-h-[280px] flex-col justify-center rounded-2xl border p-10"
                  style={{
                    background: isDark ? `${C.bgCard}CC` : homeLight.card,
                    borderColor: isDark ? C.border : homeLight.border,
                  }}
                >
                  <h3
                    className="font-heading mb-5 text-center text-base font-black tracking-[0.2em] uppercase md:text-lg"
                    style={{ color: isDark ? C.text : homeLight.heading }}
                  >
                    {about.mission.title}
                  </h3>
                  <p
                    className="text-center text-sm leading-relaxed"
                    style={{ color: isDark ? "#D8E0F0" : homeLight.body }}
                  >
                    {about.mission.text}
                  </p>
                </div>
              </HomeItem>

              <HomeItem variants={aboutCardReveal}>
                <div
                  className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl border"
                  style={{ borderColor: isDark ? C.border : homeLight.border }}
                >
                  <Image
                    src={about.missionImage}
                    alt="Collaborative workspace"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </HomeItem>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-2 items-stretch gap-6"
            >
              <HomeItem variants={aboutCardReveal}>
                <div
                  className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl border"
                  style={{ borderColor: isDark ? C.border : homeLight.border }}
                >
                  <Image
                    src={about.visionImage}
                    alt="Digital infrastructure"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </HomeItem>

              <HomeItem variants={aboutCardReveal}>
                <div
                  className="flex h-full min-h-[280px] flex-col justify-center rounded-2xl border p-10"
                  style={{
                    background: isDark ? `${C.bgCard}CC` : homeLight.card,
                    borderColor: isDark ? C.border : homeLight.border,
                  }}
                >
                  <h3
                    className="font-heading mb-5 text-center text-base font-black tracking-[0.2em] uppercase md:text-lg"
                    style={{ color: isDark ? C.text : homeLight.heading }}
                  >
                    {about.vision.title}
                  </h3>
                  <p
                    className="text-center text-sm leading-relaxed"
                    style={{ color: isDark ? "#D8E0F0" : homeLight.body }}
                  >
                    {about.vision.text}
                  </p>
                </div>
              </HomeItem>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="values"
        className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
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

        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <HomeReveal variants={homeFadeLeft}>
                <h2
                  className="font-heading mb-8 text-2xl font-black tracking-tight sm:mb-10 sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: isDark ? "#DCE2F6" : homeLight.heading }}
                >
                  {values.titleBefore}{" "}
                  <span style={getHomeTitleAccentStyle(isDark)}>
                    {values.titleAccent}
                  </span>
                </h2>
              </HomeReveal>

              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex flex-col gap-3"
              >
                {values.items.map((item, i) => {
                  const open = activeValue === i;
                  return (
                    <HomeItem key={item.number} variants={aboutCardReveal}>
                      <div
                        className="overflow-hidden rounded-xl border transition-all duration-300"
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
                        <button
                          type="button"
                          aria-expanded={open}
                          onClick={() =>
                            setActiveValue((prev) => (prev === i ? -1 : i))
                          }
                          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                        >
                          <span
                            className="font-heading flex min-w-0 items-center gap-2 text-sm font-semibold sm:gap-2.5 sm:text-base md:text-lg"
                            style={{
                              color: isDark ? "#FFFFFF" : homeLight.heading,
                            }}
                          >
                            <span
                              className="shrink-0 font-medium tabular-nums"
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
                          <span
                            className="relative flex h-8 w-8 shrink-0 items-center justify-center"
                            style={{
                              color: open
                                ? "#2F80ED"
                                : isDark
                                  ? "rgba(220,226,246,0.7)"
                                  : homeLight.muted,
                            }}
                          >
                            <span
                              aria-hidden
                              className="absolute inset-[2px] rotate-45 rounded-[5px] border"
                              style={{
                                borderColor: open
                                  ? "rgba(47,128,237,0.55)"
                                  : isDark
                                    ? "rgba(220, 226, 246, 0.45)"
                                    : "rgba(15, 23, 42, 0.2)",
                              }}
                            />
                            <ChevronRight
                              size={14}
                              className={`relative z-10 transition-transform duration-300 ${
                                open ? "rotate-90" : "rotate-0"
                              }`}
                            />
                          </span>
                        </button>

                        {/* Label → image → copy (image under this label, not under the whole list) */}
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="space-y-3 px-4 pb-4 sm:px-5 sm:pb-5">
                              <div
                                className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border lg:hidden"
                                style={{
                                  borderColor: isDark
                                    ? "rgba(255,255,255,0.08)"
                                    : homeLight.border,
                                }}
                              >
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover object-left-top"
                                  sizes="(max-width: 1024px) 100vw, 0px"
                                />
                                <div
                                  aria-hidden
                                  className="pointer-events-none absolute inset-0"
                                  style={{
                                    background:
                                      "linear-gradient(180deg, transparent 45%, rgba(3,8,26,0.75) 100%)",
                                  }}
                                />
                              </div>
                              <p
                                aria-hidden={!open}
                                className="text-[13px] leading-relaxed sm:text-sm"
                                style={{
                                  color: isDark
                                    ? "rgba(255,255,255,0.65)"
                                    : homeLight.muted,
                                }}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HomeItem>
                  );
                })}
              </motion.div>
            </div>

            {/* Desktop: image beside the list for the active label */}
            <HomeReveal
              variants={homeFadeRight}
              delay={0.15}
              className="sticky top-28 hidden lg:block"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border shadow-2xl"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : homeLight.border,
                }}
              >
                <Image
                  key={activeItem.number}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover object-left-top"
                  sizes="50vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(3,8,26,0.75) 100%)",
                  }}
                />
              </div>
            </HomeReveal>
          </div>
        </div>
      </section>
    </>
  );
}
