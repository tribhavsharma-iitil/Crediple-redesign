"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DiamondNavButton from "@/components/ui/DiamondNavButton";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import BrandCard from "./brandCard";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeEase, homeFadeLeft } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { cn } from "@/lib/utils";

const INTERVAL = 2200;
const SLIDE_MS = 0.28;
const { ecosystem } = homeContent;
const C = homeColors;

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export default function Brands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { isDark } = useTheme();
  const { stagger } = useHomeMotion();
  const visible = useVisibleCount();
  const brands = ecosystem.brands;
  const maxIndex = Math.max(0, brands.length - visible);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number, dir?: number) => {
      const next = Math.max(0, Math.min(idx, maxIndex));
      setDirection(dir ?? (next >= current ? 1 : -1));
      setCurrent(next);
    },
    [maxIndex, current],
  );

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c < maxIndex ? c + 1 : 0));
    }, INTERVAL);
  }, [maxIndex]);

  useEffect(() => {
    if (!paused) startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, startAuto]);

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const cardWidthPct = 100 / visible;
  const trackX = -(current * cardWidthPct);
  const pageCount = maxIndex + 1;

  return (
    <section
      id="ecosystem"
      className="relative py-12 sm:py-16 md:py-24"
      style={{ background: isDark ? C.bgSection : homeLight.bg }}
    >
      <div
        ref={sectionRef}
        className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6"
      >
        <HomeReveal variants={homeFadeLeft} className="mb-8 w-full sm:mb-10">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="min-w-0 flex-1">
              <h2
                className="font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ color: isDark ? C.text : homeLight.heading }}
              >
                {ecosystem.titleBefore}{" "}
                <span style={getHomeTitleAccentStyle(isDark)}>
                  {ecosystem.titleAccent}
                </span>
              </h2>
              <p
                className="mt-2 text-sm font-medium"
                style={{ color: isDark ? C.textMuted : homeLight.muted }}
              >
                {ecosystem.subtitle}
              </p>
            </div>
            <div className="hidden shrink-0 gap-3 sm:flex sm:self-end">
              <DiamondNavButton
                isDark={isDark}
                onClick={() => {
                  goTo(current > 0 ? current - 1 : maxIndex, -1);
                  startAuto();
                }}
                aria-label="Previous"
                style={{ color: isDark ? C.text : homeLight.body }}
              >
                <ChevronLeft size={15} />
              </DiamondNavButton>
              <DiamondNavButton
                isDark={isDark}
                onClick={() => {
                  goTo(current < maxIndex ? current + 1 : 0, 1);
                  startAuto();
                }}
                aria-label="Next"
                style={{ color: isDark ? C.text : homeLight.body }}
              >
                <ChevronRight size={15} />
              </DiamondNavButton>
            </div>
          </div>
        </HomeReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-x-clip">
            <motion.div
              className="-mx-3 flex will-change-transform"
              animate={{ x: `${trackX}%` }}
              transition={{
                duration: SLIDE_MS,
                ease: homeEase,
              }}
            >
              {brands.map((brand, i) => {
                const inView = i >= current && i < current + visible;
                return (
                  <motion.div
                    key={brand.name}
                    style={{
                      width: `${cardWidthPct}%`,
                      flex: `0 0 ${cardWidthPct}%`,
                    }}
                    className="px-3"
                    animate={{
                      opacity: inView ? 1 : 0.5,
                      scale: inView ? 1 : 0.94,
                      y: inView ? 0 : 10,
                    }}
                    transition={{
                      duration: SLIDE_MS,
                      ease: homeEase,
                      delay: inView ? 0.02 * Math.max(0, i - current) : 0,
                    }}
                  >
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="h-full"
                    >
                      <BrandCard brand={brand} index={i} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 sm:gap-2">
            <div className="flex gap-3 sm:hidden">
              <DiamondNavButton
                isDark={isDark}
                onClick={() => {
                  goTo(current > 0 ? current - 1 : maxIndex, -1);
                  startAuto();
                }}
                aria-label="Previous"
                style={{ color: isDark ? C.text : homeLight.body }}
              >
                <ChevronLeft size={16} />
              </DiamondNavButton>
            </div>

            <div className="flex justify-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    goTo(i);
                    startAuto();
                  }}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={cn(
                    "relative h-1.5 overflow-hidden rounded-full transition-[width] duration-300",
                    i === current ? "w-7" : "w-1.5",
                  )}
                  style={{
                    background:
                      i === current
                        ? isDark
                          ? "rgba(248,248,248,0.2)"
                          : "rgba(47,128,237,0.2)"
                        : isDark
                          ? "rgba(248,248,248,0.25)"
                          : "#CBD5E1",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {i === current && (
                      <motion.span
                        key={`fill-${current}-${paused ? "p" : "r"}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: isDark ? C.text : C.accentStrong,
                          originX: 0,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={
                          paused
                            ? { duration: 0.15 }
                            : {
                                duration: INTERVAL / 1000,
                                ease: "linear",
                              }
                        }
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            <div className="flex gap-3 sm:hidden">
              <DiamondNavButton
                isDark={isDark}
                onClick={() => {
                  goTo(current < maxIndex ? current + 1 : 0, 1);
                  startAuto();
                }}
                aria-label="Next"
                style={{ color: isDark ? C.text : homeLight.body }}
              >
                <ChevronRight size={16} />
              </DiamondNavButton>
            </div>
          </div>

          {/* Direction hint for a11y / subtle motion cue */}
          <span className="sr-only" aria-live="polite">
            Slide {current + 1} of {pageCount}, direction{" "}
            {direction > 0 ? "forward" : "back"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
