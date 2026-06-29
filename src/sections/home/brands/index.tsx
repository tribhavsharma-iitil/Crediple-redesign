"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { BRANDS } from "@/utils/siteData";
import Header from "@/shared/header";
import BrandCard from "./brandCard";

const INTERVAL = 5000;

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

// Responsive visible count based on window width
function useVisibleCount() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 768) setCount(2);
      else if (w < 1024) setCount(3);
      else setCount(4);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export default function Brands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visible = useVisibleCount();
  const maxIndex = Math.max(0, BRANDS.length - visible);

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(idx, maxIndex));
      setCurrent(next);
      setProgressKey((k) => k + 1);
    },
    [maxIndex]
  );

  // Clamp current when visible count changes (e.g. resize)
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = c < maxIndex ? c + 1 : 0;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, INTERVAL);
  }, [maxIndex]);

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAuto]);

  const handleNav = (dir: "prev" | "next") => {
    goTo(
      dir === "prev"
        ? current > 0 ? current - 1 : maxIndex
        : current < maxIndex ? current + 1 : 0
    );
    startAuto();
  };

  // Each card takes (100 / visible)% width; track shifts by that per step
  const cardWidthPct = 100 / visible;
  const trackX = -(current * cardWidthPct);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <Header
          heading="Our"
          highlight="Brands"
          subheading="Access specialized solutions, unified under one powerful ecosystem"
        />

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Progress bar */}
          <div
            className="absolute -top-2 left-0 right-0 h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              key={progressKey}
              className="h-full rounded-full"
              style={{ background: "rgba(59,130,246,0.7)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
            />
          </div>

          {/* Track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `${trackX}%` }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {BRANDS.map((brand, i) => (
                <div
                  key={brand.name}
                  className="px-2 shrink-0"
                  style={{ width: `${cardWidthPct}%`, flex: `0 0 ${cardWidthPct}%` }}
                >
                  <BrandCard brand={brand} index={i} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={() => handleNav("prev")}
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{
              border: "1px solid var(--border)",
              background: "var(--card-inner)",
              color: "var(--text-secondary)",
            }}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={() => handleNav("next")}
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{
              border: "1px solid var(--border)",
              background: "var(--card-inner)",
              color: "var(--text-secondary)",
            }}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startAuto(); }}
              className="rounded-full transition-all duration-250"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                background:
                  i === current
                    ? "rgba(59,130,246,0.8)"
                    : "rgba(255,255,255,0.2)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Ticker */}
        <div
          className="relative mt-10 overflow-hidden rounded-full border py-3"
          style={{
            borderColor: "var(--border)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(96,165,250,0.04))",
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            className="flex w-max items-center gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <span
                key={`${brand.name}-${index}`}
                className="rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.18em]"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-subtle)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {brand.name}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}