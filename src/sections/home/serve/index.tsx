"use client";

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

export default function WhoWeServe() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="serve"
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
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4"
          style={{
            background: isDark ? C.border : homeLight.border,
            borderColor: isDark ? C.border : homeLight.border,
          }}
        >
          {serve.items.map((item) => (
            <HomeItem key={item.title} variants={homeFadeUp} className="">
              <Link
                href={item.href}
                className="group relative block aspect-[3/4] h-full w-full overflow-hidden no-underline"
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
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                    {item.title} test
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/75 line-clamp-3 sm:text-[16px]">
                    {item.short}
                  </p>
                </div>
              </Link>
            </HomeItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
