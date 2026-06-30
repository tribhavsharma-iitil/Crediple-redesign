"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "w-10 h-10 rounded-[12px] flex items-center justify-center transition-transform hover:scale-105",
        isDark ? "bg-white/10 text-white" : "bg-black/10 text-[#020B1A]"
      )}
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
