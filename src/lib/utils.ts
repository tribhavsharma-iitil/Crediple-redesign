import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Appends the current theme as a `?theme=` query param so a linked-out
 * brand site (separate domain, own localStorage) can open in the same theme.
 */
export function withTheme(href: string, isDark: boolean) {
  const theme = isDark ? "dark" : "light";
  try {
    const url = new URL(href);
    url.searchParams.set("theme", theme);
    return url.toString();
  } catch {
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}theme=${theme}`;
  }
}