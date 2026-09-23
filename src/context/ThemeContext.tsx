"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="crediple-theme"
      disableTransitionOnChange={false}
    >
      <ThemeFromQuery />
      {children}
    </NextThemesProvider>
  );
}

/**
 * Picks up an inbound `?theme=dark|light` (set by another brand site linking
 * here) and applies it, so the theme carries across brand domains.
 */
function ThemeFromQuery() {
  const { setTheme } = useNextTheme();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryTheme = params.get("theme");
      if (queryTheme !== "dark" && queryTheme !== "light") return;

      setTheme(queryTheme);

      params.delete("theme");
      const rest = params.toString();
      const nextUrl =
        window.location.pathname +
        (rest ? `?${rest}` : "") +
        window.location.hash;
      window.history.replaceState(null, "", nextUrl);
    } catch {
      // ignore
    }
  }, [setTheme]);

  return null;
}

export function ThemeScript() {
  const code = `
(function(){
  try {
    var params = new URLSearchParams(window.location.search);
    var queryTheme = params.get('theme');
    var stored = localStorage.getItem('crediple-theme');
    var theme = (queryTheme === 'light' || queryTheme === 'dark')
      ? queryTheme
      : ((stored === 'light' || stored === 'dark') ? stored : 'dark');
    document.documentElement.classList.remove('dark','light');
    document.documentElement.classList.add(theme);
  } catch(e){}
})();
`;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? (resolvedTheme ?? theme ?? "dark") : "dark";

  return {
    theme: current as "dark" | "light",
    isDark: current === "dark",
    toggleTheme: () => setTheme(current === "dark" ? "light" : "dark"),
  };
}
