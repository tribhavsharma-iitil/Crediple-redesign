"use client";

import { solutionsContent } from "@/content/solutions";
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

const { domains } = solutionsContent;


export default function SolutionsDomains() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="domains"
      className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
      style={{ background: isDark ? '#000000' : '#FFFFFF' }}
    >
      <div className="">
        <div className="w-full max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeFadeUp} className="mb-8 text-center sm:mb-10 md:mb-12">
            <h2
              className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: isDark ? "#ffffff" : homeLight.heading }}
            >
              {domains.title}{" "}
              {/* <span style={getHomeTitleAccentStyle(isDark)}>{domains.subtitle}</span> */}
            </h2>
            <p
              className="mt-2 text-sm sm:text-base font-medium"
              style={{ color: isDark ? '#FFFFFF' : homeLight.muted }}
            >
              {domains.subtitle}
            </p>
          </HomeReveal>
        </div>
        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4"
          >
            {domains.items.map((item) => (
              <HomeItem
                key={item.title}
                variants={homeFadeUp}
                className="h-[300px] sm:h-[320px] lg:h-[400px]"
              >
                <div
                  className="group relative block h-full w-full overflow-hidden no-underline"
                  style={{ borderColor: isDark ? '' : homeLight.border }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                    <h3 className="font-heading text-[20px] font-bold text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 lg:text-sm  leading-relaxed text-white/75">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </HomeItem>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
