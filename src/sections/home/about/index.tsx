"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Shield, Zap, Star } from "lucide-react";
import { ABOUT_MISSION, ABOUT_VISION, CORE_VALUES } from "@/utils/siteData";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/context/ThemeContext";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  award: <Award size={24} strokeWidth={2.2} className="shrink-0" />,
  shield: <Shield size={24} strokeWidth={2.2} className="shrink-0" />,
  zap: <Zap size={24} strokeWidth={2.2} className="shrink-0" />,
  star: <Star size={24} strokeWidth={2.2} className="shrink-0" />,
};

export default function About() {
  const { isDark } = useTheme();
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, viewportOnce);

  return (
    <SectionWrapper bg="hero" id="about">
      <div className="w-full max-w-[1260px] xl:w-[1260px] mx-auto px-6 lg:px-0">
        
        <h2
          className={cn(
            "font-heading font-bold text-center text-4xl md:text-5xl mb-16 tracking-tight",
            isDark ? "text-white" : "text-slate-900"
          )}
        >
          About Us
        </h2>

        {/* Mission / Vision Blocks */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {/* Mission Card */}
          <motion.div variants={fadeLeft}>
            <Card
              className={cn(
                "p-8 md:p-12 text-center rounded-xl transition-all duration-300 h-[280px] md:h-[220px] flex flex-col justify-center border",
                isDark 
                  ? "bg-[#0B122099] border-white/[0.06] shadow-2xl" 
                  : "bg-[#EDFAFF] border-[#BEDBFF] shadow-sm"
              )}
              hover={false}
            >
              <h3
                className={cn(
                  "font-black text-xl md:text-2xl uppercase tracking-widest mb-4",
                  isDark ? "text-white" : "text-slate-900"
                )}
              >
                {ABOUT_MISSION.title}
              </h3>
              <p
                className={cn(
                  "text-xs md:text-sm font-normal leading-relaxed tracking-wide max-w-[520px] mx-auto",
                  isDark ? "text-[#DCE2F6]" : "text-[#45556C]"
                )}
              >
                {ABOUT_MISSION.text}
              </p>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeRight}>
            <Card
              className={cn(
                "p-8 md:p-12 text-center rounded-xl transition-all duration-300 h-[280px] md:h-[220px] flex flex-col justify-center border",
                isDark 
                  ? "bg-[#0B122099] border-white/[0.06] shadow-2xl" 
                  : "bg-[#EDFAFF] border-[#BEDBFF] shadow-sm"
              )}
              hover={false}
            >
              <h3
                className={cn(
                  "font-black text-xl md:text-2xl uppercase tracking-widest mb-4",
                  isDark ? "text-white" : "text-slate-900"
                )}
              >
                {ABOUT_VISION.title}
              </h3>
              <p
                className={cn(
                  "text-xs md:text-sm font-normal leading-relaxed tracking-wide max-w-[520px] mx-auto",
                  isDark ? "text-[#DCE2F6]" : "text-[#45556C]"
                )}
              >
                {ABOUT_VISION.text}
              </p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Section Heading Refined to Match Colors */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className={cn(
            "font-heading font-bold text-lg md:text-xl text-center mb-10 tracking-wide",
            isDark ? "text-[#00D3F3]" : "text-[#155DFC]"
          )}
        >
          Our Core Values
        </motion.h3>

        {/* Core Values Horizontal Flex Grid Layout */}
        <motion.div
          ref={valuesRef}
          variants={staggerContainer}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CORE_VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
            >
              <Card 
                className={cn(
                  "p-6 md:p-8 rounded-xl flex flex-row items-start gap-5 transition-all duration-300 h-[180px] md:h-[140px] border",
                  isDark 
                    ? "bg-[#060f21] border-white/[0.04] shadow-xl" 
                    : "bg-white border-[#BEDBFF] shadow-md shadow-slate-100/30"
                )}
                style={isDark ? { borderTop: "0.8px solid rgba(0, 184, 219, 0.3)" } : undefined}
                hover={false}
              >
                {/* Icon wrapper layout matched directly with row flex container */}
                <div
                  className={cn(
                    "mt-0.5 flex items-center justify-center shrink-0",
                    isDark ? "text-[#00D3F3]" : "text-[#155DFC]"
                  )}
                >
                  {ICON_MAP[val.icon]}
                </div>
                
                {/* Text Content Block */}
                <div className="flex-1 flex flex-col text-left">
                  <h4
                    className={cn(
                      "font-heading font-bold text-sm md:text-base mb-2 tracking-wide",
                      isDark ? "text-[#00D3F3]" : "text-[#155DFC]"
                    )}
                  >
                    {val.title}
                  </h4>
                  <p
                    className={cn(
                      "text-xs md:text-sm font-normal leading-relaxed",
                      isDark ? "text-[#90A1B9]" : "text-[#45556C]"
                    )}
                  >
                    {val.desc}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}