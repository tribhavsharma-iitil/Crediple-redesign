"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { aboutContent, aboutColors } from "@/content/about";
import { homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeLeft,
  homeFadeRight,
  homeFadeUp,
  homeStagger,
  homeViewport,
} from "@/lib/animations";

const { future } = aboutContent;
const C = aboutColors;

export default function AboutFuture() {
  const { isDark } = useTheme();

  return (
    <section
      id="future"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <HomeReveal stagger>
            <HomeItem variants={homeFadeLeft}>
              <h2
                className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6"
                style={{ color: isDark ? C.textHeading : "#0F172A" }}
              >
                {future.titleBefore}{" "}
                <span style={homeTitleAccentStyle}>
                  {future.titleAccent}
                </span>
              </h2>

              <p
                className="font-heading font-bold text-xl sm:text-2xl md:text-[1.75rem] leading-[1.35] mb-5"
                style={{ color: isDark ? C.textHeading : "#0F172A" }}
              >
                {future.headlineLine1}
                <br />
                {future.headlineLine2}
              </p>

              <p
                className="text-sm md:text-[15px] leading-relaxed mb-8 max-w-md"
                style={{ color: isDark ? C.textHeading : "#64748B" }}
              >
                {future.body}
              </p>

              <Link
                href={future.cta.href}
                className="inline-flex items-center justify-center px-8 py-2.5 rounded-full text-white text-sm font-semibold no-underline transition-opacity hover:opacity-90"
                style={{
                  background: C.buttonGradient,
                  boxShadow: `0 8px 24px ${C.glow}`,
                }}
              >
                {future.cta.label}
              </Link>
            </HomeItem>
          </HomeReveal>

          <HomeReveal variants={homeFadeRight} delay={0.1}>
            <motion.div
              variants={homeStagger}
              initial="hidden"
              whileInView="visible"
              viewport={homeViewport}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-10"
            >
              {future.items.map((item) => (
                <HomeItem key={item.title} variants={homeFadeUp}>
                  <div
                    className="py-5 border-b"
                    style={{
                      borderColor: isDark
                        ? "rgba(248,248,248,0.12)"
                        : "#E2E8F0",
                    }}
                  >
                    <p
                      className="font-heading font-bold text-[15px] mb-2"
                      style={{ color: isDark ? C.textHeading : "#0F172A" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{
                        color: isDark ? C.textClosingMuted : "#64748B",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </HomeItem>
              ))}
            </motion.div>
          </HomeReveal>
        </div>
      </div>
    </section>
  );
}
