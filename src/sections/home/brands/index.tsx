"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
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
import { homeFadeLeft, homeStagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const INTERVAL = 5000;
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
  const visible = useVisibleCount();
  const brands = ecosystem.brands;
  const maxIndex = Math.max(0, brands.length - visible);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => setCurrent(Math.max(0, Math.min(idx, maxIndex))),
    [maxIndex]
  );

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c < maxIndex ? c + 1 : 0));
    }, INTERVAL);
  }, [maxIndex]);

  useEffect(() => {
    if (!paused) startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, startAuto]);

  // Keep carousel index valid when breakpoint / visible count changes
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const cardWidthPct = 100 / visible;
  const trackX = -(current * cardWidthPct);
  const pageCount = maxIndex + 1;

  return (
    <section
      id="ecosystem"
      className="relative py-16 md:py-24"
      style={{ background: isDark ? C.bgSection : "#FFFFFF" }}
    >
      <div
        ref={sectionRef}
        className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6"
      >
        <HomeReveal variants={homeFadeLeft} className="mb-8 w-full sm:mb-10">
          <div className="flex w-full flex-row items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2
                className="font-heading text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
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
            <div className="flex shrink-0 gap-3 self-end">
              <DiamondNavButton
                isDark={isDark}
                onClick={() => {
                  goTo(current > 0 ? current - 1 : maxIndex);
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
                  goTo(current < maxIndex ? current + 1 : 0);
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
          variants={homeStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* overflow-x only — avoid clipping a gray band under the cards */}
          <div className="overflow-x-clip">
            <motion.div
              className="-mx-3 flex"
              animate={{ x: `${trackX}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {brands.map((brand, i) => (
                <div
                  key={brand.name}
                  style={{
                    width: `${cardWidthPct}%`,
                    flex: `0 0 ${cardWidthPct}%`,
                  }}
                  className="px-3"
                >
                  <BrandCard brand={brand} index={i} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === current ? "w-6" : "w-1.5"
                )}
                style={{
                  background:
                    i === current
                      ? isDark
                        ? C.text
                        : C.accentStrong
                      : isDark
                        ? "rgba(248,248,248,0.25)"
                        : "#CBD5E1",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
