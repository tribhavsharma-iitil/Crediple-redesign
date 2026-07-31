"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { homeColors } from "@/content/home";

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
  style,
  ...props
}: ButtonProps) {
  const { isDark } = useTheme();

  const base =
    "inline-flex items-center justify-center !font-normal !rounded-[0px] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 no-underline !px-8";

  const filled = "text-white hover:opacity-90";

  const outlined = isDark
    ? "border border-[#B4C5FF] text-[#B4C5FF] bg-transparent"
    : "border border-[#1550B4] text-[#1550B4] bg-transparent";

  const classes = cn(
    base,
    sizes[size],
    variant === "filled" ? filled : outlined,
    className
  );

  const filledStyle =
    variant === "filled"
      ? { background: homeColors.bgButton, ...style }
      : style;

  if (href) {
    return (
      <Link href={href} className={classes} style={filledStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} style={filledStyle} {...props}>
      {children}
    </button>
  );
}
