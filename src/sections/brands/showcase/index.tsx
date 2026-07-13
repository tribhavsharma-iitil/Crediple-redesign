"use client";

import Image from "next/image";
import {
  brandsContent,
  brandsColors,
  type BrandDetail,
} from "@/content/brands";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeFadeRight, homeFadeUp } from "@/lib/animations";

const { brands } = brandsContent;
const C = brandsColors;

function BrandBlock({
  brand,
  index,
}: {
  brand: BrandDetail;
  index: number;
}) {
  const { isDark } = useTheme();
  const imageRight = index % 2 === 0;

  return (
    <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <HomeReveal
          stagger
          className={imageRight ? "order-2 lg:order-1" : "order-2 lg:order-2"}
        >
          <HomeItem variants={imageRight ? homeFadeLeft : homeFadeRight}>
            <p
              className="mb-1.5 text-xs font-medium sm:mb-2 sm:text-sm"
              style={{ color: isDark ? C.textTagline : C.accentStrong }}
            >
              {brand.number}
            </p>
            <h2
              className="font-heading mb-2 break-words text-[1.75rem] font-black tracking-tight sm:mb-3 sm:text-4xl md:text-5xl"
              style={{ color: isDark ? C.text : "#0F172A" }}
            >
              {brand.name}
            </h2>
            <p
              className="font-heading mb-4 max-w-lg text-base leading-snug font-bold sm:mb-5 sm:text-xl md:text-[1.35rem]"
              style={{ color: isDark ? C.textTagline : C.accentStrong }}
            >
              {brand.tagline}
            </p>
            <div
              className="mb-4 h-px w-full max-w-md sm:mb-5"
              style={{
                background: isDark
                  ? "rgba(248,248,248,0.12)"
                  : "rgba(15,23,42,0.1)",
              }}
            />
            {brand.description.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mb-3 max-w-lg text-[13px] leading-relaxed last:mb-0 sm:mb-4 sm:text-sm md:text-[15px]"
                style={{ color: isDark ? "#C8D0DC" : "#475569" }}
              >
                {para}
              </p>
            ))}
          </HomeItem>
        </HomeReveal>

        <HomeReveal
          variants={imageRight ? homeFadeRight : homeFadeLeft}
          delay={0.08}
          className={imageRight ? "order-1 lg:order-2" : "order-1 lg:order-1"}
        >
          <div
            className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:aspect-[5/4] sm:rounded-[20px]"
            style={{
              border: isDark
                ? "1px solid rgba(248,248,248,0.08)"
                : "1px solid #E2E8F0",
            }}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </HomeReveal>
      </div>

      <HomeReveal variants={homeFadeUp} className="mt-8 sm:mt-12 md:mt-14">
        <p
          className="mb-5 font-heading text-lg font-bold sm:mb-6 sm:text-xl"
          style={{ color: isDark ? C.text : "#0F172A" }}
        >
          {brand.featuresTitle}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-y-6 md:grid-cols-5 md:gap-x-6">
          {brand.deliverables.map((item) => (
            <div
              key={item.title}
              className="border-t pt-3 sm:pt-4"
              style={{
                borderColor: isDark
                  ? "rgba(220,226,246,0.28)"
                  : "#CBD5E1",
              }}
            >
              <p
                className="font-heading mb-0 text-[13px] font-bold sm:mb-1.5 sm:text-sm"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {item.title}
              </p>
              <p
                className="mt-1 text-[11px] leading-relaxed sm:mt-0 sm:text-xs"
                style={{
                  color: isDark ? "rgba(220,226,246,0.55)" : "#94A3B8",
                }}
              >
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </HomeReveal>

      <HomeReveal variants={homeFadeUp} className="mt-6 sm:mt-10 md:mt-12">
        <p
          className="mb-2 text-sm font-semibold"
          style={{ color: isDark ? C.textTagline : C.accentStrong }}
        >
          Core Focus
        </p>
        <p
          className="max-w-4xl text-[13px] leading-relaxed sm:text-sm md:text-[15px]"
          style={{ color: isDark ? "#D8DEE8" : "#334155" }}
        >
          {brand.coreFocus}
        </p>
      </HomeReveal>
    </div>
  );
}

export default function BrandsShowcase() {
  const { isDark } = useTheme();

  return (
    <section
      id="brand-showcase"
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <div className="flex flex-col gap-14 sm:gap-20 md:gap-28">
        {brands.map((brand, index) => (
          <BrandBlock key={brand.name} brand={brand} index={index} />
        ))}
      </div>
    </section>
  );
}
