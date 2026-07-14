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

function LinkColumn({
  title,
  links,
  align = "start",
}: {
  title: string;
  links: { label: string; href: string }[];
  align?: "start" | "end";
}) {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col gap-2.5",
        align === "end" && "items-end text-right",
      )}
    >
      <h4
        className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.16em]",
          isDark ? "text-[#DCE2F6]" : "text-slate-400",
        )}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const external = link.href.startsWith("https");
          const active =
            !external &&
            (link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href));

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(
                  "text-[13px] font-normal no-underline transition-colors",
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
  );
}

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className="relative"
      style={{ background: isDark ? "#060E1B" : "#F8FAFC" }}
    >
      <div className="mx-auto max-w-[1260px] px-4 py-8 sm:px-6 md:px-8 md:py-10">
        {/* Brand left · Company at the end */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-[320px] flex-col items-start">
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
                "mt-2 text-[12px] tracking-wide",
                "text-[#2F80ED] dark:text-[#C3C6D7]",
              )}
            >
              A{" "}
              <span className="font-bold text-[#2F80ED] dark:text-white">
                YAKA
              </span>{" "}
              Enterprise
            </p>

            <p
              className={cn(
                "mt-2 text-[12px] leading-relaxed",
                isDark ? "text-[#C3C6D7]" : "text-[#64748B]",
              )}
            >
              Precision in Excellence. The holding company for the next era of
              enterprise technology.
            </p>

            <div className="mt-4 flex gap-2.5">
              <a
                href="mailto:hello@crediple.com"
                aria-label="Email"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                  isDark
                    ? "border-white/10 bg-[#0E1628] text-[#C3C6D7] hover:text-[#DCE2F6]"
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-900",
                )}
              >
                <Mail size={13} strokeWidth={1.75} />
              </a>
              <a
                href="https://www.linkedin.com/company/iitil-cipl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                  isDark
                    ? "border-white/10 bg-[#0E1628] text-[#C3C6D7] hover:text-[#DCE2F6]"
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-900",
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
            </div>
          </div>

          <div className="shrink-0 sm:ml-auto">
            <LinkColumn title="Company" links={COMPANY_LINKS} align="end" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p
            className={cn(
              "text-[11px]",
              isDark ? "text-[#C3C6D7]" : "text-[#94A3B8]",
            )}
          >
            © 2018 All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/legal"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[11px] no-underline transition-colors",
                isDark
                  ? "text-[#C3C6D7] hover:text-[#DCE2F6]"
                  : "text-[#94A3B8] hover:text-slate-700",
              )}
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[11px] no-underline transition-colors",
                isDark
                  ? "text-[#C3C6D7] hover:text-[#DCE2F6]"
                  : "text-[#94A3B8] hover:text-slate-700",
              )}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
