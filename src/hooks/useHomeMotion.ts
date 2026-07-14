"use client";

import {
  homeFadeUp,
  homeFadeUpMobile,
  homeFadeLeft,
  homeFadeLeftMobile,
  homeFadeRight,
  homeFadeRightMobile,
  homeScaleIn,
  homeScaleInMobile,
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
 * Mobile reveals avoid opacity:0 — that caused whole-page blink on scroll.
 */
export function useHomeMotion() {
  const isMobile = useIsMobile();

  return {
    isMobile,
    fadeUp: isMobile ? homeFadeUpMobile : homeFadeUp,
    fadeLeft: isMobile ? homeFadeLeftMobile : homeFadeLeft,
    fadeRight: isMobile ? homeFadeRightMobile : homeFadeRight,
    scaleIn: isMobile ? homeScaleInMobile : homeScaleIn,
    stagger: isMobile ? homeStaggerMobile : homeStagger,
    staggerFast: isMobile ? homeStaggerFastMobile : homeStaggerFast,
    /** Load-animation heroes — always the original snappy stagger */
    heroStagger: homeStagger,
    viewport: isMobile ? homeViewportMobile : homeViewport,
    viewportOnce: isMobile
      ? { once: true as const, margin: "0px 0px -5% 0px" as const }
      : viewportOnce,
  };
}
