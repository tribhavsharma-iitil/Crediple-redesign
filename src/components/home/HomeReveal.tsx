"use client";

import { motion, type Variants } from "framer-motion";
import {
  homeFadeUp,
  homeFadeLeft,
  homeFadeRight,
  homeScaleIn,
} from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { cn } from "@/lib/utils";

type HomeRevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  /** Extra delay (seconds). Kept small on mobile to avoid blank waits. */
  delay?: number;
};

/** Map known desktop variants → soft no-opacity mobile counterparts */
function resolveMobileVariants(
  variants: Variants,
  fadeUp: Variants,
  fadeLeft: Variants,
  fadeRight: Variants,
  scaleIn: Variants,
): Variants {
  if (variants === homeFadeUp) return fadeUp;
  if (variants === homeFadeLeft) return fadeLeft;
  if (variants === homeFadeRight) return fadeRight;
  if (variants === homeScaleIn) return scaleIn;
  // Unknown custom variants that use opacity:0 still blink — prefer soft y nudge
  return fadeUp;
}

/** Scroll-reveal wrapper — mobile avoids opacity blinks on scroll. */
export function HomeReveal({
  children,
  className,
  variants = homeFadeUp,
  stagger = false,
  delay = 0,
}: HomeRevealProps) {
  const {
    isMobile,
    fadeUp,
    fadeLeft,
    fadeRight,
    scaleIn,
    stagger: staggerVariants,
    viewport,
  } = useHomeMotion();

  const resolvedVariants = stagger
    ? staggerVariants
    : isMobile
      ? resolveMobileVariants(variants, fadeUp, fadeLeft, fadeRight, scaleIn)
      : variants === homeFadeUp
        ? fadeUp
        : variants;

  return (
    <motion.div
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
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
  const { isMobile, fadeUp, fadeLeft, fadeRight, scaleIn } = useHomeMotion();
  const resolved = isMobile
    ? resolveMobileVariants(variants, fadeUp, fadeLeft, fadeRight, scaleIn)
    : variants === homeFadeUp
      ? fadeUp
      : variants;

  return (
    <motion.div variants={resolved} className={className}>
      {children}
    </motion.div>
  );
}
