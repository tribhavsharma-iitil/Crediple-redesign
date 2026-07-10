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

/** Stack slot styles: back-left, mid-right, front */
const SLOT_STYLES = [
  {
    className: "left-2 top-2 w-[68%] h-[48%] -rotate-[6deg]",
    z: 10,
  },
  {
    className: "right-0 top-10 w-[62%] h-[44%] rotate-[5deg]",
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

  /**
   * Rotate image order by active index so the stack shuffles
   * when the user clicks the next history item.
   */
  const shuffled = images.map((_, i) => {
    const srcIndex = (i + active) % images.length;
    return { src: images[srcIndex], key: `img-${srcIndex}` };
  });

  return (
    <section
      id="timeline"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <h2
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-10 sm:mb-14 text-center md:text-left"
            style={{ color: isDark ? C.text : "#0F172A" }}
          >
            {timeline.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{timeline.titleAccent}</span>
          </h2>
        </HomeReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-start">
          {/* Left: milestones */}
          <motion.div
            variants={homeStagger}
            initial="hidden"
            whileInView="visible"
            viewport={homeViewport}
            className="lg:col-span-4 flex flex-col order-1"
          >
            {timeline.items.map((item, i) => (
              <HomeItem key={item.period} variants={homeFadeLeft}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group w-full flex items-center justify-between gap-3 py-4 sm:py-5 text-left border-b transition-colors"
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
                  <span className="font-heading font-semibold text-sm md:text-base leading-snug pr-2 min-w-0">
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

          {/* Center: shuffling image stack */}
          <HomeReveal
            variants={homeScaleIn}
            className="lg:col-span-4 relative h-[280px] sm:h-[360px] md:h-[420px] w-full max-w-md mx-auto lg:max-w-none order-3 lg:order-2"
          >
            {shuffled.map((item, slot) => {
              const slotStyle = SLOT_STYLES[slot];
              return (
                <motion.div
                  key={item.key}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                    mass: 0.85,
                  }}
                  className={`absolute rounded-xl overflow-hidden border shadow-2xl ${slotStyle.className}`}
                  style={{
                    borderColor: C.border,
                    zIndex: slotStyle.z,
                  }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={`${item.key}-slot-${slot}-active-${active}`}
                      initial={{ opacity: 0.6, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.6, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: homeEase }}
                      className="relative w-full h-full min-h-[120px] sm:min-h-[140px]"
                    >
                      <Image
                        src={item.src}
                        alt={`Timeline visual ${slot + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 400px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </HomeReveal>

          {/* Right: details */}
          <HomeReveal
            variants={homeFadeRight}
            className="lg:col-span-4 order-2 lg:order-3"
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
                  className="font-heading font-black text-2xl sm:text-3xl md:text-4xl mb-2"
                  style={{ color: C.accentSoft }}
                >
                  {activeItem.period}
                </h3>
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-5 sm:mb-6"
                  style={{ color: "#F59E0B" }}
                >
                  {activeItem.tag}
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {activeItem.highlights.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-[13px] sm:text-sm leading-relaxed flex gap-3"
                      style={{ color: isDark ? "#D8E0F0" : "#475569" }}
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
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
