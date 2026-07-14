"use client";

import Image from "next/image";
import Link from "next/link";
import { solutionsContent, solutionsColors, homeLight } from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeScaleIn } from "@/lib/animations";
import cardBg from "@/assets/gradient.png";

const { cta } = solutionsContent;
const C = solutionsColors;

export default function SolutionsCta() {
  const { isDark } = useTheme();

  return (
    <section
      className="relative overflow-hidden section-cta-end"
      style={{ background: isDark ? C.bg : homeLight.bg }}
    >
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeScaleIn}>
          <div
            className="relative overflow-hidden rounded-2xl section-card-py px-4 text-center sm:rounded-[28px] sm:px-6 md:px-16"
            style={{
              backgroundColor: "#050B18",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
            >
              <Image
                src={cardBg}
                alt=""
                fill
                sizes="(max-width: 1260px) 100vw, 1260px"
                className="object-cover object-center opacity-90"
                priority={false}
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background: `
                  radial-gradient(ellipse 45% 55% at 12% 88%, rgba(70, 50, 140, 0.28) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 50% at 90% 12%, rgba(47, 128, 237, 0.18) 0%, transparent 70%)
                `,
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(160, 190, 240, 0.14) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(160, 190, 240, 0.14) 1px, transparent 1px)
                `,
                backgroundSize: "52px 52px",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 35%, transparent 78%)",
              }}
            />

            <h2
              className="font-heading relative z-10 mx-auto mb-4 max-w-3xl px-1 text-2xl leading-[1.15] font-bold tracking-tight sm:mb-5 sm:text-3xl md:text-[2.75rem] lg:text-5xl"
              style={{ color: "#FFFFFF" }}
            >
              {cta.title}
            </h2>

            <p
              className="relative z-10 mx-auto mb-8 max-w-2xl px-1 text-[13px] leading-relaxed sm:mb-10 sm:text-sm md:mb-12 md:text-base"
              style={{ color: "#A8B0BC" }}
            >
              {cta.description}
            </p>

            <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={cta.button.href}
                className="inline-flex w-full items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold no-underline transition-opacity hover:opacity-90 sm:w-auto"
                style={{
                  background: "#F0F4FA",
                  color: "#0F172A",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {cta.button.label}
              </Link>
            </div>
          </div>
        </HomeReveal>
      </div>
    </section>
  );
}
