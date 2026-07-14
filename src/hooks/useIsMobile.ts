"use client";

import { useEffect, useState } from "react";

/** Tailwind `sm` breakpoint — mobile = below 640px */
const MOBILE_MQ = "(max-width: 639px)";

/**
 * True on phones only. Desktop / tablet stay false so existing
 * motion and layout presets are unchanged there.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
