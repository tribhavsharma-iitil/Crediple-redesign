"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";

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
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {label && (
        <p className="text-xs uppercase tracking-widest text-brand-blue dark:text-dark-body mb-3 font-medium">
          {label}
        </p>
      )}
      <Tag
        className={cn(
          "font-heading font-bold text-3xl md:text-4xl text-light-heading dark:text-dark-heading",
          className
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
