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

import credipleDark from "@/assets/crediple_dark.png";
import credipleLight from "@/assets/crediple_light.png";
import yakaDark from "@/assets/yaka_dark.png";
import yakaLight from "@/assets/yaka_light.png";

const drawerItem = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const drawerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function isLinkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center transition-opacity hover:opacity-70",
        isDark ? "text-white" : "text-[#0F172A]",
      )}
    >
      {isDark ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
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
          "fixed left-4 right-4 z-50 w-full dark:bg-[#FFFFFF14] bg-white top-4 w-auto border"
        )}
        style={{ backdropFilter: "blur(362px)" }}
      >
        <div className="relative md:px-0 px-4 mx-auto grid h-16 max-w-[1200px] grid-cols-2 items-center md:h-[72px] md:grid-cols-3">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="flex shrink-0 items-center no-underline transition-opacity duration-200 hover:opacity-90"
            >
              <Image
                src={isDark ? credipleDark : credipleLight}
                alt="Crediple Logo"
                height={28}
                className="h-7 w-auto object-contain sm:h-8"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav
            className={cn(
              "hidden items-center fle justify-center md:flex gap-4",
            )}
          >
            {NAV_LINKS.map((link, index) => {
              const active = isLinkActive(pathname, link.href);

              return (
                <div key={link.href} className="flex items-center">
                  {index > 0 && (
                    <span
                      aria-hidden
                      className="mx-4 select-none text-md text-[#3C3C3C4D] dark:text-[#FFFFFF4D]"
                    >
                      /
                    </span>
                  )}
                  <span key={link.href} className="flex items-center">
                    <Link
                      href={link.href}
                      className={cn(
                        "relative text-md font-noraml no-underline transition-colors hover:opacity-80",
                        active
                          ? isDark
                            ? "text-white"
                            : "text-[#0047AB]"
                          : isDark
                            ? "text-white/65"
                            : "text-[#475569]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </span>
                </div>

              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center justify-end gap-3 md:flex md:gap-4">
            <ThemeToggle />

            <CredipleButton
              href="/contact"
              size="sm"
              className="h-10 shrink-0 rounded-lg px-5 font-semibold"
            >
              Contact Us
            </CredipleButton>

            <Image
              src={isDark ? yakaDark : yakaLight}
              alt="Yaka"
              height={24}
              className="h-6 w-6 shrink-0 object-contain"
            />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center justify-end gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border bg-transparent",
                isDark
                  ? "border-white/15 text-white"
                  : "border-[#E2E8F0] text-[#0F172A]",
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
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
                "fixed top-0 right-0 bottom-0 z-50 flex w-[min(320px,85vw)] flex-col p-6 pt-20 md:hidden",
                isDark ? "bg-black" : "bg-white",
              )}
            >
              <motion.nav
                variants={drawerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => {
                  const active = isLinkActive(pathname, link.href);

                  return (
                    <motion.div key={link.href} variants={drawerItem}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-lg px-4 py-3 text-sm font-medium no-underline",
                          active
                            ? isDark
                              ? "bg-white/10 text-white"
                              : "bg-[#EFF6FF] text-[#0047AB]"
                            : isDark
                              ? "text-white/70"
                              : "text-[#475569]",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={drawerItem} className="pt-4">
                  <CredipleButton
                    href="/contact"
                    className="w-full justify-center"
                  >
                    Contact Us
                  </CredipleButton>
                </motion.div>
                <motion.div variants={drawerItem} className="flex justify-center pt-6">
                  <Image
                    src={isDark ? yakaDark : yakaLight}
                    alt="Yaka"
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
