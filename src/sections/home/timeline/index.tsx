"use client";

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
import { motion } from "framer-motion";

const { timeline } = homeContent;
const C = homeColors;

export default function Timeline() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="timeline"
      className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp} className="mb-10 text-center sm:mb-14">
          <h2
            className="font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: isDark ? C.text : homeLight.heading }}
          >
            {timeline.titleBefore}{" "}
            <span style={getHomeTitleAccentStyle(isDark)}>
              {timeline.titleAccent}
            </span>
          </h2>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: isDark ? '#ffffff' : homeLight.muted }}
          >
            {timeline.subtitle}
          </p>
        </HomeReveal>

        <div className="relative">
          {/* Dashed connector: horizontal line across dot centers, one dashed drop per dot */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="pointer-events-none absolute top-[5px] h-0 border-t border-dashed"
              style={{
                left: "12.5%",
                right: "12.5%",
                borderColor: isDark ? '#FFFFFF33' : homeLight.accent,
              }}
            />
            <div className="relative grid grid-cols-4 gap-6">
              {timeline.items.map((item) => (
                <div key={item.period} className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: isDark ? C.accentSoft : homeLight.accent }}
                  />
                  <span
                    aria-hidden
                    className="mt-1 h-10 w-0 border-l border-dashed"
                    style={{ borderColor: isDark ? '#FFFFFF33' : homeLight.accent }}
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6"
          >
            {timeline.items.map((item) => (
              <HomeItem key={item.period} variants={homeFadeUp}>
                <div
                  className="w-full h-full border p-5 sm:p-6"
                  style={{
                    background: isDark ? `transparent` : "#FBFBFB",
                    borderColor: isDark ? C.border : homeLight.border,
                  }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{ color: isDark ? '#0047AB' : homeLight.accent }}
                  >
                    {item.period}
                  </p>
                  <h3
                    className="font-heading mt-2 mb-2 text-2xl font-black tracking-tight"
                    style={{ color: isDark ? C.text : homeLight.heading }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mt-2"
                    style={{ color: isDark ? "#FFFFFFCC" : homeLight.muted }}
                  >
                    {item.highlights.join(" ")}
                  </p>
                </div>
              </HomeItem>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
