"use client";

import Image from "next/image";
import { aboutContent, aboutColors } from "@/content/about";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeScaleIn } from "@/lib/animations";
import cardBg from "@/assets/gradient.png";

const { closing } = aboutContent;
const C = aboutColors;

export default function AboutClosing() {
  const { isDark } = useTheme();

  return (
    <section
      className="relative pb-16 sm:pb-20 md:pb-24 pt-2 sm:pt-4 overflow-hidden"
      style={{ background: isDark ? C.bg : "#F8FAFC" }}
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6">
        <HomeReveal variants={homeScaleIn}>
          <div
            className="relative overflow-hidden rounded-[24px] sm:rounded-[40px] px-5 py-12 sm:px-12 sm:py-20 md:px-20 md:py-24 text-center"
            style={
              isDark
                ? {
                    backgroundColor: "#050B18",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }
                : {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                  }
            }
          >
            {isDark && (
              <>
                {/* Inner gradient image — same as Home CTA card */}
                <div
                  aria-hidden
                  className="absolute inset-0 z-0 pointer-events-none"
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
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 45% 55% at 12% 88%, rgba(70, 50, 140, 0.28) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 50% at 90% 12%, rgba(47, 128, 237, 0.18) 0%, transparent 70%)
                    `,
                  }}
                />

                <div
                  aria-hidden
                  className="absolute inset-0 z-[1] pointer-events-none"
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
              </>
            )}

            <h2
              className="relative z-10 font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-5 tracking-tight"
              style={{ color: isDark ? "#F0F0F8" : "#0F172A" }}
            >
              {closing.brand}
            </h2>
            <p
              className="relative z-10 font-heading font-bold text-base sm:text-lg md:text-xl leading-snug max-w-2xl mx-auto"
              style={{ color: isDark ? C.textClosing : "#0F172A" }}
            >
              {closing.line}
            </p>
          </div>
        </HomeReveal>

        <p
          className="text-center text-base font-semibold leading-6 mt-8"
          style={{ color: C.textClosing }}
        >
          {closing.copyright}
        </p>
      </div>
    </section>
  );
}
