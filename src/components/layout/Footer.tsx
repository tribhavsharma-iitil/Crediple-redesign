"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import credipleDark from "@/assets/crediple_dark.png";
import credipleLight from "@/assets/crediple_light.png";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Brands", href: "/brands" },
  { label: "Contact Us", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal" },
  { label: "Terms of Service", href: "/legal" },
];

export default function Footer() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <footer
      className="relative"
      style={{ background: isDark ? "#060E1B" : "#F8FAFC" }}
    >
      <div className="mx-auto max-w-[1260px] px-4 py-10 sm:px-6 md:px-8 md:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
          {/* Brand */}
          <div className="flex w-full max-w-none flex-col items-start sm:max-w-[320px]">
            <Link
              href="/"
              className="flex shrink-0 items-center no-underline hover:opacity-90"
            >
              <Image
                src={isDark ? credipleDark : credipleLight}
                alt="Crediple"
                height={28}
                className="h-6 w-auto object-contain sm:h-7"
                priority
              />
            </Link>

            <p
              className={cn(
                "mt-2.5 text-[12px] tracking-wide",
                isDark ? "text-white" : "text-black",
              )}
            >
              A <span className="font-bold">YAKA</span> Enterprise
            </p>

            <p
              className={cn(
                "mt-2 max-w-sm text-[12px] leading-relaxed",
                isDark ? "text-[#C3C6D7]" : "text-[#64748B]",
              )}
            >
              Precision in Excellence. The holding company for the next era of
              enterprise technology.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="mailto:hello@crediple.com"
                aria-label="Email"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                  isDark
                    ? "border-white/10 bg-[#0E1628] text-[#C3C6D7] hover:text-[#DCE2F6]"
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-900",
                )}
              >
                <Mail size={15} strokeWidth={1.75} />
              </a>
              <a
                href="https://www.linkedin.com/company/iitil-cipl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                  isDark
                    ? "border-white/10 bg-[#0E1628] text-[#C3C6D7] hover:text-[#DCE2F6]"
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-900",
                )}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div className="w-full sm:w-auto sm:shrink-0 sm:text-right">
            <h4
              className={cn(
                "mb-3 text-[10px] font-semibold uppercase tracking-[0.16em]",
                isDark ? "text-[#DCE2F6]" : "text-slate-400",
              )}
            >
              Company
            </h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1 sm:gap-y-2.5">
              {COMPANY_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex min-h-11 items-center text-[14px] font-normal no-underline transition-colors sm:min-h-0 sm:text-[13px]",
                        isDark
                          ? active
                            ? "text-[#DCE2F6]"
                            : "text-[#C3C6D7] hover:text-[#DCE2F6]"
                          : active
                            ? "text-brand-blue"
                            : "text-[#64748B] hover:text-[#1E293B]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "mt-8 flex flex-col items-center gap-3 border-t pt-6 text-center sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left",
            isDark ? "border-white/10" : "border-slate-200",
          )}
        >
          <p
            className={cn(
              "text-[11px]",
              isDark ? "text-[#C3C6D7]" : "text-[#94A3B8]",
            )}
          >
            © 2018 All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-[11px] no-underline transition-colors",
                  isDark
                    ? "text-[#C3C6D7] hover:text-[#DCE2F6]"
                    : "text-[#94A3B8] hover:text-slate-700",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
