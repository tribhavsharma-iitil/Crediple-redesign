"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  brandsContent,
  brandsColors,
  type BrandDetail,
} from "@/content/brands";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";
import footerBgDark from "@/assets/about/brands_sub_header.png";

const { brands } = brandsContent;
const C = brandsColors;

function brandId(index: number) {
  return index === 0
    ? "brand-01"
    : `brand-${String(index + 1).padStart(2, "0")}`;
}

function BrandTabBar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const active = brands[activeIndex];

  return (
    <div
      className="sticky top-[5.1rem] z-20 sm:top-22"
      style={{
        background: `url(${footerBgDark.src}) center/cover no-repeat`
      }}

    >
      <div className="mx-auto flex w-full max-w-[1260px] items-center justify-center gap-6 overflow-x-auto hide-scrollbar px-4 py-4 sm:px-6">
        <div className="flex shrink-0 items-center lg:gap-4 gap-2 whitespace-nowrap text-xs sm:text-[14px]">
          {brands.map((brand, i) => (
            <span key={brand.name} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/30">/</span>}
              <a
                href={`#${brandId(i)}`}
                onClick={() => onSelect(i)}
                className="no-underline transition-colors"
                style={{
                  color:
                    i === activeIndex ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                  fontWeight: i === activeIndex ? 600 : 400,
                }}
              >
                {brand.name}
              </a>
            </span>
          ))}
        </div>
        {/* <a
          href={active.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-white no-underline sm:text-sm"
        >
          SEE ALL {active.name.toUpperCase()} BRANDS
          <ArrowRight size={14} />
        </a> */}
      </div>
    </div>
  );
}

function BrandBlock({
  brand,
  index,
  isDark,
  setBlockRef,
}: {
  brand: BrandDetail;
  index: number;
  isDark: boolean;
  setBlockRef: (el: HTMLDivElement | null) => void;
}) {
  const imageLeft = index % 2 === 0;

  return (
    <div
      id={brandId(index)}
      ref={setBlockRef}
      className="scroll-mt-32 sm:scroll-mt-40"
    >
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
        <HomeReveal
          variants={homeFadeUp}
          className={imageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              placeholder="blur"
              quality={100}
              className="h-full w-full !relative"
            />
          </div>
        </HomeReveal>

        <HomeReveal
          variants={homeFadeUp}
          delay={0.08}
          className={imageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"}
        >
          <div
            className="relative flex h-full flex-col lg:py-20 lg:p-12 p-8 gap-2"
            style={{ background: 'transparent' }}
          >
            <div className="mb-12 flex justify-end">
              <a
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center px-8 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: "#0047AB" }}
              >
                Visit {brand.name}
              </a>
            </div>

            <span
              className="mb-3 block h-0.5 w-6 rounded-full"
              style={{ background: isDark ? C.textTagline : C.accentStrong }}
            />

            <h2
              className="font-heading mb-4 text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: isDark ? C.text : "#0F172A" }}
            >
              {brand.name}
            </h2>
            <p
              className="font-heading mb-4 text-base leading-snug font-bold sm:text-lg"
              style={{ color: isDark ? '#ffffff' : C.accentStrong }}
            >
              {brand.tagline}
            </p>

            {brand.description.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mb-6 text-md leading-relaxed last:mb-0"
                style={{ color: isDark ? "#FFFFFFCC" : "#475569" }}
              >
                {para}
              </p>
            ))}

            <div className="border-y my-10 pt-8 border-dashed" style={{ borderColor: isDark ? "#FFFFFF29" : "#E2E8F0" }}>

              <p
                className="mb-6 lg:text-2xl text-xl font-bold"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {brand.featuresTitle}
              </p>
              <div className="mb-6 flex flex-wrap gap-4">
                {brand.deliverables.map((item) => (
                  <span
                    key={item.title}
                    className="border p-3 text-sm font-medium"
                    style={{
                      color: isDark ? "#ffffff" : "#1E293B",
                      // backdropFilter: isDark ? "blur(50px)" : "none",
                      background: isDark ? "#222222" : "#FBFBFB",
                      borderColor: isDark
                        ? "#222222"
                        : "#23232329",
                    }}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
            <p
              className="mb-6 lg:text-2xl text-xl font-bold"
              style={{ color: isDark ? '#ffffff' : C.accentStrong }}
            >
              Core Focus
            </p>
            <p
              className="mb-6 text-md leading-relaxed last:mb-0"
              style={{ color: isDark ? "#D8DEE8" : "#334155" }}
            >
              {brand.coreFocus}
            </p>
          </div>
        </HomeReveal>
      </div>
    </div>
  );
}

export default function BrandsShowcase() {
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = blockRefs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    blockRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brand-showcase"
      className="relative"
      style={{ background: isDark ? C.bg : "#FFFFFF" }}
    >
      <BrandTabBar activeIndex={activeIndex} onSelect={setActiveIndex} />

      <div>
        {brands.map((brand, index) => (
          <BrandBlock
            key={brand.name}
            brand={brand}
            index={index}
            isDark={isDark}
            setBlockRef={(el) => {
              blockRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
