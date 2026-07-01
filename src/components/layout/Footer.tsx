"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, Mail } from "lucide-react";
import {
  FOOTER_COL1,
  FOOTER_COL2,
  FOOTER_COL3,
  FOOTER_TAGLINE,
} from "@/utils/siteData";
import { useTheme } from "@/context/ThemeContext";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import credipleDark from "@/assets/crediple_dark.png";
import credipleLight from "@/assets/crediple_light.png";
import Image from "next/image";


function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const { isDark } = useTheme();

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-5">
      <h4
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.15em]",
          isDark ? "text-white" : "text-[#0F172A]"
        )}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => {
          // Define which exact links are allowed to navigate
          const allowedLabels = ["Home", "About Us", "Solutions","Brands", "Contact", "Legal", "Iitil", "Eatskart"];
          const isClickable = allowedLabels.includes(link.label);

          return (
            <li key={link.label + link.href}>
              {isClickable ? (
                /* Active Link */
                <Link
                  href={link.href}
                  {...(link.href.startsWith("https")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "text-[13px] font-medium no-underline transition-colors hover:opacity-100",
                    isDark 
                      ? "text-slate-400 hover:text-white" 
                      : "text-[#64748B] hover:text-[#1E293B]"
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                /* Disabled / Non-clickable Text */
                <span
                  className={cn(
                   "text-[13px] font-medium no-underline transition-colors hover:opacity-100",
                    isDark 
                      ? "text-slate-400 hover:text-white" 
                      : "text-[#64748B] hover:text-[#1E293B]"
                  )}
                >
                  {link.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={cn(
        "relative py-16 md:py-20 overflow-hidden",
        isDark ? "bg-[#040814]" : "bg-[#FBF8FF]"
      )}
    >
      <div className="max-w-[1260px] mx-auto px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8 pb-16"
        >
          {/* Column 1: Main Info Branding Container */}
          <motion.div variants={fadeUp} className="flex flex-col items-start md:col-span-1">
            <Link href="/" className="flex items-center shrink-0 no-underline transition-opacity duration-200 hover:opacity-90">
              <Image
                src={isDark ? credipleDark : credipleLight}
                alt="Crediple Logo"
                height={28}
                className="w-auto h-9 object-contain"
                priority
              />
            </Link>
            
            <p className={cn(
              "text-[13px] font-medium mt-3 tracking-wide",
              isDark ? "text-slate-400" : "text-[#475569]"
            )}>
              A <span className={cn("font-bold", isDark ? "text-white" : "text-[#0F172A]")}>YAKA</span> Enterprise
            </p>
            
            <p className={cn(
              "text-[13px] leading-relaxed mt-4 max-w-xs font-medium",
              isDark ? "text-slate-400" : "text-[#64748B]"
            )}>
              {FOOTER_TAGLINE || "Precision in Excellence. The holding company for the next era of enterprise technology."}
            </p>

            {/* Micro Pill Sharing Actions */}
            <div className="flex items-center gap-2.5 mt-8">
              <a
                href="#"
                aria-label="Share"
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105",
                  isDark
                    ? "bg-white/[0.04] text-slate-400 border border-white/[0.05] hover:text-white"
                    : "bg-[#EFF6FF] text-[#0047AB] hover:opacity-90"
                )}
              >
                <Share2 size={13} strokeWidth={2.5} />
              </a>
              <a
                href="mailto:hello@crediple.com"
                aria-label="Email"
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105",
                  isDark
                    ? "bg-white/[0.04] text-slate-400 border border-white/[0.05] hover:text-white"
                    : "bg-[#EFF6FF] text-[#0047AB] hover:opacity-90"
                )}
              >
                <Mail size={13} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-1 md:ml-20">
            <LinkColumn title="" links={FOOTER_COL1} />
          </div>
          
          {/* Column 3: Brand Links Group A */}
          <div className="md:col-span-1 md:ml-20">
            <LinkColumn title="" links={FOOTER_COL2} />
          </div>

          {/* Column 4: Brand Links Group B */}
          <div className="md:col-span-1 md:ml-20">
            <LinkColumn title="" links={FOOTER_COL3} />
          </div>
        </motion.div>

        {/* Sub-footer Metadata Bottom Bar */}
        <div
          className={cn(
            "pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4",
            isDark ? "border-white/[0.05]" : "border-slate-200/60"
          )}
        >
          <p className={cn(
            "text-[12px] font-medium tracking-wide",
            isDark ? "text-slate-500" : "text-[#94A3B8]"
          )}>
            &copy; 2018 All rights reserved. 
          </p>
          
          <p className={cn(
            "text-[12px] font-medium tracking-wide",
            isDark ? "text-slate-500" : "text-[#94A3B8]"
          )}>
            Crediple India Private Limited (CIPL)
          </p>
        </div>
      </div>
    </footer>
  );
}