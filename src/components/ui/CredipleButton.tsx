"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

type ButtonVariant = "filled" | "outlined";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  asChild?: boolean;
}

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-6 py-3 text-base",
};

export function CredipleButton({
  variant = "filled",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const { isDark } = useTheme();

  const base =
    "inline-flex items-center justify-center font-semibold rounded-[12px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 no-underline";

  const filled = isDark
    ? "bg-[#B4C5FF] text-[#020B1A]"
    : "btn-light text-white";

  const outlined = isDark
    ? "border border-[#B4C5FF] text-[#B4C5FF] bg-transparent"
    : "border border-[#155DFC] text-[#155DFC] bg-transparent";

  const classes = cn(
    base,
    sizes[size],
    variant === "filled" ? filled : outlined,
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
