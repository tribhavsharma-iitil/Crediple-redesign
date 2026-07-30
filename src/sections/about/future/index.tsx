"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { aboutContent, aboutColors } from "@/content/about";
import { homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";

const { future } = aboutContent;
const C = aboutColors;

export default function AboutFuture() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="future"
      className="relative section-py overflow-hidden"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="w-full max-w-[1260px] mx-auto px-4 text-center sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <h2
            className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-align-center md:max-w-xl md:mx-auto"
            style={{ color: isDark ? '#ffffff' : "#0F172A" }}
          >
            {future.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{future.titleAccent}</span>
          </h2>

          <p
            className="mx-auto max-w-2xl text-sm md:text-[15px] leading-relaxed mb-10 sm:mb-12"
            style={{ color: isDark ? '#ffffff' : "#64748B" }}
          >
            {future.body}
          </p>
        </HomeReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-10 grid grid-cols-2 items-start gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-4"
        >
          {future.items.map((item, i) => (
            <HomeItem
              key={item.title}
              variants={homeFadeUp}
              className={i % 2 === 1 ? "mt-8 sm:mt-14" : ""}
            >
              <div
                className="border py-12 px-4 text-left "
                style={{
                  background: isDark ? "#FFFFFF0A" : "#F8FAFC",
                  borderColor: isDark ? "#232323" : "#E2E8F0",
                }}
              >
                <p
                  className="font-black tracking-tight sm:text-4xl mb-8"
                  style={{ color: isDark ? '#ffffff' : '#232323' }}
                >
                  {item.stat}
                </p>
                <p
                  className="font-heading mb-4 mt-6 text-2xl font-black tracking-tight max-w-[150px]"
                  style={{ color: isDark ? '#ffffff' : "#0F172A" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-md leading-relaxed"
                  style={{ color: isDark ? '#ffffff' : "#454545" }}
                >
                  {item.desc}
                </p>
              </div>
            </HomeItem>
          ))}
        </motion.div>

        <HomeReveal variants={homeFadeUp}>
          <Link
            href={future.primaryCta.href}
            className="inline-flex h-10 items-center justify-center px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
            style={{ background: "#0047AB" }}
          >
            {future.primaryCta.label}
          </Link>
        </HomeReveal>
      </div>
    </section>
  );
}
