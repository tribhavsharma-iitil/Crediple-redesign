"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { brandExternalLinks } from "@/content/brands";
import { solutionsContent } from "@/content/solutions";
import { cn } from "@/lib/utils";
import { DunsBadge } from "@/components/layout/DunsBadge";
import credipleDark from "@/assets/crediple_dark.png";
import credipleLight from "@/assets/crediple_light.png";
import footerBgDark from "@/assets/home/footer_bg_dark.png";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Brands", href: "/brands" },
  { label: "Contact Us", href: "/contact" },
];

const DOMAIN_LINKS = solutionsContent.domains.items.map((item) => ({
  label: item.title,
  href: item.href,
}));

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal" },
  { label: "Terms of Service", href: "/legal" },
];

export default function Footer() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <footer
      className="relative border-t"
      style={{
        background: isDark
          ? `url(${footerBgDark.src}) center/cover no-repeat`
          : "#FFFFFF",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0",
      }}
    >
      <div className="mx-auto max-w-[1260px] p-8 sm:px-6 md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-20 lg:items-center">
          {/* Brand */}
          <div className="max-w-[420px] shrink-0">
            <Link
              href="/"
              className="inline-flex items-center no-underline hover:opacity-90"
            >
              <Image
                src={isDark ? credipleDark : credipleLight}
                alt="Crediple"
                height={28}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>

            <p
              className={cn(
                "mt-3 text-[12px] tracking-wide",
                isDark ? "text-white" : "text-black",
              )}
            >
              A <span className="font-bold">YAKA</span> Enterprise
            </p>

            <p
              className={cn(
                "mt-3 text-[13px] leading-relaxed",
                isDark ? "text-[#A8B0C4]" : "text-[#64748B]",
              )}
            >
              Precision in Excellence. The holding company for the next era of
              enterprise technology.
            </p>

            <div className="mt-4">
              <DunsBadge variant="footer" className="max-w-[280px]" />
            </div>

          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <div>
              {/* <h4
                className={cn(
                  "mb-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                  isDark ? "text-[#DCE2F6]" : "text-[#0F172B]",
                )}
              >
                Company
              </h4> */}
              <ul className="space-y-2">
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
                          "text-[13px] no-underline transition-colors",
                          isDark
                            ? active
                              ? "text-white"
                              : "text-[#A8B0C4] hover:text-white"
                            : active
                              ? "text-brand-blue"
                              : "text-[#64748B] hover:text-[#0F172A]",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              {/* <h4
                className={cn(
                  "mb-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                  isDark ? "text-[#DCE2F6]" : "text-[#0F172B]",
                )}
              >
                Brands
              </h4> */}
              <ul className="space-y-2">
                {brandExternalLinks.slice(0, 4).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-[13px] no-underline transition-colors",
                        isDark
                          ? "text-[#A8B0C4] hover:text-white"
                          : "text-[#64748B] hover:text-[#0F172A]",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* <h4
                className={cn(
                  "mb-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                  isDark ? "text-[#DCE2F6]" : "text-[#0F172B]",
                )}
              >
                Brands
              </h4> */}
              <ul className="space-y-2">
                {brandExternalLinks.slice(4).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-[13px] no-underline transition-colors",
                        isDark
                          ? "text-[#A8B0C4] hover:text-white"
                          : "text-[#64748B] hover:text-[#0F172A]",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* <h4
                className={cn(
                  "mb-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                  isDark ? "text-[#DCE2F6]" : "text-[#0F172B]",
                )}
              >
                Domain
              </h4> */}
              <ul className="space-y-2">
                {DOMAIN_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[13px] no-underline transition-colors",
                        isDark
                          ? "text-[#A8B0C4] hover:text-white"
                          : "text-[#64748B] hover:text-[#0F172A]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-6 flex flex-col gap-2.5 border-t pt-4 sm:flex-row sm:items-center sm:justify-between",
            isDark ? "border-white/10" : "border-slate-200",
          )}
        >
          <p
            className={cn(
              "text-[12px]",
              isDark ? "text-[#7B8494]" : "text-[#94A3B8]",
            )}
          >
            © {new Date().getFullYear()} Crediple. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* <div className="flex gap-2.5">
              <a
                href="mailto:hello@crediple.com"
                aria-label="Email"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                  isDark
                    ? "border-white/10 bg-[#0E1628] text-[#C3C6D7] hover:text-white"
                    : "border-slate-200 bg-[#EDFAFF] text-[#0F172B] hover:text-slate-900",
                )}
              >
                <Mail size={14} strokeWidth={1.75} />
              </a>
              <a
                href="https://www.linkedin.com/company/iitil-cipl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full  transition-colors",
                  isDark
                    ? "border-white/10 bg-[#0E1628] text-[#C3C6D7] hover:text-white"
                    : "border-slate-200 bg-[#EDFAFF] text-[#0F172B] hover:text-slate-900",
                )}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div> */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    // Already on /legal: same-route Link clicks don't trigger
                    // navigation, so scroll to top manually every time.
                    if (pathname.startsWith("/legal")) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "text-[12px] no-underline transition-colors",
                    isDark
                      ? "text-[#7B8494] hover:text-[#DCE2F6]"
                      : "text-[#94A3B8] hover:text-slate-700",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
