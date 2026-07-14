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
  homeEase,
} from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import historyPattern from "@/assets/home/pattern.png";

const { timeline } = homeContent;
const C = homeColors;

/**
 * Original 3-card fan + 1 extra peek so all 4 images stay visible.
 * Front (last) is always the active era. Desktop only.
 */
const SLOT_STYLES = [
  {
    className: "left-2 top-2 w-[58%] h-[44%] -rotate-[6deg]",
    z: 10,
  },
  {
    className: "left-[30%] top-0 w-[48%] h-[38%] rotate-[2deg]",
    z: 15,
  },
  {
    className: "right-0 top-10 w-[58%] h-[44%] rotate-[5deg]",
    z: 20,
  },
  {
    className: "left-5 bottom-0 w-[82%] h-[58%] rotate-0",
    z: 30,
  },
] as const;

export default function Timeline() {
  const { isDark } = useTheme();
  /** -1 = all collapsed on mobile accordion; desktop always uses a selected era */
  const [active, setActive] = useState(0);
  const selected = active < 0 ? 0 : active;
  const activeItem = timeline.items[selected];
  const images = timeline.images;
  const count = images.length;
  const { stagger, staggerFast, viewport } = useHomeMotion();

  const stacked = SLOT_STYLES.map((slot, depthFromBack) => {
    const fromFront = SLOT_STYLES.length - 1 - depthFromBack;
    const imageIndex = (selected + fromFront) % count;
    return {
      slot,
      src: images[imageIndex],
      key: `img-${imageIndex}`,
      isFront: fromFront === 0,
    };
  });

  return (
    <section
      id="timeline"
      className="relative scroll-mt-20 overflow-hidden py-12 sm:scroll-mt-24 sm:py-16 md:py-24"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      {/* pattern.png — light only; aspect-locked so dots match PDF spacing/scale */}
      {!isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[34%] overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
            maskImage:
              "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 w-full"
            style={{
              aspectRatio: `${historyPattern.width} / ${historyPattern.height}`,
              backgroundColor: "#A9C6EA",
              opacity: 0.5,
              WebkitMaskImage: `url(${historyPattern.src})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center bottom",
              WebkitMaskSize: "100% 100%",
              maskImage: `url(${historyPattern.src})`,
              maskRepeat: "no-repeat",
              maskPosition: "center bottom",
              maskSize: "100% 100%",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <h2
            className="font-heading mb-8 text-2xl font-black tracking-tight sm:mb-10 sm:text-3xl md:mb-14 md:text-4xl lg:text-5xl"
            style={{ color: isDark ? C.text : homeLight.heading }}
          >
            {timeline.titleBefore}{" "}
            <span style={getHomeTitleAccentStyle(isDark)}>
              {timeline.titleAccent}
            </span>
          </h2>
        </HomeReveal>

        {/* ── Mobile: accordion like Our Core Values ── */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-3 lg:hidden"
        >
          {timeline.items.map((item, i) => {
            const open = active === i;
            const number = String(i + 1).padStart(2, "0");
            return (
              <HomeItem key={item.period} variants={homeFadeUp}>
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
                    onClick={() => setActive((prev) => (prev === i ? -1 : i))}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                  >
                    <span
                      className="font-heading flex min-w-0 items-center gap-2 text-sm font-semibold sm:gap-2.5 sm:text-base"
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
                        {number}
                      </span>
                      <span className="min-w-0 leading-snug">{item.title}</span>
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

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="space-y-3 px-4 pb-4 sm:px-5 sm:pb-5">
                        <div
                          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border"
                          style={{
                            borderColor: isDark
                              ? "rgba(255,255,255,0.08)"
                              : homeLight.border,
                          }}
                        >
                          <Image
                            src={images[i]}
                            alt={item.title}
                            fill
                            className="object-cover object-left-top"
                            sizes="100vw"
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

                        <div>
                          <h3
                            className="font-heading mb-1 text-xl font-black"
                            style={{
                              color: isDark
                                ? C.accentSoft
                                : homeLight.heading,
                            }}
                          >
                            {item.period}
                          </h3>
                          <p
                            className="mb-3 text-[10px] font-bold tracking-widest uppercase"
                            style={{
                              color: isDark ? "#F59E0B" : homeLight.muted,
                            }}
                          >
                            {item.tag}
                          </p>
                          <ul className="space-y-2.5">
                            {item.highlights.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex gap-3 text-[13px] leading-relaxed"
                                style={{
                                  color: isDark
                                    ? "rgba(255,255,255,0.65)"
                                    : homeLight.muted,
                                }}
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{
                                    background: isDark
                                      ? C.accentSoft
                                      : homeLight.accent,
                                  }}
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </HomeItem>
            );
          })}
        </motion.div>

        {/* ── Desktop: original list + fan images + detail ── */}
        <div className="hidden grid-cols-1 items-start gap-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col lg:col-span-4"
          >
            {timeline.items.map((item, i) => (
              <HomeItem key={item.period} variants={homeFadeLeft}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center justify-between gap-3 border-b py-5 text-left transition-colors"
                  style={{
                    borderColor: isDark ? C.border : homeLight.border,
                    color:
                      selected === i
                        ? isDark
                          ? C.text
                          : homeLight.heading
                        : isDark
                          ? C.textDim
                          : "#94A3B8",
                  }}
                >
                  <span className="font-heading min-w-0 pr-2 text-base leading-snug font-semibold">
                    {item.title}
                  </span>
                  {selected === i && (
                    <span
                      className="relative flex h-9 w-9 shrink-0 items-center justify-center"
                      style={{
                        color: isDark ? C.textMuted : "#475569",
                      }}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-[2px] rotate-45 rounded-[6px] border"
                        style={{
                          borderColor: isDark
                            ? "rgba(220, 226, 246, 0.45)"
                            : "rgba(15, 23, 42, 0.18)",
                          background: isDark ? "transparent" : "#FFFFFF",
                        }}
                      />
                      <ChevronRight size={14} className="relative z-10" />
                    </span>
                  )}
                </button>
              </HomeItem>
            ))}
          </motion.div>

          <HomeReveal
            variants={homeScaleIn}
            className="relative mx-auto h-[420px] w-full lg:col-span-4 lg:max-w-none"
          >
            {stacked.map(({ slot, src, key, isFront }) => (
              <motion.div
                key={key}
                layout
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                  mass: 0.85,
                }}
                className={`absolute overflow-hidden rounded-xl border shadow-2xl ${slot.className}`}
                style={{
                  borderColor: C.border,
                  zIndex: slot.z,
                }}
              >
                <div className="relative h-full min-h-[140px] w-full">
                  <Image
                    src={src}
                    alt="Company history"
                    fill
                    className="object-cover"
                    sizes="400px"
                    priority
                  />
                  {!isFront && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-black/20"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </HomeReveal>

          <HomeReveal
            variants={homeFadeRight}
            className="lg:col-span-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                  key={activeItem.period}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: homeEase }}
                >
                  <h3
                    className="font-heading mb-2 text-4xl font-black"
                    style={{
                      color: isDark ? C.accentSoft : homeLight.heading,
                    }}
                  >
                    {activeItem.period}
                  </h3>
                  <p
                    className="mb-6 text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: isDark ? "#F59E0B" : homeLight.muted }}
                  >
                    {activeItem.tag}
                  </p>
                  <ul className="space-y-4">
                    {activeItem.highlights.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{
                          color: isDark ? "#D8E0F0" : homeLight.body,
                        }}
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background: isDark
                              ? C.accentSoft
                              : homeLight.accent,
                          }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
            </AnimatePresence>
          </HomeReveal>
        </div>
      </div>
    </section>
  );
}
