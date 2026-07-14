"use client";

import { motion, type Variants } from "framer-motion";
import { homeFadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { cn } from "@/lib/utils";

type HomeRevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  /** Extra delay (seconds). On mobile a small baseline delay is added per reveal. */
  delay?: number;
};

/** Scroll-reveal wrapper — mobile gets clearer section-wise stagger/viewport. */
export function HomeReveal({
  children,
  className,
  variants = homeFadeUp,
  stagger = false,
  delay = 0,
}: HomeRevealProps) {
  const { isMobile, fadeUp, stagger: staggerVariants, viewport } =
    useHomeMotion();

  const resolvedVariants = stagger
    ? staggerVariants
    : variants === homeFadeUp
      ? fadeUp
      : variants;

  const mobileBaseline = isMobile && !stagger ? 0.06 : 0;
  const totalDelay = delay + mobileBaseline;

  return (
    <motion.div
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={totalDelay ? { delay: totalDelay } : undefined}
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
  const { fadeUp } = useHomeMotion();
  return (
    <motion.div
      variants={variants === homeFadeUp ? fadeUp : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
