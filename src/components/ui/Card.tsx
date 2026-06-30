"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={cn(
        "rounded-[24px] transition-all duration-300 ease-out",
        isDark
          ? "bg-[#0A1628] border border-white/10 shadow-[0_0_30px_rgba(0,147,255,0.08)]"
          : "bg-white border border-[#0047AB40] shadow-sm",
        hover && "hover:shadow-md hover:scale-[1.02] dark:hover:shadow-[0_0_40px_rgba(0,147,255,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
