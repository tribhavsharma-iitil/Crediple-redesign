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
import { CredipleButton } from "@/components/ui/CredipleButton";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { cn } from "@/lib/utils";
import sectionBg from "@/assets/home/visual_bg.png";


const { ecosystem, hero, values } = homeContent;
const C = homeColors;

const aboutCardReveal = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: homeEase },
  },
};

export default function Brands() {
  const { isDark } = useTheme();
  const { stagger, viewport, staggerFast } = useHomeMotion();

  const ecosystemSectionRef = useRef<HTMLElement>(null);
  const brandsScrollerRef = useRef<HTMLDivElement>(null);
  const isEcosystemInViewRef = useRef(false);

  useEffect(() => {
    const sectionEl = ecosystemSectionRef.current;
    const scrollerEl = brandsScrollerRef.current;
    if (!sectionEl || !scrollerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isEcosystemInViewRef.current =
          entry.isIntersecting && entry.intersectionRatio >= 0.85;
      },
      { threshold: [0, 0.5, 0.75, 0.85, 0.9, 1] }
    );
    observer.observe(sectionEl);

    const handleWheel = (e: WheelEvent) => {
      if (!isEcosystemInViewRef.current) return;

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
      if (!isEcosystemInViewRef.current) return;

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
    <>
      <section
        id="ecosystem"
        ref={ecosystemSectionRef}
        className="relative section-py overflow-hidden"
        style={{ background: isDark ? '#000000' : '#FFFFFF' }}
      >
        {isDark && (
          <video
            aria-hidden
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 z-0 md:h-78 h-60 top-[30%] lg:block hidden w-full object-cover"
            src="/videos/section_bg_effect.mp4"
          />
        )}
        <div className="relative z-10">
          <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
            <HomeReveal variants={homeFadeLeft} className="mb-8 w-full sm:mb-10">
              <div className="flex w-full flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2
                    className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
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
                <CredipleButton href={hero.primaryCta.href} size="md">
                  Explore
                </CredipleButton>
              </div>
            </HomeReveal>
          </div>


          <motion.div
            ref={brandsScrollerRef}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex gap-px overflow-x-auto !overflow-y-hidden border hide-scrollbar"
            style={{
              background: isDark ? 'transparent' : homeLight.border,
              borderColor: isDark ? C.border : homeLight.border,
              backdropFilter: isDark ? "blur(104px)" : "none",
              WebkitBackdropFilter: isDark ? "blur(104px)" : "none",
            }}
          >
            {ecosystem.brands.map((brand) => {
              const cardStyle = {
                background: isDark ? 'transparent' : homeLight.bg,
              };
              const cardClassName =
                "relative flex h-full w-[350px] md:h-90 h-80 shrink-0 flex-col p-6 no-underline transition-colors duration-200 sm:p-7 lg:p-8 border-r";

              const inner = (
                <>
                  <div className="mb-5 flex w-full items-center justify-end sm:mb-16">
                    <Image
                      src={isDark ? brand.iconDark : brand.icon}
                      alt={brand.name}
                      width={100}
                      height={60}
                      className=" w-auto object-contain lg:h-12 h-10"
                    />
                  </div>
                  <h3
                    className="font-heading mt-2 mb-2 text-2xl font-black tracking-tight"
                    style={{ color: isDark ? C.text : homeLight.heading }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="mt-4 text-[16px] leading-relaxed"
                    style={{ color: isDark ? "rgba(220,226,246,0.65)" : homeLight.body }}
                  >
                    {brand.description}
                  </p>
                </>
              );

              return (
                <HomeItem key={brand.name} className="h-full">
                  {brand.clickable ? (
                    <Link
                      href={brand.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(cardClassName, "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]")}
                      style={cardStyle}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className={cardClassName} style={cardStyle}>
                      {inner}
                    </div>
                  )}
                </HomeItem>
              );
            })}
          </motion.div>
        </div>
      </section>
      <section
        id="values"
        className="relative scroll-mt-20 overflow-hidden py-20 sm:scroll-mt-24"
        style={{
          background: isDark
            ? `url(${sectionBg.src}) center/cover no-repeat`
            : "#FFFFFF"
        }}
      >
        {/* Soft blue glow — behind image column, not over the list */}
        {/* <div
          aria-hidden
          className="absolute right-[-8%] top-[15%] w-[min(560px,70vw)] h-[min(560px,70vw)] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${C.glow} 0%, transparent 68%)`,
            filter: "blur(48px)",
            opacity: isDark ? 0.85 : 0.3,
          }}
        />
        <div
          aria-hidden
          className="absolute left-[35%] bottom-[-15%] w-[min(380px,55vw)] h-[min(380px,55vw)] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(47,128,237,0.14) 0%, transparent 70%)",
            filter: "blur(56px)",
            opacity: isDark ? 1 : 0.2,
          }}
        /> */}

        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            <HomeReveal className="m-auto" variants={homeFadeLeft}>
              <h2
                className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: isDark ? "#ffffff" : homeLight.heading }}
              >
                {values.titleBefore}{" "}
                <span style={getHomeTitleAccentStyle(isDark)}>
                  {values.titleAccent}
                </span>
              </h2>
              <p
                className="mb-6 max-w-md text-sm sm:text-base"
                style={{ color: isDark ? "#ffffff" : homeLight.muted }}
              >
                {values.subtitle}
              </p>
              <CredipleButton href={values.cta.href} size="md" className="uppercase tracking-wide">
                {values.cta.label}
              </CredipleButton>
            </HomeReveal>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 overflow-hidden border"
              style={{
                background: isDark ? `#FFFFFF0A` : "#FBFBFB",
                borderColor: isDark ? C.border : homeLight.border,
              }}
            >
              {values.items.map((item, i) => (
                <HomeItem key={item.number} variants={aboutCardReveal}>
                  <div
                    className={`p-5 sm:p-6 lg:p-7 ${i === 0 ? "" : "border-t"}`}
                    style={{ borderColor: isDark ? C.border : homeLight.border }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: isDark ? C.accentSoft : homeLight.accent }}
                    >
                      {item.number}
                    </span>
                    <h3
                      className="font-heading mt-2 mb-2 text-2xl font-black tracking-tight"
                      style={{ color: isDark ? C.text : homeLight.heading }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed sm:text-[16px]"
                      style={{ color: isDark ? "rgba(255,255,255,0.65)" : homeLight.muted }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </HomeItem>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>

  );
}
