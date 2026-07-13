"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeContent, homeColors, homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import DiamondNavButton from "@/components/ui/DiamondNavButton";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeFadeLeft,
  homeScaleIn,
  homeStagger,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import ctaBg from "@/assets/gradient.png";

const INTERVAL = 5000;
const { testimonials, cta } = homeContent;
const C = homeColors;

/** Sampled from Home.pdf testimonials frame */
const T = {
  bg: "#03081A",
  card: "#0B1324",
  quote: "#F4F6FA",
  muted: "#7B8494",
  star: "#3E66DF",
} as const;

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

function BlueStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path
        fill={T.star}
        d="M12 2.5l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 17.8 5.99 20.5 7.4 13.9l-5-4.6 6.7-.7L12 2.5z"
      />
    </svg>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { isDark } = useTheme();
  const visible = useVisibleCount();
  const items = testimonials.items;
  const maxIndex = Math.max(0, items.length - visible);
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
    if (!paused && maxIndex > 0) startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, startAuto, maxIndex]);

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const cardWidthPct = 100 / visible;
  const trackX = -(current * cardWidthPct);
  const pageCount = maxIndex + 1;

  return (
    <div className="w-full">
      <section
        id="testimonials"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: isDark ? T.bg : "#FFFFFF" }}
      >
        <div
          ref={sectionRef}
          className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6"
        >
          <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10 w-full">
            <div className="flex flex-row items-end justify-between gap-4 w-full">
              <div className="min-w-0 flex-1">
                <h2
                  className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-left"
                  style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                >
                  {testimonials.titleBefore}{" "}
                  <span style={homeTitleAccentStyle}>
                    {testimonials.titleAccent}
                  </span>
                </h2>
                <p
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] mt-3 max-w-2xl text-left"
                  style={{ color: isDark ? T.muted : "#64748B" }}
                >
                  {testimonials.subtitle}
                </p>
              </div>
              <div className="flex gap-3 shrink-0 self-end">
                <DiamondNavButton
                  isDark={isDark}
                  onClick={() => {
                    goTo(current > 0 ? current - 1 : maxIndex);
                    startAuto();
                  }}
                  aria-label="Previous"
                  style={{ color: isDark ? C.text : "#475569" }}
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
                  style={{ color: isDark ? C.text : "#475569" }}
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
            <div className="overflow-hidden">
              <motion.div
                className="flex -mx-2 sm:-mx-3"
                animate={{ x: `${trackX}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      width: `${cardWidthPct}%`,
                      flex: `0 0 ${cardWidthPct}%`,
                    }}
                    className="px-2 sm:px-3"
                  >
                    <HomeItem variants={homeFadeUp} className="h-full">
                      <article
                        className="relative p-5 sm:p-7 md:p-8 h-full flex flex-col rounded-2xl text-left"
                        style={{ background: isDark ? T.card : "#F8FAFC" }}
                      >
                        <div className="flex items-center justify-center gap-[3px] mb-4 sm:mb-5">
                          <BlueStar />
                          <BlueStar />
                          <BlueStar />
                          <BlueStar />
                          <BlueStar />
                        </div>

                        <p
                          className="text-[13px] sm:text-sm md:text-[15px] leading-relaxed flex-1"
                          style={{ color: isDark ? T.quote : "#334155" }}
                        >
                          &ldquo;{item.text}&rdquo;
                        </p>

                        <div className="flex items-center gap-3 mt-6 sm:mt-8">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="font-bold text-sm truncate"
                              style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                            >
                              {item.name}
                            </p>
                            <p
                              className="text-xs mt-0.5 truncate"
                              style={{ color: isDark ? T.muted : "#64748B" }}
                            >
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </article>
                    </HomeItem>
                  </div>
                ))}
              </motion.div>
            </div>

            {pageCount > 1 && (
              <div className="flex justify-center gap-2 mt-8">
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
            )}
          </motion.div>
        </div>
      </section>

      <section
        className="relative pb-16 sm:pb-20 md:pb-28 pt-4 sm:pt-6 md:pt-8"
        style={{ background: isDark ? T.bg : "#F8FAFC" }}
      >
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeScaleIn}>
            <div
              className="relative overflow-hidden rounded-2xl sm:rounded-[28px] px-4 py-10 sm:px-6 sm:py-14 md:px-16 md:py-20 text-center"
              style={
                isDark
                  ? {
                      backgroundColor: "#050B18",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
                  : {
                      backgroundImage: `linear-gradient(90deg, ${C.accentStrong}, ${C.accent}, ${C.accentSoft})`,
                    }
              }
            >
              {isDark && (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 z-0 pointer-events-none"
                  >
                    <Image
                      src={ctaBg}
                      alt=""
                      fill
                      sizes="(max-width: 1260px) 100vw, 1260px"
                      className="object-cover object-center opacity-90"
                      priority={false}
                    />
                  </div>

                  <div
                    aria-hidden
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(ellipse 45% 55% at 12% 88%, rgba(70, 50, 140, 0.28) 0%, transparent 70%),
                        radial-gradient(ellipse 40% 50% at 90% 12%, rgba(47, 128, 237, 0.18) 0%, transparent 70%)
                      `,
                    }}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(160, 190, 240, 0.14) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(160, 190, 240, 0.14) 1px, transparent 1px)
                      `,
                      backgroundSize: "52px 52px",
                      WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                      maskImage:
                        "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                    }}
                  />
                </>
              )}

              <h2 className="relative z-10 font-heading font-bold text-2xl sm:text-3xl md:text-[2.75rem] lg:text-5xl mb-4 sm:mb-5 tracking-tight max-w-3xl mx-auto leading-[1.15] text-white px-1">
                {cta.title}
              </h2>

              <p
                className="relative z-10 text-[13px] sm:text-sm md:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-1"
                style={{
                  color: isDark ? "#A8B0BC" : "rgba(255,255,255,0.85)",
                }}
              >
                {cta.description}
              </p>

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href={cta.primaryCta.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-white font-semibold text-sm no-underline transition-opacity hover:opacity-90"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #2F80ED 0%, #1550B4 100%)",
                    boxShadow: "0 6px 20px rgba(47, 128, 237, 0.35)",
                  }}
                >
                  {cta.primaryCta.label}
                </a>
              </div>
            </div>
          </HomeReveal>
        </div>
      </section>
    </div>
  );
}
