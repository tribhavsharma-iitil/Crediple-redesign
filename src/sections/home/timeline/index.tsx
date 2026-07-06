"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, BarChart3, Zap } from "lucide-react";
import Image from "next/image";
import { TIMELINE } from "@/utils/siteData";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useTheme } from "@/context/ThemeContext";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import card_1 from "@/assets/timeline_bg.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DETAILS: Record<
  string,
  { highlights: string[]; metric?: string; metricLabel?: string }
> = {
  "2018-2019": {
    highlights: [
      "Crediple incorporated to simplify financial access for Indian SMEs and individuals",
      "Core founding team assembled across FinTech, LegalTech & HealthTech domains",
      "Seed funding secured; operations commenced from Udaipur, Rajasthan",
    ],
    metric: "2018",
    metricLabel: "YEAR FOUNDED",
  },
  "2020-2022": {
    highlights: [
      "Deep research driven development of credit improvement methodologies",
      "Structuring service frameworks for credit audit, correction, and score enhancement",
      "Building the initial operational blueprint and service lifecycle design",
    ],
    metric: "Core",
    metricLabel: "Methodology Built",
  },
  "2022-2024": {
    highlights: [
      "Transition from concept to a structured credit services platform ecosystem",
      "Service lines expansion of credit audit, correction, score improvement, and optimisation",
      "Development of training frameworks for credit partners and internal teams",
    ],
  },
  "2025-2026": {
    highlights: [
      "6 years of primary market research across multiple verticals, channels, and customer segments",
      "Development of a multi domain enterprise ecosystem across health, finance, law, technology, data, HR, and property management",
      "Phased launch of multiple brands through structured and controlled market entry",
    ],
  },
};

const ICONS = [Calendar, BarChart3, Zap, Zap];

