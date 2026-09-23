"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({
  className,
  hover = true,
  children,
  ...props
}: CardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={cn(
        "rounded-[24px] transition-all duration-300 ease-out",
        isDark
          ? "bg-[#FFFFFF0A] border border-[#F8F8F81A]"
          : "bg-[#FBFBFB] border border-[#E2E8F0] ",
        hover &&
          "hover:shadow-md hover:scale-[1.02] dark:hover:shadow-[0_0_40px_rgba(0,147,255,0.15)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
