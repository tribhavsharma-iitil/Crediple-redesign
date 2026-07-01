"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRANDS } from "@/utils/siteData";
import { useTheme } from "@/context/ThemeContext";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import BrandCard from "./brandCard";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const INTERVAL = 5000;

function useVisibleCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(4);
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
  const maxIndex = Math.max(0, BRANDS.length - visible);
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

  const cardWidthPct = 100 / visible;
  const trackX = -(current * cardWidthPct);
  const pageCount = maxIndex + 1;

  return (
    <SectionWrapper bg="alt" id="ecosystem">
      <div 
        ref={sectionRef} 
        className="w-full max-w-[1260px] xl:w-[1260px] mx-auto px-6 lg:px-0"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className={cn(
                "font-heading font-black text-4xl md:text-5xl tracking-tight",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              Our Ecosystem
            </h2>
            <p
              className={cn(
                "text-sm mt-2 font-medium tracking-wide",
                isDark ? "text-slate-400" : "text-slate-500"
              )}
            >
              The power of diverse industries, unified by data.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                goTo(current > 0 ? current - 1 : maxIndex);
                startAuto();
              }}
              aria-label="Previous"
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all bg-white/5 hover:bg-white/10 active:scale-95",
                isDark
                  ? "border-white/10 text-slate-300"
                  : "border-slate-200 text-slate-600"
              )}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                goTo(current < maxIndex ? current + 1 : 0);
                startAuto();
              }}
              aria-label="Next"
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all bg-white/5 hover:bg-white/10 active:scale-95",
                isDark
                  ? "border-white/10 text-slate-300"
                  : "border-slate-200 text-slate-600"
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden mix-blend-normal">
            <motion.div
              className="flex -mx-2"
              animate={{ x: `${trackX}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {BRANDS.map((brand, i) => (
                <div
                  key={brand.name}
                  style={{ width: `${cardWidthPct}%`, flex: `0 0 ${cardWidthPct}%` }}
                  className="px-2"
                >
                  <BrandCard brand={brand} index={i} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === current
                    ? isDark
                      ? "w-8 bg-white"
                      : "w-8 bg-blue-600"
                    : isDark
                    ? "w-4 bg-white/10"
                    : "w-4 bg-slate-200"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}