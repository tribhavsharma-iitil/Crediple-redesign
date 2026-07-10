"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { homeContent, homeColors, homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeScaleIn,
  homeStagger,
  homeViewport,
} from "@/lib/animations";
import ctaBg from "@/assets/gradient.png";

const { testimonials, cta } = homeContent;
const C = homeColors;

/** Sampled from Home.pdf testimonials frame */
const T = {
  bg: "#03081A",
  card: "#0B1324",
  ball: "#041565",
  quote: "#F4F6FA",
  muted: "#7B8494",
  star: "#3E66DF",
} as const;

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

function Ball({
  size,
  style,
  className,
}: {
  size: number;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-full pointer-events-none ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        backgroundColor: T.ball,
        ...style,
      }}
    />
  );
}

export default function Testimonials() {
  const { isDark } = useTheme();

  return (
    <div className="w-full">
      <section
        id="testimonials"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: isDark ? T.bg : "#FFFFFF" }}
      >
        {/* Full-bleed balls relative to section (matches PDF frame) */}
        {isDark && (
          <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Left big — cut off by left/bottom, sits behind card 1 */}
            <Ball
              size={180}
              style={{ left: -40, bottom: 40 }}
              className="sm:!w-[250px] sm:!h-[250px] sm:!-left-[50px] sm:!bottom-[50px]"
            />
            {/* Top-right — beside the heading */}
            <Ball
              size={80}
              style={{ right: "6%", top: 48 }}
              className="sm:!w-[130px] sm:!h-[130px] sm:!right-[8%] sm:!top-[72px]"
            />
            {/* Bottom-right — small peek */}
            <Ball
              size={64}
              style={{ right: 24, bottom: 40 }}
              className="sm:!w-[100px] sm:!h-[100px] sm:!right-[100px] sm:!bottom-[70px]"
            />
          </div>
        )}

        <div className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6">
          <motion.div
            variants={homeStagger}
            initial="hidden"
            whileInView="visible"
            viewport={homeViewport}
          >
            <HomeItem variants={homeFadeUp}>
              <h2
                className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-left"
                style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
              >
                {testimonials.titleBefore}{" "}
                <span style={homeTitleAccentStyle}>
                  {testimonials.titleAccent}
                </span>
              </h2>
            </HomeItem>

            <HomeItem variants={homeFadeUp}>
              <p
                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] mt-3 mb-10 sm:mb-12 md:mb-14 max-w-2xl text-left"
                style={{ color: isDark ? T.muted : "#64748B" }}
              >
                {testimonials.subtitle}
              </p>
            </HomeItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {testimonials.items.map((item) => (
                <HomeItem key={item.name} variants={homeFadeUp}>
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
              ))}
            </div>
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
              className="relative overflow-hidden rounded-2xl sm:rounded-[28px] px-5 py-12 sm:px-6 sm:py-14 md:px-16 md:py-20 text-center"
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
                  {/* Inner gradient image — darker base inside the card */}
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

                  {/* Very subtle corner washes — match design, not heavy orbs */}
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

                  {/* Grid lines — stronger so they read on the dark bg */}
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
