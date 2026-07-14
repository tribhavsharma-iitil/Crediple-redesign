"use client";

import { useEffect, useState } from "react";

/** Tailwind `sm` breakpoint — mobile = below 640px */
const MOBILE_MQ = "(max-width: 639px)";

function readIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}

/**
 * True on phones only. Desktop / tablet stay false so existing
 * motion and layout presets are unchanged there.
 * Initialized from matchMedia to avoid a desktop→mobile flash after mount.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(readIsMobile);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
