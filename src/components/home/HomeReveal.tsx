"use client";

import { motion, type Variants } from "framer-motion";
import {
  homeFadeUp,
  homeStagger,
  homeViewport,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type HomeRevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  delay?: number;
};

/** Scroll-reveal wrapper for Home page sections only */
export function HomeReveal({
  children,
  className,
  variants = homeFadeUp,
  stagger = false,
  delay = 0,
}: HomeRevealProps) {
  return (
    <motion.div
      variants={stagger ? homeStagger : variants}
      initial="hidden"
      whileInView="visible"
      viewport={homeViewport}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function HomeItem({
  children,
  className,
  variants = homeFadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
