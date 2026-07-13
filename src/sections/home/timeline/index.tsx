"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { homeContent, homeColors, homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeFadeLeft,
  homeFadeRight,
  homeScaleIn,
  homeStagger,
  homeViewport,
  homeEase,
} from "@/lib/animations";

const { timeline } = homeContent;
const C = homeColors;

/**
 * Original 3-card fan + 1 extra peek so all 4 images stay visible.
 * Front (last) is always the active era.
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
  const [active, setActive] = useState(0);
  const activeItem = timeline.items[active];
  const images = timeline.images;
  const count = images.length;

  // Slot 0 (back) … slot 3 (front = active image)
  const stacked = SLOT_STYLES.map((slot, depthFromBack) => {
    const fromFront = SLOT_STYLES.length - 1 - depthFromBack;
    const imageIndex = (active + fromFront) % count;
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
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <h2
            className="font-heading mb-10 text-center text-3xl font-black tracking-tight sm:mb-14 sm:text-4xl md:text-left md:text-5xl"
            style={{ color: isDark ? C.text : "#0F172A" }}
          >
            {timeline.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{timeline.titleAccent}</span>
          </h2>
        </HomeReveal>

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div
            variants={homeStagger}
            initial="hidden"
            whileInView="visible"
            viewport={homeViewport}
            className="order-1 flex flex-col lg:col-span-4"
          >
            {timeline.items.map((item, i) => (
              <HomeItem key={item.period} variants={homeFadeLeft}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center justify-between gap-3 border-b py-4 text-left transition-colors sm:py-5"
                  style={{
                    borderColor: isDark ? C.border : "#E2E8F0",
                    color:
                      active === i
                        ? isDark
                          ? C.text
                          : "#0F172A"
                        : isDark
                          ? C.textDim
                          : "#94A3B8",
                  }}
                >
                  <span className="font-heading min-w-0 pr-2 text-sm leading-snug font-semibold md:text-base">
                    {item.title}
                  </span>
                  {active === i && (
                    <ArrowRight
                      size={16}
                      className="shrink-0"
                      style={{ color: C.accentSoft }}
                    />
                  )}
                </button>
              </HomeItem>
            ))}
          </motion.div>

          <HomeReveal
            variants={homeScaleIn}
            className="relative order-3 mx-auto h-[280px] w-full max-w-md sm:h-[360px] md:h-[420px] lg:order-2 lg:col-span-4 lg:max-w-none"
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
                <div className="relative h-full min-h-[120px] w-full sm:min-h-[140px]">
                  <Image
                    src={src}
                    alt="Company history"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 400px"
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
            className="order-2 lg:order-3 lg:col-span-4"
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
                  className="font-heading mb-2 text-2xl font-black sm:text-3xl md:text-4xl"
                  style={{ color: C.accentSoft }}
                >
                  {activeItem.period}
                </h3>
                <p
                  className="mb-5 text-[10px] font-bold tracking-widest uppercase sm:mb-6"
                  style={{ color: "#F59E0B" }}
                >
                  {activeItem.tag}
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {activeItem.highlights.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[13px] leading-relaxed sm:text-sm"
                      style={{ color: isDark ? "#D8E0F0" : "#475569" }}
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: C.accentSoft }}
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
