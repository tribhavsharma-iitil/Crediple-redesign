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
        "relative overflow-hidden pt-24 pb-[var(--section-py)] select-none px-4 sm:px-6 md:pt-28",
        isDark ? "bg-[#020B1A] section-dark-glow" : "bg-[#F8FAFC]"
      )}
    >
  
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={showYaka ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 right-4 sm:top-10 sm:right-6 xl:top-12 xl:right-12 z-20 pointer-events-none w-20 md:w-28 xl:w-32 aspect-square"
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

      {/* Main Structural Grid with robust layout safe-edges */}
      <div className="max-w-[1260px] mx-auto px-2 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Full layout width on mobile/tablet */}
        <motion.div
          className="col-span-1 lg:col-span-7 flex flex-col items-start text-left relative w-full"
          variants={localFadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Decorative Accent Eyebrow */}
          <div
            className={cn(
              "inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border transition-all duration-300",
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
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {eyebrow}
          </div>

          {/* Unified Monochromatic Header Title */}
          <h1
             className={cn(
               "font-heading font-[700] text-3xl sm:text-4xl md:text-5xl xl:text-6xl mb-6 sm:mb-8 leading-[1.15] md:leading-[1.1] tracking-tight pr-12 sm:pr-0",
               isDark ? "text-[#DCE2F6]" : "text-black"
             )}
          >
            {title} {highlight}
          </h1>

          {/* Description Paragraph */}
          <p
            className="text-base sm:text-lg font-normal leading-relaxed mb-4 max-w-xl text-left"
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

        {/* Right Column: Safely hides the main image completely when switching to a single vertical row */}
        <motion.div
          className="hidden lg:flex lg:col-span-5 w-full justify-center lg:justify-end"
          variants={localFadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative aspect-[4/4] w-full " >
            <Image
              src={img}
              alt="Crediple team collaboration inside ecosystem framework"
              fill
              priority
              sizes="440px"
              className="object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}