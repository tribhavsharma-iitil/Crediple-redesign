"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import enterprise_light from "@/assets/enterprise_light.png";
import enterprise_dark from "@/assets/enterprise_dark.png";

// ── FIXED LOCAL ANIMATION VARIANTS ──────────────────────────────────────────
const localFadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
  },
};

const localFadeRight: Variants = {
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
  img: string | StaticImageData;
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
      {/* 
        YAKA Logo: Positioned at the top right side.
        Reduced dimensions and optimized bounding spaces prevent overlapping with the content below.
      */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={showYaka ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="absolute top-10 right-4 md:top-12 md:right-6 xl:right-12 z-20 hidden md:block pointer-events-none"
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

      {/* Main Structural Grid aligned to max-w-[1260px] */}
      <div className="max-w-[1260px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Content Text and CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left relative w-full"
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

          {/* Unified Monochromatic Header Title */}
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

        {/* Right Column: Matched sizes and aspect ratios from home page hero layout */}
        <motion.div
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          variants={localFadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative rounded-[24px] md:rounded-[28px] overflow-hidden aspect-[4/5] w-full max-w-[440px] shadow-2xl border" style={{ borderColor: "var(--border-subtle)" }}>
            <Image
              src={img}
              alt="Crediple team collaboration inside ecosystem framework"
              fill
              priority
              sizes="(max-w-1024px) 100vw, 440px"
              className="object-cover object-center transform scale-100 hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            
            {/* Interactive Node Map Glassmorphic Overlay */}
            <div
              className={cn(
                "absolute bottom-4 right-4 left-4 sm:left-auto px-4 py-2.5 rounded-[16px] text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center justify-between sm:justify-start gap-3.5 border transition-colors duration-300",
                isDark
                  ? "bg-black/40 text-white/90 border-white/10"
                  : "bg-white/70 text-[#020B1A] border-black/5"
              )}
            >
              <div className="flex items-center isolate -space-x-1.5 pointer-events-none select-none">
                {["H", "F", "L"].map((c, index) => (
                  <div
                    key={c}
                    className={cn(
                      "w-5 h-5 rounded-full text-[9px] font-extrabold flex items-center justify-center border shrink-0 shadow-sm",
                      isDark 
                        ? "bg-[#1E293B] text-[#38BDF8] border-[#020B1A]" 
                        : "bg-[#EFF6FF] text-[#2563EB] border-white"
                    )}
                    style={{ zIndex: 10 - index }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <span className="font-semibold tracking-wider opacity-90 text-[10px]">Interactive Node Map</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}