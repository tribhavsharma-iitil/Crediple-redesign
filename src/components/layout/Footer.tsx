"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Share2, Mail } from "lucide-react";
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

const BRAND_LINKS = [
  { label: "Iitil", href: "https://www.iitil.com/" },
  { label: "EatsKart", href: "https://eatskart.com/" },
 
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const { isDark } = useTheme();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2.5">
      <h4
        className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.16em]",
          isDark ? "text-[#DCE2F6]" : "text-slate-400"
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
                      : "text-[#64748B] hover:text-[#1E293B]"
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
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10">
        {/* Brand left · Company + Brands right */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="flex flex-col items-start max-w-[300px]">
            <Link
              href="/"
              className="flex items-center shrink-0 no-underline hover:opacity-90"
            >
              <Image
                src={isDark ? credipleDark : credipleLight}
                alt="Crediple"
                height={28}
                className="w-auto h-6 sm:h-7 object-contain"
                priority
              />
            </Link>

            <p
              className={cn(
                "text-[12px] mt-2 tracking-wide",
                isDark ? "text-[#C3C6D7]" : "text-[#475569]"
              )}
            >
              A{" "}
              <span
                className={cn(
                  "font-bold",
                  isDark ? "text-white" : "text-[#0F172A]"
                )}
              >
                YAKA
              </span>{" "}
              Enterprise
            </p>

            <p
              className={cn(
                "text-[12px] leading-relaxed mt-2",
                isDark ? "text-[#C3C6D7]" : "text-[#64748B]"
              )}
            >
              Precision in Excellence. The holding company for the next era of
              enterprise technology.
            </p>

            <div className="flex gap-2.5 mt-4">
              <a
                href="mailto:hello@crediple.com"
                aria-label="Email"
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors border",
                  isDark
                    ? "bg-[#0E1628] border-white/10 text-[#C3C6D7] hover:text-[#DCE2F6]"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
                )}
              >
                <Mail size={13} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div className="flex gap-10 sm:gap-14 lg:gap-20 shrink-0">
            <LinkColumn title="Company" links={COMPANY_LINKS} />
            <LinkColumn title="Brands" links={BRAND_LINKS} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-8">
          <p
            className={cn(
              "text-[11px]",
              isDark ? "text-[#C3C6D7]" : "text-[#94A3B8]"
            )}
          >
            © 2024 All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/legal"
              className={cn(
                "text-[11px] no-underline transition-colors",
                isDark
                  ? "text-[#C3C6D7] hover:text-[#DCE2F6]"
                  : "text-[#94A3B8] hover:text-slate-700"
              )}
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal"
              className={cn(
                "text-[11px] no-underline transition-colors",
                isDark
                  ? "text-[#C3C6D7] hover:text-[#DCE2F6]"
                  : "text-[#94A3B8] hover:text-slate-700"
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
