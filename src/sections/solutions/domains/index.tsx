"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  solutionsContent,
  solutionsColors,
  homeTitleAccentStyle,
} from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import DiamondNavButton from "@/components/ui/DiamondNavButton";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp, homeEase } from "@/lib/animations";

const { domains } = solutionsContent;
const C = solutionsColors;

function useStripVisible() {
  const [count, setCount] = useState(2);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(3);
      else setCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export default function SolutionsDomains() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const visible = useStripVisible();
  const total = domains.items.length;
  const item = domains.items[active];

  const clampOffset = (
    nextActive: number,
    currentOffset: number,
    vis: number
  ) => {
    if (nextActive < currentOffset) return nextActive;
    if (nextActive >= currentOffset + vis) return nextActive - vis + 1;
    return Math.min(currentOffset, Math.max(0, total - vis));
  };

  useEffect(() => {
    setOffset((o) => clampOffset(active, o, visible));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, active, total]);

  const goTo = (index: number) => {
    const next = ((index % total) + total) % total;
    setActive(next);
    setOffset((o) => clampOffset(next, o, visible));
  };

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const stripItems = domains.items
    .map((cat, index) => ({ ...cat, index }))
    .slice(offset, offset + visible);

  return (
    <section
      id="domains"
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
      style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
    >
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-6 sm:mb-10 md:mb-12">
          <h2
            className="font-heading text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: isDark ? "#DCE2F6" : "#0F172A" }}
          >
            {domains.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{domains.titleAccent}</span>
          </h2>
        </HomeReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: homeEase }}
            className="mb-8 grid grid-cols-1 items-center gap-6 sm:mb-14 sm:gap-10 md:mb-16 lg:grid-cols-2 lg:gap-16"
          >
            <div className="order-2 max-w-xl lg:order-1">
              <h3
                className="font-heading mb-3 text-xl leading-tight font-black tracking-tight sm:mb-5 sm:text-3xl md:text-[2.5rem]"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {item.title}
              </h3>
              <p
                className="mb-6 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:text-[15px]"
                style={{ color: isDark ? "#C8D0DC" : "#475569" }}
              >
                {item.desc}
              </p>
              <Link
                href={item.href}
                className="inline-flex w-full items-center justify-center rounded-full px-7 py-2.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 sm:w-auto"
                style={{
                  background: C.buttonGradient,
                  boxShadow: `0 8px 24px ${C.glow}`,
                }}
              >
                Read More
              </Link>
            </div>

            <div className="relative order-1 aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl lg:order-2">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <HomeReveal variants={homeFadeUp}>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-6">
            <div
              className="grid min-w-0 flex-1 gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-8 md:gap-x-8"
              style={{
                gridTemplateColumns: `repeat(${visible}, minmax(0, 1fr))`,
              }}
            >
              {stripItems.map((cat) => {
                const isActive = cat.index === active;
                return (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => goTo(cat.index)}
                    className="group w-full min-w-0 border-t-2 pt-3 text-left transition-colors sm:pt-4"
                    style={{
                      borderColor: isActive
                        ? C.accentSoft
                        : isDark
                          ? "rgba(220,226,246,0.28)"
                          : "#CBD5E1",
                    }}
                  >
                    <p
                      className="font-heading mb-1.5 text-xs font-bold break-words transition-colors sm:mb-2 sm:text-sm md:text-[15px]"
                      style={{
                        color: isActive
                          ? isDark
                            ? C.text
                            : "#0F172A"
                          : isDark
                            ? "#DCE2F6"
                            : "#64748B",
                      }}
                    >
                      {cat.title}
                    </p>
                    <p
                      className="line-clamp-2 text-[11px] leading-relaxed sm:line-clamp-1 sm:text-xs"
                      style={{
                        color: isActive
                          ? isDark
                            ? C.textMuted
                            : "#64748B"
                          : isDark
                            ? "rgba(220,226,246,0.55)"
                            : "#94A3B8",
                      }}
                    >
                      {cat.short}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 justify-end gap-3 pt-0 sm:justify-start sm:pt-4">
              <DiamondNavButton
                isDark={isDark}
                onClick={prev}
                aria-label="Previous domain"
                style={{ color: isDark ? C.text : "#475569" }}
              >
                <ChevronLeft size={15} />
              </DiamondNavButton>
              <DiamondNavButton
                isDark={isDark}
                onClick={next}
                aria-label="Next domain"
                style={{ color: isDark ? C.text : "#475569" }}
              >
                <ChevronRight size={15} />
              </DiamondNavButton>
            </div>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
