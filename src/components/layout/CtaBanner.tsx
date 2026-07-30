"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";

const TITLE_LINE_1 = "The Values Behind";
const TITLE_LINE_2 = "Every Innovation";
const SUBTITLE =
  "The values that define who we are, how we work, and the impact we create";

export default function CtaBanner() {
  const { isDark } = useTheme();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: isDark ? "#000000" : "#0047AB" }}
    >
      <div className="mx-auto flex w-full max-w-[1260px] flex-col items-start gap-6 px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between">
        <HomeReveal variants={homeFadeUp}>
          <h2 className="font-heading text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-4xl">
            {TITLE_LINE_1}
            <br />
            {TITLE_LINE_2}
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/75 sm:text-base">
            {SUBTITLE}
          </p>
        </HomeReveal>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
            style={{ background: "rgba(255,255,255,0.16)" }}
          >
            Book Consultation
          </Link>
          <Link
            href="/solutions"
            className="inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              background: isDark ? "#2F80ED" : "#FFFFFF",
              color: isDark ? "#FFFFFF" : "#0047AB",
            }}
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
