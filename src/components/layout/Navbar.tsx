"use client";

import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/utils/siteData";
import { useTheme } from "@/context/ThemeContext";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { cn } from "@/lib/utils";

// Asset Imports
import credipleDark from "@/assets/crediple_dark.png";
import credipleLight from "@/assets/crediple_light.png";
import yakaDark from "@/assets/yaka_dark.png";
import yakaLight from "@/assets/yaka_light.png";

const drawerItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const drawerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "w-10 h-10 rounded-[12px] flex items-center justify-center transition-all hover:scale-105 border bg-transparent shrink-0",
        isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-[#020B1A] hover:bg-black/5"
      )}
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-6 md:px-12",
          scrolled
            ? "backdrop-blur-md border-b bg-white/80 dark:bg-black/20 border-[#0047AB40] dark:border-white/10"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto h-16 md:h-[72px] grid grid-cols-2 md:grid-cols-3 items-center relative">
          
          {/* Column 1: Left Brand Area */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center shrink-0 no-underline transition-opacity duration-200 hover:opacity-90">
              <Image
                src={isDark ? credipleDark : credipleLight}
                alt="Crediple Logo"
                height={28}
                className="w-auto h-9 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Column 2: Center Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-bold uppercase tracking-widest no-underline transition-all hover:opacity-80",
                    active
                      ? isDark
                        ? "text-[#DCE2F6]"
                        : "text-brand-blue"
                      : isDark
                        ? "text-dark-body/70"
                        : "text-light-body/70"
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                        isDark ? "bg-[#DCE2F6]" : "bg-brand-blue"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Column 3: Right Desktop Actions Panel */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <div className={cn("h-5 w-px shrink-0", isDark ? "bg-white/20" : "bg-black/10")} />
            
            <ThemeToggle />
            
            <CredipleButton href="/contact" size="sm" className="shrink-0 font-semibold px-5 h-10 rounded-[12px]">
              Contact Us
            </CredipleButton>

            {/* Inline animated flex item instead of absolute overlay */}
            <AnimatePresence mode="popLayout">
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, w: 0, scale: 0.8 }}
                  animate={{ opacity: 1, w: "auto", scale: 1 }}
                  exit={{ opacity: 0, w: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className="hidden xl:flex items-center gap-3 pl-1 overflow-hidden shrink-0 select-none"
                >
                  <div className={cn("h-5 w-px shrink-0", isDark ? "bg-white/20" : "bg-black/10")} />
                  <Image
                    src={isDark ? yakaDark : yakaLight}
                    alt="Yaka Logo"
                    height={20}
                    className="w-auto h-5 object-contain shrink-0"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Layout Controls fallback */}
          <div className="md:hidden flex items-center justify-end gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={cn(
                "w-10 h-10 rounded-[12px] flex items-center justify-center border bg-transparent",
                isDark ? "border-white/10 text-white" : "border-black/10 text-[#020B1A]"
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar System */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] md:hidden flex flex-col p-6 pt-20",
                isDark ? "bg-[#020B1A]" : "bg-white"
              )}
            >
              <motion.nav
                variants={drawerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2"
              >
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.href} variants={drawerItem}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block py-3 px-4 rounded-[12px] text-sm font-medium uppercase no-underline",
                          active
                            ? isDark
                              ? "bg-white/10 text-dark-heading"
                              : "bg-[#EFF6FF] text-brand-blue"
                            : isDark
                              ? "text-dark-body"
                              : "text-light-body"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={drawerItem} className="pt-4">
                  <CredipleButton href="/contact" className="w-full justify-center">
                    Contact Us
                  </CredipleButton>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}