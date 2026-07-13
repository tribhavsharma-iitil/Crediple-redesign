"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeContent, homeColors, homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import DiamondNavButton from "@/components/ui/DiamondNavButton";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp, homeEase } from "@/lib/animations";

const { serve } = homeContent;
const C = homeColors;

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

export default function WhoWeServe() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(1); // Finance & Fintech featured
  const [offset, setOffset] = useState(0);
  const visible = useStripVisible();
  const total = serve.items.length;
  const item = serve.items[active];

  const clampOffset = (nextActive: number, currentOffset: number, vis: number) => {
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

  const stripItems = serve.items
    .map((cat, index) => ({ ...cat, index }))
    .slice(offset, offset + visible);

  return (
    <section
      id="serve"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
    >
      <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight"
            style={{ color: isDark ? "#DCE2F6" : "#0F172A" }}
          >
            {serve.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{serve.titleAccent}</span>
          </h2>
        </HomeReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: homeEase }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center mb-12 sm:mb-14 md:mb-16"
          >
            <div className="max-w-xl order-2 lg:order-1">
              <h3
                className="font-heading font-black text-2xl sm:text-3xl md:text-[2.5rem] leading-tight mb-4 sm:mb-5 tracking-tight"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[13px] sm:text-sm md:text-[15px] leading-relaxed mb-6 sm:mb-8"
                style={{ color: isDark ? "#C8D0DC" : "#475569" }}
              >
                {item.desc}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full text-white text-sm font-semibold no-underline transition-opacity hover:opacity-90 w-full sm:w-auto"
                style={{
                  background: C.buttonGradient,
                  boxShadow: `0 8px 24px ${C.glow}`,
                }}
              >
                Read More
              </Link>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl w-full order-1 lg:order-2">
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 md:gap-6">
            <div
              className="flex-1 grid gap-x-4 sm:gap-x-5 md:gap-x-8 gap-y-6 sm:gap-y-8 min-w-0"
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
                    className="text-left group w-full pt-3 sm:pt-4 border-t-2 transition-colors min-w-0"
                    style={{
                      borderColor: isActive
                        ? C.accentSoft
                        : isDark
                          ? "rgba(220,226,246,0.28)"
                          : "#CBD5E1",
                    }}
                  >
                    <p
                      className="font-heading font-bold text-xs sm:text-sm md:text-[15px] mb-1.5 sm:mb-2 transition-colors break-words"
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
                      className="text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-1"
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

            <div className="flex gap-3 shrink-0 pt-0 sm:pt-4 justify-end sm:justify-start">
              <DiamondNavButton
                isDark={isDark}
                onClick={prev}
                aria-label="Previous sector"
                style={{ color: isDark ? C.text : "#475569" }}
              >
                <ChevronLeft size={15} />
              </DiamondNavButton>
              <DiamondNavButton
                isDark={isDark}
                onClick={next}
                aria-label="Next sector"
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
