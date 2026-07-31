"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { homeContent, homeColors, homeLight } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp, homeFadeLeft, homeScaleIn } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import ctaBg from "@/assets/gradient.png";

const { testimonials, cta } = homeContent;
const C = homeColors;

/** Sampled from Home.pdf testimonials frame */
const T = {
  bg: "#03081A",
  card: "#0B1324",
  quote: "#F4F6FA",
  muted: "#7B8494",
} as const;

export default function Testimonials() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();
  const items = testimonials.items;
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const videoNode = videoRef.current;

    if (!sectionNode || !videoNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            videoNode.play().catch(() => undefined);
          }, 1200);
        } else {
          videoNode.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <section
        ref={sectionRef}
        id="testimonials"
        className="relative section-py overflow-hidden"
        style={{ background: isDark ? '#000000' : '#FFFFFF' }}
      >
        <div className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10 w-full">
            <h2
              className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
            >
              {testimonials.title}
            </h2>
            <p
              className="mt-3 text-left text-sm sm:text-base"
              style={{ color: isDark ? '#FFFFFF' : '#454545CC' }}
            >
              {testimonials.subtitle}
            </p>
          </HomeReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-0 overflow-hidden border sm:grid-cols-3 "
            style={{
              background: isDark ? 'transparent' : homeLight.border,
              borderColor: isDark ? C.border : homeLight.border,
              backdropFilter: isDark ? "blur(104px)" : "none",
              WebkitBackdropFilter: isDark ? "blur(104px)" : "none",
            }}
          >
            {isDark && (
              <video
                ref={videoRef}
                aria-hidden
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 z-0 lg:block hidden w-full object-cover"
                src="/videos/section_bg_effect.mp4"
              />
            )}
            {items.map((item) => (
              <HomeItem key={item.name} variants={homeFadeUp} className="h-full">
                <article
                  className="relative flex h-full flex-col p-6 text-left sm:p-7 border"
                  style={{
                    background: isDark ? 'transparent' : homeLight.bgAlt,
                    backdropFilter: isDark ? "blur(324px)" : "none",
                    WebkitBackdropFilter: isDark ? "blur(324px)" : "none"
                  }}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>

                  <p
                    className="mt-5 flex-1 text-sm leading-relaxed"
                    style={{ color: isDark ? "#FFFFFFCC" : "#454545CC" }}
                  >
                    &ldquo;{item.text}&rdquo;
                  </p>

                  <span
                    className="mt-6 block h-0.5 w-6 rounded-full"
                    style={{ background: C.accentSoft }}
                  />

                  <p
                    className="mt-4 text-sm font-bold"
                    style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: isDark ? T.muted : homeLight.muted }}
                  >
                    {item.role} {item.company}
                  </p>
                </article>
              </HomeItem>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
}
