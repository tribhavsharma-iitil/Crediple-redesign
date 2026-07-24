"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DiamondNavButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isDark?: boolean;
};

/**
 * Diamond (rotated square) carousel control — matches Brands/Home Figma arrows.
 */
export default function DiamondNavButton({
  children,
  isDark = true,
  className,
  style,
  ...props
}: DiamondNavButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center transition-opacity hover:opacity-80 active:opacity-70 sm:h-9 sm:w-9",
        className,
      )}
      style={style}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-[3px] rotate-45 rounded-[6px] border sm:inset-[2px]"
        style={{
          borderColor: isDark
            ? "rgba(220, 226, 246, 0.55)"
            : "rgba(15, 23, 42, 0.28)",
          background: isDark ? "rgba(255,255,255,0.04)" : "transparent",
          boxShadow: isDark
            ? "0 0 0 1px rgba(47,128,237,0.12)"
            : "0 1px 4px rgba(15,23,42,0.06)",
        }}
      />
      <span className="relative z-10 flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-[15px] sm:[&_svg]:w-[15px]">
        {children}
      </span>
    </button>
  );
}
