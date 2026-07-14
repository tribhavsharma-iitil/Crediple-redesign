"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
}

export function AnimatedHeading({
  children,
  className,
  as: Tag = "h2",
  subtitle,
  label,
  align = "center",
}: AnimatedHeadingProps) {
  const { viewportOnce } = useHomeMotion();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "mb-8 md:mb-10",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      {label && (
        <p className="text-xs uppercase tracking-widest text-brand-blue dark:text-dark-body mb-3 font-medium">
          {label}
        </p>
      )}
      <Tag
        className={cn(
          "font-heading text-2xl font-bold text-light-heading sm:text-3xl md:text-4xl dark:text-dark-heading",
          className,
        )}
      >
        {children}
      </Tag>
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-light-body dark:text-dark-body max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
