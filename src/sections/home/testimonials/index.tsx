"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import DiamondNavButton from "@/components/ui/DiamondNavButton";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeFadeLeft,
  homeScaleIn,
} from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
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

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
  const { stagger } = useHomeMotion();
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
        className="relative section-py overflow-hidden"
        style={{ background: isDark ? T.bg : homeLight.bgAlt }}
      >
        <div
          ref={sectionRef}
          className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6"
        >
          <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10 w-full">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2
                  className="font-heading text-left text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
                >
                  {testimonials.titleBefore}{" "}
                  <span style={getHomeTitleAccentStyle(isDark)}>
                    {testimonials.titleAccent}
                  </span>
                </h2>
                <p
                  className="mt-3 max-w-2xl text-left text-[10px] font-semibold tracking-[0.16em] uppercase sm:text-[11px]"
                  style={{ color: isDark ? T.muted : homeLight.muted }}
                >
                  {testimonials.subtitle}
                </p>
              </div>
              <div className="hidden shrink-0 gap-3 sm:flex sm:self-end">
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
            variants={stagger}
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
                {items.map((item, index) => (
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
                        style={{
                          background: isDark ? T.card : homeLight.card,
                          boxShadow: isDark
                            ? "none"
                            : "0 8px 28px rgba(15, 23, 42, 0.06)",
                          border: isDark
                            ? "none"
                            : `1px solid ${homeLight.border}`,
                        }}
                      >
                        <div className="flex items-center justify-center gap-[3px] mb-4 sm:mb-5">
                          {Array.from({
                            length: index === 1 ? 4 : 5,
                          }).map((_, i) => (
                            <BlueStar key={i} />
                          ))}
                        </div>

                        <p
                          className="text-[13px] sm:text-sm md:text-[15px] leading-relaxed flex-1"
                          style={{ color: isDark ? T.quote : "#334155" }}
                        >
                          &ldquo;{item.text}&rdquo;
                        </p>

                        <div className="flex items-center gap-3 mt-6 sm:mt-8">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wide"
                            style={{
                              background: C.buttonGradient,
                              color: "#FFFFFF",
                            }}
                            aria-hidden
                          >
                            {initialsFromName(item.name)}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="font-bold text-sm truncate"
                              style={{
                                color: isDark ? "#FFFFFF" : T.star,
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              className="text-xs mt-0.5 truncate"
                              style={{
                                color: isDark ? T.muted : homeLight.muted,
                              }}
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
              <div className="mt-8 flex items-center justify-center gap-4 sm:gap-2">
                <div className="flex sm:hidden">
                  <DiamondNavButton
                    isDark={isDark}
                    onClick={() => {
                      goTo(current > 0 ? current - 1 : maxIndex);
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

                <div className="flex sm:hidden">
                  <DiamondNavButton
                    isDark={isDark}
                    onClick={() => {
                      goTo(current < maxIndex ? current + 1 : 0);
                      startAuto();
                    }}
                    aria-label="Next"
                    style={{ color: isDark ? C.text : homeLight.body }}
                  >
                    <ChevronRight size={16} />
                  </DiamondNavButton>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA — always dark navy card (same UI in light + dark page themes) */}
      <section
        className="relative section-cta-end"
        style={{ background: isDark ? T.bg : homeLight.bg }}
      >
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeScaleIn}>
            <div
              className="relative overflow-hidden rounded-2xl section-card-py sm:rounded-[28px] px-4 sm:px-6 md:px-16 text-center"
              style={{
                backgroundColor: "#050B18",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
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

              <h2
                className="relative z-10 font-heading font-bold text-2xl sm:text-3xl md:text-[2.75rem] lg:text-5xl mb-4 sm:mb-5 tracking-tight max-w-3xl mx-auto leading-[1.15] px-1"
                style={{ color: "#FFFFFF" }}
              >
                {cta.title}
              </h2>

              <p
                className="relative z-10 text-[13px] sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-1"
                style={{ color: "#A8B0BC" }}
              >
                {cta.description}
              </p>
            </div>
          </HomeReveal>
        </div>
      </section>
    </div>
  );
}
