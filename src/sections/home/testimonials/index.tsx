"use client";

import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import { TESTIMONIALS } from "@/utils/siteData";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useTheme } from "@/context/ThemeContext";
import { fadeUp, staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

const DISPLAYED = TESTIMONIALS.slice(0, 3);

export default function Testimonials() {
  const { isDark } = useTheme();

  return (
    <div 
      bg="alt"
      className="w-full"
    >
      {/* Testimonials Grid Section */}
      <SectionWrapper id="testimonials" className="py-20 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-[1300px] mx-auto px-4 md:px-6"
        >
          <motion.h2
            variants={fadeUp}
            className={cn(
              "font-heading font-bold text-3xl md:text-5xl text-center tracking-tight",
              isDark ? "text-white" : "text-[#1E293B]"
            )}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className={cn(
              "text-xs font-bold uppercase tracking-[0.2em] text-center mt-4 mb-16 max-w-2xl mx-auto",
              isDark ? "text-slate-500" : "text-slate-400"
            )}
          >
            TRUSTED BY PROFESSIONALS ACROSS HEALTHCARE, FINANCE, LEGAL AND TECH.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISPLAYED.map((item) => (
              <motion.div key={item.name} variants={fadeUp}>
                <div className={cn(
                  "p-8 h-full flex flex-col rounded-[20px] border transition-all duration-300 shadow-none",
                  isDark 
                    ? "bg-[#090F1C] border-white/[0.04]" 
                    : "bg-white border-slate-100 shadow-sm shadow-indigo-100/30"
                )}>
                  {/* Top Header Block matching the screenshot layouts */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className="fill-[#EAB308] text-[#EAB308]"
                        />
                      ))}
                    </div>
                    <span className="text-4xl font-serif font-black leading-none text-[#155DFC] select-none opacity-80">
                      99
                    </span>
                  </div>

                  {/* Main Quote Content Text block */}
                  <p className={cn(
                    "text-sm leading-relaxed flex-1 font-medium",
                    isDark ? "text-slate-400" : "text-[#475569]"
                  )}>
                    &ldquo;{item.text}&rdquo;
                  </p>

                  {/* Identity Footer section block */}
                  <div className="flex items-center gap-4 mt-8 pt-5 border-t border-slate-100/10 dark:border-white/5">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden"
                      style={{
                        background: `${item.accent || '#155DFC'}15`,
                        color: item.accent || '#155DFC',
                        border: `1px solid ${item.accent || '#155DFC'}30`
                      }}
                    >
                      {item.avatar || item.name.charAt(0)}
                    </div>
                    <div>
                      <p className={cn(
                        "font-bold text-sm tracking-tight",
                        isDark ? "text-white" : "text-[#1E293B]"
                      )}>
                        {item.name}
                      </p>
                      <p className={cn(
                        "text-xs font-medium mt-0.5", 
                        isDark ? "text-slate-500" : "text-slate-400"
                      )}>
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Institutional CTA Callout Section */}
      <SectionWrapper className="pb-24 pt-4">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={cn(
              "rounded-[32px] p-10 md:p-16 text-center border relative overflow-hidden transition-all duration-300",
              isDark
                ? "bg-[#070D19] border-white/[0.05] shadow-2xl"
                : "bg-gradient-to-r from-[#00A3C4] via-[#1D4ED8] to-[#2563EB] text-white border-transparent shadow-xl shadow-blue-600/10"
            )}
          >
            <h2 className={cn(
              "font-heading font-bold text-3xl md:text-5xl mb-5 tracking-tight max-w-2xl mx-auto leading-[1.15]",
              isDark ? "text-white" : "text-white"
            )}>
              Ready for Institutional Excellence?
            </h2>
            
            <p className={cn(
              "text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-medium",
              isDark ? "text-slate-400" : "text-white/85"
            )}>
              Join the ecosystem that&apos;s redefining the future of global industry.
              Let&apos;s discuss your next strategic move.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              {isDark ? (
                <>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-[14px] bg-[#93C5FD] text-[#030712] font-bold text-sm hover:bg-[#BFDBFE] transition-colors no-underline shadow-lg shadow-blue-500/10"
                  >
                    Schedule Consultation
                  </a>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] border border-white/20 bg-white/[0.02] text-white font-bold text-sm hover:bg-white/[0.06] transition-colors no-underline"
                  >
                    <Phone size={15} strokeWidth={2.5} />
                    Schedule a Call
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-[14px] bg-white text-[#155DFC] font-bold text-sm hover:bg-slate-50 transition-colors no-underline shadow-md"
                  >
                    Schedule Consultation
                  </a>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] border border-white/30 bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-colors no-underline"
                  >
                    <Phone size={15} strokeWidth={2.5} />
                    Schedule a Call
                  </a>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}