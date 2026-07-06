"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Circle } from "lucide-react";
import { HERO_CONTENT, STATS } from "@/utils/siteData";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { useTheme } from "@/context/ThemeContext";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntroPhase } from "@/components/layout/AppShell";
import {
  fadeUp,
  fadeRight,
  staggerContainer,
  scaleIn,
} from "@/lib/animations";
import home_hero from "@/assets/home_hero.png";
import enterprise_light from "@/assets/enterprise_light.png";
import enterprise_dark from "@/assets/enterprise_dark.png";
import { cn } from "@/lib/utils";

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const display = useCountUp(value, inView);
  const { isDark } = useTheme();

  return (
    <motion.div ref={ref} variants={scaleIn} className="text-left">
      <p
        className={cn(
          "font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight",
          isDark ? "text-[#DCE2F6]" : "text-[#020B1A]"
        )}
      >
        {display}
      </p>
      <p
        className={cn(
          "text-[9px] sm:text-[10px] uppercase tracking-widest font-medium mt-1.5",
          isDark ? "text-dark-body/60" : "text-light-body/60"
        )}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const { isDark } = useTheme();
  const { phase } = useIntroPhase();
  const [showYaka, setShowYaka] = useState(false);

  // Sync internal layout transitions nicely alongside root timings
  useEffect(() => {
    const t = setTimeout(() => setShowYaka(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Structural check: Only show native fallback elements if the flying introduction is completed
  const showStaticLogo = phase === "ready";

  return (
    <section
      id="hero"
      className={cn(
        "relative min-h-[100svh] flex items-center pt-24 md:pt-36 pb-16 overflow-hidden select-none",
        isDark ? "bg-[#020B1A] section-dark-glow" : "bg-[#F8FAFC]"
      )}
    >
      {/* 
        YAKA Brand Logo Target Bounding Box.
        This stays locked in the top-right corner on all screens, matches the anchor target layout coordinates 
        perfectly, and avoids duplication issues by rendering purely when phase === "ready".
      */}
      <div 
        id="yaka-logo-anchor" 
        className="absolute top-20 md:top-24 right-4 md:right-6 xl:right-12 z-20 w-20 md:w-28 xl:w-32 aspect-square pointer-events-none"
      >
        {showStaticLogo && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={showYaka ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Image
              src={isDark ? enterprise_dark : enterprise_light}
              alt="A YAKA Enterprise"
              fill
              priority
              sizes="(max-w-768px) 80px, (max-w-1200px) 112px, 128px"
              className="object-contain"
            />
          </motion.div>
        )}
      </div>

      {isDark && (
        <div
          aria-hidden
          className="absolute right-0 top-1/4 w-[600px] h-[600px] pointer-events-none z-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(21,93,252,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      )}

      {/* Main Structural Layout Wrapper providing custom clean gaps for fluid sizing */}
      <div className="w-full max-w-[1260px] sm:px-10 md:px-10 lg:px-10 xl:px-0 mt-6 md:mt-10 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Text/Actions Column block */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 col-span-1 lg:col-span-7 xl:col-span-7 max-w-2xl lg:max-w-none w-full"
          >
            {/* Dynamic Segment Capsule */}
            <motion.div variants={fadeUp} className="w-fit">
              <span
                className={cn(
                  "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border transition-all duration-300",
                  isDark
                    ? "border-[#B4C5FF15] text-[#94A3B8]"
                    : "border-[#3B82F620] text-[#2563EB]"
                )}
                style={{
                  background: isDark
                    ? "#B4C5FF1A"
                    : "linear-gradient(90deg, #DBEAFE 0%, #CEFAFE 100%)",
                }}
              >
                <Circle size={5} className={cn("fill-current", isDark ? "text-brand-blue" : "text-[#2563EB]")} />
                Unified Digital Ecosystem
              </span>
            </motion.div>

            {/* Core Header Title */}
            <motion.h1
              variants={fadeUp}
              className={cn(
                "font-heading font-[900] text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.15] md:leading-[1.1] tracking-tight pr-12 sm:pr-0",
                isDark ? "text-[#DCE2F6]" : "text-black"
              )}
            >
              One Holding. <br className="hidden sm:inline" />
              Multiple Innovations.
            </motion.h1>

            {/* Description Text */}
            <motion.p
              variants={fadeUp}
              className={cn(
                "text-sm md:text-md lg:text-lg max-w-xl leading-relaxed font-normal opacity-85",
                isDark ? "text-[#94A3B8]" : "text-[#475569]"
              )}
            >
              Crediple unifies innovative companies across healthcare, finance,
              legal technology, education, and AI into one powerful digital
              ecosystem.
            </motion.p>

            {/* Strategy Call To Actions */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <CredipleButton href="/brands" className="px-8 h-12 rounded-[12px] font-semibold shadow-sm text-center justify-center">
                Explore Brands
              </CredipleButton>
              
              <CredipleButton
                variant="outlined"
                href="/contact"
                className={cn(
                  "px-8 h-12 rounded-[12px] font-semibold text-center justify-center border bg-transparent transition-all",
                  isDark 
                    ? "border-white/10 text-white hover:bg-white/5" 
                    : "border-black/10 text-[#020B1A] hover:bg-black/5"
                )}
              >
                Schedule Consultation
              </CredipleButton>
            </motion.div>

            {/* Continuous Stat Counter Track */}
            <motion.div
              variants={staggerContainer}
              className={cn(
                "grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 pt-6 mt-4 border-t",
                isDark ? "border-white/10" : "border-black/5"
              )}
            >
              <StatItem value="50+" label="Global Brands" />
              <StatItem value="10K+" label="Happy Clients" />
              <StatItem value="25+" label="Active Countries" />
            </motion.div>
          </motion.div>

          {/* Right Layout Image Column block: Kept completely hidden until lg breakpoint to avoid wrapping row collisions */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex lg:col-span-5 xl:col-span-5 w-full justify-center lg:justify-end"
          >
            <div className="relative aspect-[4/4] w-full max-w-[440px]">
              <Image
                src={home_hero}
                alt="Crediple team collaboration inside ecosystem framework"
                fill
                sizes="440px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}