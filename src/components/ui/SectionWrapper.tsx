"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { staggerContainer } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";

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
      return "bg-[#000000]";
    }
    switch (bg) {
      case "alt":
        return "bg-[#FFFFFF]";
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
        "relative section-py overflow-hidden",
        bgClass,
        isDark && "section-dark-glow",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const { isMobile, viewportOnce } = useHomeMotion();

  return (
    <motion.div
      variants={
        isMobile
          ? {
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.16,
                  delayChildren: 0.1,
                },
              },
            }
          : staggerContainer
      }
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </motion.div>
  );
}
