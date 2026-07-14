"use client";

import {
  homeFadeUp,
  homeFadeUpMobile,
  homeStagger,
  homeStaggerFast,
  homeStaggerMobile,
  homeStaggerFastMobile,
  homeViewport,
  homeViewportMobile,
  viewportOnce,
} from "@/lib/animations";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Motion presets that only change below the `sm` breakpoint.
 * Desktop / tablet always receive the original configs.
 */
export function useHomeMotion() {
  const isMobile = useIsMobile();

  return {
    isMobile,
    fadeUp: isMobile ? homeFadeUpMobile : homeFadeUp,
    stagger: isMobile ? homeStaggerMobile : homeStagger,
    staggerFast: isMobile ? homeStaggerFastMobile : homeStaggerFast,
    /** Load-animation heroes — always the original snappy stagger */
    heroStagger: homeStagger,
    viewport: isMobile ? homeViewportMobile : homeViewport,
    /** Generic site sections (non-home) — mobile uses friendlier root margin */
    viewportOnce: isMobile
      ? { once: true as const, margin: "40px 0px" as const }
      : viewportOnce,
  };
}
