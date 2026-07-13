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
        "relative flex h-9 w-9 shrink-0 items-center justify-center transition-opacity hover:opacity-80",
        className,
      )}
      style={style}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-[2px] rotate-45 rounded-[6px] border"
        style={{
          borderColor: isDark
            ? "rgba(220, 226, 246, 0.5)"
            : "rgba(15, 23, 42, 0.22)",
          background: isDark ? "transparent" : "#FFFFFF",
        }}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}
