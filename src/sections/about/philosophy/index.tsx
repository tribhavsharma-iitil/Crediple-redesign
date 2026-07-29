"use client";

import { motion } from "framer-motion";
import { aboutContent, aboutColors } from "@/content/about";
import { homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp, homeFadeLeft } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import weBuildBg from "@/assets/about/we_build_bg.png";


const { philosophy } = aboutContent;
const C = aboutColors;

export default function AboutPhilosophy() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden section-py bg-white dark:bg-black"
    >
      <div className="">
        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10">
            <h2
              className="font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ color: isDark ? '#FFFFFF' : "#0F172A" }}
            >
              {philosophy.titleBefore}{" "}
              <span style={homeTitleAccentStyle}>{philosophy.titleAccent}</span>
            </h2>
            <p
              className="mt-2 text-sm sm:text-base"
              style={{ color: isDark ? '#FFFFFF' : "#64748B" }}
            >
              {philosophy.subtitle}
            </p>
          </HomeReveal>
        </div>


        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-10 grid grid-cols-1 gap-px overflow-hidden border sm:mb-12 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            background: isDark ? C.border : "#E2E8F0",
            borderColor: isDark ? '#232323' : "#E2E8F0",
          }}
        >
          {philosophy.pillars.map((item) => (
            <HomeItem key={item.title} variants={homeFadeUp}>
              <div
                className="h-full p-6 sm:p-7"
                style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
              >
                <span
                  className="text-xs font-bold tracking-[0.14em] uppercase"
                  style={{ color: isDark ? C.textAccentSoft : C.accentStrong }}
                >
                  {item.label}
                </span>
                <h3
                  className="font-heading mt-2 mb-2 text-base font-bold tracking-tight sm:text-lg"
                  style={{ color: isDark ? '#ffffff' : "#0F172A" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDark ? '#FFFFFFCC' : "#64748B" }}
                >
                  {item.desc}
                </p>
              </div>
            </HomeItem>
          ))}
        </motion.div>

        <HomeReveal variants={homeFadeUp}
        >
          <div
            className="px-6 py-4 text-center"
            style={{
              background:
                `url(${weBuildBg.src}) center/cover no-repeat`,
            }}
          >
            <p className="text-lg font-black tracking-tight text-[#FFFFFFCC] font-semibold">
              {philosophy.banner}
            </p>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
