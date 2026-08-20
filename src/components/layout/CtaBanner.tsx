"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";
import { pathsMatch } from "@/lib/scrollToHash";

const TITLE_LINE_1 = "The Values Behind";
const TITLE_LINE_2 = "Every Innovation";
const SUBTITLE =
  "The values that define who we are, how we work, and the impact we create";

export default function CtaBanner() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: isDark ? "#000000" : "#0047AB" }}
    >
      <div className="mx-auto flex w-full max-w-[1260px] flex-col items-start gap-6 px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between">
        <HomeReveal variants={homeFadeUp}>
          <h2 className="font-heading text-left text-2xl text-[#FFFFFF] leading-[1] sm:text-3xl md:text-4xl lg:text-6xl">
            {TITLE_LINE_1}
            <br />
            {TITLE_LINE_2}
          </h2>
          <p className="mt-3 text-sm text-white font-medium sm:text-base">
            {SUBTITLE}
          </p>
        </HomeReveal>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/solutions"
            onClick={() => {
              if (pathsMatch(pathname, "/solutions")) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }
            }}
            className="inline-flex h-11 items-center justify-center whitespace-nowrap px-8 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              background: isDark ? "#0047AB" : "#FFFFFF",
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
