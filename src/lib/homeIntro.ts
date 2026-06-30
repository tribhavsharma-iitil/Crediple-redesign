/**
 * In-memory intro flag — resets on full page reload, persists across client-side navigation.
 */
let homeIntroCompleted = false;

export function isHomeIntroCompleted(): boolean {
  return homeIntroCompleted;
}

export function markHomeIntroCompleted(): void {
  homeIntroCompleted = true;
}

export type HomeIntroPhase = "loading" | "flying" | "ready";

export function getInitialIntroPhase(isHome: boolean): HomeIntroPhase {
  if (!isHome) return "ready";
  if (homeIntroCompleted) return "ready";
  return "loading";
}
