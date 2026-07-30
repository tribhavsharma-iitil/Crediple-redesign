"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";

const { serve } = homeContent;
const C = homeColors;

export default function SolutionsDomains() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  const domainsSectionRef = useRef<HTMLElement>(null);
  const domainsScrollerRef = useRef<HTMLDivElement>(null);
  const isDomainsInViewRef = useRef(false);

  useEffect(() => {
    const sectionEl = domainsSectionRef.current;
    const scrollerEl = domainsScrollerRef.current;
    if (!sectionEl || !scrollerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isDomainsInViewRef.current =
          entry.isIntersecting && entry.intersectionRatio >= 0.85;
      },
      { threshold: [0, 0.5, 0.75, 0.85, 0.9, 1] }
    );
    observer.observe(scrollerEl);

    const handleWheel = (e: WheelEvent) => {
      if (!isDomainsInViewRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollerEl;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft <= 0) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      const scrollingForward = delta > 0;
      const atEnd = scrollLeft >= maxScrollLeft - 1;
      const atStart = scrollLeft <= 1;

      if ((scrollingForward && !atEnd) || (!scrollingForward && !atStart)) {
        e.preventDefault();
        scrollerEl.scrollLeft += delta;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if (!isDomainsInViewRef.current) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const activeTag = activeEl?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeEl?.isContentEditable) {
        return;
      }

      e.preventDefault();
      const step = 350;
      scrollerEl.scrollBy({
        left: e.key === "ArrowRight" ? step : -step,
        behavior: "smooth",
      });
    };

    sectionEl.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      sectionEl.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      id="serve"
      ref={domainsSectionRef}
      className="relative section-py overflow-hidden"
      style={{ background: isDark ? C.bgSection : '#FFFFFF' }}
    >
      <div className="">
        <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeFadeUp} className="mb-8 text-center sm:mb-10 md:mb-12">
            <h2
              className="font-heading text-2xl font-black sm:text-3xl md:text-4xl lg:text-5xl tracking-tight"
              style={{ color: isDark ? "#ffffff" : homeLight.heading }}
            >
              {serve.titleBefore}{" "}
              <span style={getHomeTitleAccentStyle(isDark)}>{serve.titleAccent}</span>
            </h2>
            <p
              className="mt-2 text-sm sm:text-base"
              style={{ color: isDark ? '#FFFFFF' : homeLight.muted }}
            >
              {serve.subtitle}
            </p>
          </HomeReveal>
        </div>
        <div className="">
          <motion.div
            ref={domainsScrollerRef}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex gap-0 overflow-x-auto !overflow-y-hidden pb-2 hide-scrollbar"
          >
            {serve.items.map((item) => (
              <HomeItem
                key={item.title}
                variants={homeFadeUp}
                className="w-[220px] shrink-0 sm:w-[240px] lg:w-[380px] h-[300px] sm:h-[320px] lg:h-[400px]"
              >
                <Link
                  href={item.href}
                  className="group relative block aspect-[4/3] w-full overflow-hidden no-underline h-full"
                  style={{ borderColor: isDark ? C.border : homeLight.border }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 240px, 400px"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(3,8,26,0.85) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <h3 className="font-heading md:text-xl font-bold text-white text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">
                      {item.short}
                    </p>
                  </div>
                </Link>
              </HomeItem>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
