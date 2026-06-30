"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HeartPulse,
  BarChart2,
  Scale,
  GraduationCap,
  Building2,
} from "lucide-react";
import { WHO_WE_SERVE } from "@/utils/siteData";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useTheme } from "@/context/ThemeContext";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

// Custom mapping to match Lucide icons exactly to the styles in the provided mockups
const ICONS: Record<string, React.ReactNode> = {
  "bar-chart-2": <BarChart2 size={26} strokeWidth={2} />,
  "heart-pulse": <HeartPulse size={26} strokeWidth={2} />,
  "scale": <Scale size={26} strokeWidth={2} />,
  "building-2": <Building2 size={26} strokeWidth={2} />,
  "graduation-cap": <GraduationCap size={26} strokeWidth={2} />,
};

// Explicit values mapping extracted directly from Screenshot 2026-06-27 193447.png
const BRAND_COUNTS = [
  "12 ACTIVE BRANDS", // FinTech
  "8 ACTIVE BRANDS",  // HealthTech
  "5 ACTIVE BRANDS",  // LegalTech
  "4 ACTIVE BRANDS",  // EduTech
];

export default function WhoWeServe() {
  const { isDark } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  // Safely mapping indices based on layout structure in mockups
  const finTechItem = WHO_WE_SERVE.find(item => item.icon === "bar-chart-2") || WHO_WE_SERVE[1];
  const healthTechItem = WHO_WE_SERVE.find(item => item.icon === "heart-pulse") || WHO_WE_SERVE[0];
  const legalTechItem = WHO_WE_SERVE.find(item => item.icon === "scale") || WHO_WE_SERVE[2];
  const enterpriseItem = WHO_WE_SERVE.find(item => item.icon === "building-2") || WHO_WE_SERVE[5];
  const eduTechItem = WHO_WE_SERVE.find(item => item.icon === "graduation-cap") || WHO_WE_SERVE[4];

  return (
    <SectionWrapper 
      id="serve"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #040814 0%, #081026 50%, #030712 100%)"
          : "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)"
      }}
      className="py-20 md:py-28"
    >
      {/* Header Block */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        viewport={viewportOnce}
        className="text-center mb-16"
      >
        <p className={cn(
          "text-xs font-bold uppercase tracking-[0.2em] mb-3",
          isDark ? "text-slate-500" : "text-slate-400"
        )}>
          WHY US?
        </p>
        <h2
          className={cn(
            "font-heading font-bold text-3xl md:text-5xl tracking-tight",
            isDark ? "text-white" : "text-[#1E293B]"
          )}
        >
          Who We Serve
        </h2>
      </motion.div>

      {/* Grid Canvas Wrapper */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto px-4 md:px-6"
      >
        {/* Row 1: FinTech Card */}
        <motion.div variants={fadeUp}>
          <ServeCard item={finTechItem} footer={BRAND_COUNTS[0]} isDark={isDark} />
        </motion.div>

        {/* Row 1: HealthTech Card */}
        <motion.div variants={fadeUp}>
          <ServeCard item={healthTechItem} footer={BRAND_COUNTS[1]} isDark={isDark} />
        </motion.div>

        {/* Row 1: LegalTech Card */}
        <motion.div variants={fadeUp}>
          <ServeCard item={legalTechItem} footer={BRAND_COUNTS[2]} isDark={isDark} />
        </motion.div>

        {/* Row 2: Enterprise & Corporates (Spans 2 columns wide) */}
        <motion.div variants={fadeUp} className="md:col-span-2">
          <div className={cn(
            "p-8 md:p-10 h-full rounded-[24px] border flex flex-col sm:flex-row gap-8 justify-between items-start sm:items-center transition-all duration-300",
            isDark 
              ? "bg-[#090F1C] border-white/[0.05]" 
              : "bg-white border-[#E2E8F0] shadow-sm shadow-blue-100/40"
          )}>
            <div className="flex-1">
              <div className={cn("mb-5", isDark ? "text-[#3B82F6]" : "text-[#155DFC]")}>
                {ICONS[enterpriseItem.icon]}
              </div>
              <h3
                className={cn(
                  "font-heading font-bold text-xl md:text-2xl mb-3 tracking-tight",
                  isDark ? "text-white" : "text-[#1E293B]"
                )}
              >
                {enterpriseItem.title}
              </h3>
              <p className={cn("text-sm leading-relaxed max-w-xl", isDark ? "text-slate-400" : "text-[#475569]")}>
                {enterpriseItem.desc}
              </p>
            </div>

            {/* Inner Feature Badge Layout block */}
            <div
              className={cn(
                "rounded-[20px] p-6 text-center min-w-[160px] w-full sm:w-auto border transition-all duration-300",
                isDark 
                  ? "bg-white/[0.03] border-white/10" 
                  : "bg-[#F0F7FF] border-[#E2E8F0]"
              )}
            >
              <p
                className={cn(
                  "font-heading font-black text-4xl tracking-tight",
                  isDark ? "text-white" : "text-[#155DFC]"
                )}
              >
                50+
              </p>
              <p className={cn(
                "text-[10px] font-bold uppercase tracking-widest mt-2",
                isDark ? "text-slate-400" : "text-[#155DFC]"
              )}>
                GLOBAL BRANDS
              </p>
            </div>
          </div>
        </motion.div>

        {/* Row 2: EduTech Card */}
        <motion.div variants={fadeUp}>
          <ServeCard item={eduTechItem} footer={BRAND_COUNTS[3]} isDark={isDark} />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

// Reusable standard layout grid card
function ServeCard({
  item,
  footer,
  isDark,
}: {
  item: any;
  footer: string;
  isDark: boolean;
}) {
  return (
    <div className={cn(
      "p-8 h-full flex flex-col rounded-[24px] border transition-all duration-300",
      isDark 
        ? "bg-[#090F1C] border-white/[0.05]" 
        : "bg-white border-[#E2E8F0] shadow-sm shadow-blue-100/40"
    )}>
      <div className={cn("mb-5", isDark ? "text-[#3B82F6]" : "text-[#155DFC]")}>
        {ICONS[item.icon] || <BarChart2 size={26} />}
      </div>
      <h3
        className={cn(
          "font-heading font-bold text-xl mb-3 tracking-tight",
          isDark ? "text-white" : "text-[#1E293B]"
        )}
      >
        {item.title}
      </h3>
      <p className={cn("text-sm leading-relaxed flex-1 mb-6", isDark ? "text-slate-400" : "text-[#475569]")}>
        {item.desc}
      </p>
      <p className={cn(
        "text-[11px] font-bold uppercase tracking-wider",
        isDark ? "text-[#3B82F6]" : "text-[#155DFC]"
      )}>
        {footer}
      </p>
    </div>
  );
}