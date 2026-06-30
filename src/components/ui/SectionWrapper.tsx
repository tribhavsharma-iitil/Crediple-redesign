"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { staggerContainer, viewportOnce } from "@/lib/animations";

type SectionBg = "default" | "alt" | "hero" | "dark";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: SectionBg;
}

export function SectionWrapper({
  children,
  className,
  id,
  bg = "default",
}: SectionWrapperProps) {
  const { isDark } = useTheme();

  const bgClass = (() => {
    if (isDark) {
      return "bg-[#020B1A]";
    }
    switch (bg) {
      case "alt":
        return "bg-[#FAF7FF]";
      case "hero":
        return "section-hero-light";
      default:
        return "section-hero-light";
    }
  })();

  return (
    <section
      id={id}
      className={cn(
        "relative py-12 md:py-20 overflow-hidden",
        bgClass,
        isDark && "section-dark-glow",
        className
      )}
    >
      <div className="max-w-[1400px] mx-auto">{children}</div>
    </section>
  );
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </motion.div>
  );
}
