"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import seal from "@/assets/duns-standard-seal.png";

type DunsBadgeProps = {
  className?: string;
  showHeading?: boolean;
  variant?: "card" | "inline" | "footer";
};

export function DunsBadge({
  className = "",
  showHeading = false,
  variant = "card",
}: DunsBadgeProps) {
  const { isDark } = useTheme();
  const isCard = variant === "card";
  const isFooter = variant === "footer";

  return (
    <div className={cn("flex flex-col", className)}>
      {showHeading && !isCard && (
        <p
          className={cn(
            "mb-3 text-[15px] font-bold",
            isDark ? "text-white" : "text-slate-900",
          )}
        >
          Credibility
        </p>
      )}

      <div
        className={cn(
          isCard
            ? cn(
                "flex flex-col rounded-2xl border p-5 sm:p-6",
                isDark
                  ? "border-white/10 bg-[#0B1424]"
                  : "border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
              )
            : isFooter
              ? "flex flex-row items-center gap-4 rounded-xl"
              : "flex flex-col items-start gap-3 rounded-xl",
        )}
      >
        {showHeading && isCard && (
          <p
            className={cn(
              "mb-4 text-[15px] font-bold",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            Credibility
          </p>
        )}

        <div
          className={cn(
            "flex shrink-0 justify-center",
            isFooter ? "items-center self-center" : "items-start",
            isCard
              ? cn(
                  "mb-4 rounded-xl border px-4 py-3",
                  isDark
                    ? "border-white/8 bg-white/[0.03]"
                    : "border-slate-100 bg-slate-50/80",
                )
              : "",
          )}
        >
          <Image
            src={seal}
            alt="D&B D-U-N-S Registered"
            width={114}
            height={97}
            className={cn(
              "w-auto shrink-0",
              isCard ? "h-[72px]" : isFooter ? "h-[52px]" : "h-[76px]",
            )}
          />
        </div>

        <div
          className={cn(
            "min-w-0",
            (isCard || isFooter) && "space-y-1.5",
            isFooter && "border-l pl-4",
            isFooter && (isDark ? "border-white/15" : "border-slate-200"),
          )}
        >
          <p
            className={cn(
              isFooter ? "font-normal text-[13px] leading-relaxed" : "text-sm font-semibold tracking-tight",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            D-U-N-S<sup className="text-[0.65em]">®</sup> Registered
          </p>
          <p
            className={cn(
              "leading-relaxed",
              isFooter ? "text-[13px]" : "text-[13px]",
              isDark ? "text-[#98A0A8]" : "text-slate-500",
            )}
          >
            Cerified on Dun &amp;&nbsp;Bradstreet
          </p>
        </div>
      </div>
    </div>
  );
}