export default function Timeline() {
  const { isDark } = useTheme();
  const [active, setActive] = useState<number>(0);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Array of refs to keep track of individual timeline block targets
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Existing Track Line Progress Animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true,
          },
        }
      );

      // 2. New Scroll-based Active State Toggling
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        ScrollTrigger.create({
          trigger: item,
          // Triggers when the top of the card hits 55% from the top of the viewport
          start: "top 55%", 
          // Triggers until the bottom of the card leaves 45% from the top of the viewport
          end: "bottom 45%",
          // toggleClass isn't dynamic enough for react state, so we use onToggle
          onToggle: (self) => {
            if (self.isActive) {
              setActive(index);
            }
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper 
      id="timeline" 
      className={cn(isDark ? "bg-[#040814]" : "bg-slate-50/70")}
    >
      <div ref={sectionRef} className="w-full max-w-[1260px] mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            "font-heading font-bold text-3xl md:text-5xl text-center mb-16 tracking-tight",
            isDark ? "text-white" : "text-slate-900"
          )}
        >
          Company History
        </motion.h2>

        <div className="relative pl-10 md:pl-20">
          {/* Central Track Line */}
          <div
            ref={lineRef}
            className="absolute left-[12px] md:left-[28px] top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-[#155DFC] via-[#00D3F3] to-[#155DFC] rounded-full z-0"
          />

          <div className="flex flex-col gap-8">
            {TIMELINE.map((item, i) => {
              const details = TIMELINE_DETAILS[item.period];
              const Icon = ICONS[i] ?? Calendar;
              const isActive = active === i;

              return (
                <div 
                  key={item.period} 
                  ref={(el) => { itemsRef.current[i] = el; }} // Assign individual ref here
                  className="relative"
                >
                  
                  {/* Glowing Circular Border Node */}
                  <div
                    className={cn(
                      "absolute left-[-40px] md:left-[-62px] top-8 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10",
                      isDark 
                        ? "border-[#00D3F3] bg-[#060f21] shadow-[0_0_15px_rgba(0,211,243,0.45)]" 
                        : "border-[#155DFC] bg-white shadow-[0_0_15px_rgba(21,93,252,0.45)]",
                      isActive && (isDark ? "shadow-[0_0_22px_rgba(0,211,243,0.7)]" : "shadow-[0_0_22px_rgba(21,93,252,0.7)]")
                    )}
                  >
                    {/* Inner Core Solid Circle Point */}
                    <div 
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-transform duration-300",
                        isDark ? "bg-[#00D3F3]" : "bg-[#155DFC]",
                        isActive && "scale-125"
                      )}
                    />
                  </div>

                  {/* Removed onMouseEnter from here */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    className="group relative z-10"
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 180, damping: 26 }}
                      className={cn(
                        "rounded-xl border transition-colors duration-300 overflow-hidden shadow-none",
                        isDark 
                          ? "bg-[#0B122099] border-white/[0.06]" 
                          : "bg-white border-[#BEDBFF]",
                        "w-full lg:max-w-xl", 
                        isActive && "lg:max-w-full lg:border-[#155DFC]/40"
                      )}
                    >
                      <div className="flex flex-col lg:flex-row items-stretch justify-between relative min-h-[160px]">
                        
                        {/* Segment 1: Heading Core Block Info */}
                        <div className={cn(
                          "px-6 md:px-8 flex flex-col justify-between shrink-0 w-full lg:w-[380px] transition-all duration-500 ease-out",
                          isActive ? "py-9 md:py-12" : "py-6 md:py-8"
                        )}>
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                                  isDark
                                    ? "bg-white/5 border-white/10 text-[#00D3F3]"
                                    : "bg-[#E0F7F9] border-[#BEDBFF] text-[#155DFC]"
                                )}
                              >
                                <Icon size={22} strokeWidth={2.2} />
                              </div>
                              <div>
                                <h3 className="font-heading font-black text-2xl md:text-3xl text-[#155DFC] tracking-wide">
                                  {item.period}
                                </h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mt-0.5">
                                  {item.tag}
                                </p>
                              </div>
                            </div>

                            <hr className={cn("my-4", isDark ? "border-white/10" : "border-slate-100")} />

                            <p className={cn(
                              "text-sm font-medium leading-relaxed mb-4",
                              isDark ? "text-[#90A1B9]" : "text-[#45556C]"
                            )}>
                              {item.title}
                            </p>
                          </div>

                          {details?.metric && (
                            <div className="mt-auto pt-2">
                              <span
                                className={cn(
                                  "inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                  isDark
                                    ? "bg-white/5 border-white/10 text-[#00D3F3]"
                                    : "bg-[#EFF6FF] border-[#BEDBFF] text-[#155DFC]"
                                )}
                              >
                                {details.metric} {details.metricLabel}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Segment 2: Bulleted Highlights Content List */}
                        <div className={cn(
                          "w-full flex-1 px-6 md:px-8 transition-all duration-500 ease-out self-center",
                          "block opacity-100 h-auto py-6",
                          "lg:hidden lg:opacity-0 lg:max-w-0 lg:overflow-hidden lg:py-0",
                          isActive && "lg:block lg:opacity-100 lg:max-w-3xl lg:py-9"
                        )}>
                          <ul className="space-y-4">
                            {details?.highlights.map((bullet) => (
                              <li
                                key={bullet}
                                className={cn(
                                  "text-xs md:text-sm flex gap-3 font-normal leading-relaxed",
                                  isDark ? "text-[#DCE2F6]" : "text-[#45556C]"
                                )}
                              >
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#155DFC] shrink-0" />
                                <span className="flex-1">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Segment 3: Graphical Image Block */}
                        <div className={cn(
                          "relative min-h-[200px] lg:min-h-full transition-all duration-500 self-stretch overflow-hidden shrink-0",
                          "w-full lg:w-0 lg:opacity-0",
                          isActive && "lg:w-[280px] xl:w-[380px] lg:opacity-100 rounded-r-xl"
                        )}>
                          <Image
                            src={card_1}
                            alt="Timeline illustration"
                            fill
                            className=" object-left"
                            style={{
                              maskImage: "linear-gradient(to right, transparent 0%, black 25%)",
                              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)",
                            }}
                          />
                        </div>

                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}