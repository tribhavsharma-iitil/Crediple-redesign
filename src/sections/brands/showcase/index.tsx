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
import { withTheme } from "@/lib/utils";
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
      <div className="grid grid-cols-1 items-stretch xl:grid-cols-2">
        <HomeReveal
          variants={homeFadeUp}
          className={imageLeft ? "order-1 xl:order-1" : "order-1 xl:order-2"}
        >
          <div className="relative w-full overflow-hidden">
            <Image
              src={isDark ? brand.imageDark : brand.imageLight}
              alt={brand.name}
              width={1200}
              height={800}
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="block h-auto w-full object-contain"
            />
          </div>
        </HomeReveal>

        <HomeReveal
          variants={homeFadeUp}
          delay={0.08}
          className={imageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"}
        >
          <div
            className="relative flex h-full flex-col px-10 p-8 justify-between"
            style={{ background: 'transparent' }}
          >
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={isDark ? brand.iconDark : brand.icon}
                  alt={`${brand.name} icon`}
                  width={40}
                  height={40}
                  className="h-9 w-auto object-contain sm:h-10"
                />
                <h2
                  className="font-heading mb-2 text-2xl font-black tracking-tight sm:text-3xl font-jakarta"
                  style={{ color: isDark ? C.text : "#0F172A" }}
                >
                  {brand.name}
                </h2>
              </div>
              <a
                href={withTheme(brand.href, isDark)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center px-8 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: "#0047AB" }}
              >
                Visit {brand.name}
              </a>
            </div>
            <p
              className="font-heading mb-2 text-base leading-snug font-bold sm:text-lg"
              style={{ color: isDark ? '#ffffff' : C.accentStrong }}
            >
              {brand.tagline}
            </p>

            {brand.description.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="text-md leading-relaxed mb-0"
                style={{ color: isDark ? "#FFFFFFCC" : "#475569" }}
              >
                {para}
              </p>
            ))}

            <div className="border-y my-6 py-6 border-dashed" style={{ borderColor: isDark ? "#FFFFFF29" : "#E2E8F0" }}>

              <p
                className="mb-4 lg:text-2xl text-xl"
                style={{ color: isDark ? C.text : "#0F172A" }}
              >
                {brand.featuresTitle}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {brand.deliverables.map((item) => (
                  <span
                    key={item.title}
                    className="border p-3 text-sm font-medium text-center"
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
              className="mb-4 lg:text-2xl text-xl"
              style={{ color: isDark ? '#ffffff' : C.accentStrong }}
            >
              Core Focus
            </p>
            <p
              className="mb-4 text-md leading-relaxed last:mb-0"
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
      className="relative max-w-[1800px] max-[1800px]:mx-0 min-[1601px]:mx-auto"
      style={{ background: isDark ? '#000000' : "#FFFFFF" }}
    >
      {/* <BrandTabBar activeIndex={activeIndex} onSelect={setActiveIndex} /> */}

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
