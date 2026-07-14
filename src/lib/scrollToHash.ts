const PENDING_HASH_KEY = "crediple-pending-hash";

/** Scroll to an element by id / `#hash`. Returns true if the target existed. */
export function scrollToHash(
  hashOrId: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  if (typeof document === "undefined") return false;
  const id = hashOrId.startsWith("#") ? hashOrId.slice(1) : hashOrId;
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;

  if (behavior === "smooth") {
    animateScrollToElement(el);
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
  return true;
}

/**
 * Smooth scroll with a cubic ease-out so hash jumps feel animated
 * (native smooth can be instant/skipped after route changes).
 */
export function animateScrollToElement(
  el: HTMLElement,
  {
    duration = 850,
    offset = 0,
  }: { duration?: number; offset?: number } = {},
): void {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const targetY = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - scrollMarginTop + offset,
  );

  if (prefersReduced || Math.abs(targetY - window.scrollY) < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const delta = targetY - startY;
  const start = performance.now();
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + delta * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/** Normalize path for trailingSlash: true static export */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

export function pathsMatch(
  pathname: string | null | undefined,
  targetPath: string,
): boolean {
  if (!pathname) return false;
  return normalizePath(pathname) === normalizePath(targetPath);
}

export function splitHashHref(href: string): {
  path: string;
  hash: string | null;
} {
  const i = href.indexOf("#");
  if (i === -1) return { path: href || "/", hash: null };
  return {
    path: href.slice(0, i) || "/",
    hash: href.slice(i + 1) || null,
  };
}

export function setPendingHash(hash: string): void {
  try {
    sessionStorage.setItem(PENDING_HASH_KEY, hash);
  } catch {
    /* private mode / blocked storage */
  }
}

export function consumePendingHash(): string | null {
  try {
    const value = sessionStorage.getItem(PENDING_HASH_KEY);
    if (value) sessionStorage.removeItem(PENDING_HASH_KEY);
    return value;
  } catch {
    return null;
  }
}

/** Retry scroll until the target is in the DOM (cross-route mounts). */
export function scrollToHashWhenReady(
  hashOrId: string,
  {
    attempts = 30,
    intervalMs = 50,
    startFromTop = false,
    delayMs = 60,
    onScrolled,
  }: {
    attempts?: number;
    intervalMs?: number;
    /** Reset to top first so the downward animation is visible after route change */
    startFromTop?: boolean;
    delayMs?: number;
    onScrolled?: () => void;
  } = {},
): () => void {
  let count = 0;
  let timer = 0;
  let cancelled = false;
  let didStartFromTop = false;

  const tick = () => {
    if (cancelled) return;

    if (startFromTop && !didStartFromTop) {
      didStartFromTop = true;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    if (scrollToHash(hashOrId, "smooth")) {
      onScrolled?.();
      return;
    }

    if (count >= attempts) return;
    count += 1;
    timer = window.setTimeout(tick, intervalMs);
  };

  timer = window.setTimeout(tick, delayMs);
  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}
