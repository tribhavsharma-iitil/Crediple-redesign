"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import enterprise_light from "@/assets/enterprise_light.png";
import enterprise_dark from "@/assets/enterprise_dark.png";

// ── FIXED LOCAL ANIMATION VARIANTS ──────────────────────────────────────────
const localFadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
  },
};

const localFadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
  },
};

interface HeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  img?: string;
  subtitle: string;
  subtitle2?: string;
  cta1?: { label: string; href: string };
  cta2?: { label: string; href: string };
}

export default function Hero({
  eyebrow,
  title,
  highlight,
  img,
  subtitle,
  subtitle2,
  cta1,
  cta2,
}: HeroProps) {
  const { isDark } = useTheme();
  const [showYaka, setShowYaka] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowYaka(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className={cn(
        "relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden select-none",
        isDark ? "bg-[#020B1A] section-dark-glow" : "bg-[#F8FAFC]"
      )}
    >
      {/* Absolute Brand Logo Watermark */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={showYaka ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 md:top-24 right-4 md:right-6 xl:right-12 z-20 hidden md:block"
      >
        <Image
          src={isDark ? enterprise_dark : enterprise_light}
          alt="A YAKA Enterprise"
          width={132}
          height={132}
          priority
        />
      </motion.div>

      {isDark && (
        <div
          aria-hidden
          className="absolute right-0 top-1/4 w-[600px] h-[600px] pointer-events-none z-0 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(21,93,252,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      )}

      {/* Outer bounds max-w-[1400px] with amplified tracking column gaps */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: Content Text and CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={localFadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Decorative Accent Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-6"
            style={{
              background: "var(--icon-accent-bg)",
              color: "var(--icon-accent)",
              border: "1px solid var(--icon-accent-border)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {eyebrow}
          </div>

          {/* Unified Monochromatic Header Title (Black on Light Mode / Light Purple on Dark Mode) */}
          <h1
             className={cn(
                "font-heading font-[700] text-3xl sm:text-4xl md:text-5xl xl:text-6xl mb-8 leading-[1.15] md:leading-[1.1] tracking-tight",
                isDark ? "text-[#DCE2F6]" : "text-black"
              )}
          >
            {title} {highlight}
          </h1>

          {/* Description Paragraph */}
          <p
            className="text-base sm:text-lg md:text-lg font-normal leading-relaxed mb-4 max-w-xl text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
          
          {subtitle2 && (
            <p
              className="text-sm font-normal mb-8 max-w-xl text-left opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              {subtitle2}
            </p>
          )}

          {/* Action Blocks */}
          {(cta1 || cta2) && (
            <div className="flex flex-wrap gap-4 mb-4">
              {cta1 && (
                <CredipleButton href={cta1.href}>
                  {cta1.label}
                </CredipleButton>
              )}
              {cta2 && (
                <CredipleButton variant="outlined" href={cta2.href}>
                  {cta2.label}
                </CredipleButton>
              )}
            </div>
          )}
        </motion.div>

        {/* Right Column: Sleeker, Taller Image Card Workspace Layout */}
        <motion.div
          className="lg:col-span-5 relative w-full h-[450px] sm:h-[550px] lg:h-[600px] max-w-[400px] mx-auto lg:ml-auto lg:mr-0"
          variants={localFadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div
            className="w-full h-full rounded-[32px] overflow-hidden relative shadow-2xl border"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <Image
              src={img}
              alt="Crediple team collaboration inside ecosystem framework"
              fill
              priority
              className="object-cover"
            />
            
            {/* Interactive Node Map Glassmorphic Overlay */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center gap-3 border"
              style={{
                background: "rgba(15, 23, 42, 0.35)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-500/80 border border-white/20 flex items-center justify-center text-[9px] font-bold text-white">
                  H
                </span>
                <span className="w-6 h-6 rounded-full bg-purple-500/80 border border-white/20 flex items-center justify-center text-[9px] font-bold text-white">
                  F
                </span>
                <span className="w-6 h-6 rounded-full bg-cyan-500/80 border border-white/20 flex items-center justify-center text-[9px] font-bold text-white">
                  L
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/90 whitespace-nowrap">
                Interactive Node Map
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}