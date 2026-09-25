const API_BASE = (process.env.NEXT_PUBLIC_CMS_API_URL ?? "").replace(/\/$/, "");
const API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY ?? "";

export type BlogTag = { id: string; name: string };

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  tags: BlogTag[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string | null;
};

export type Pagination = { page: number; limit: number; totalItems: number; totalPages: number };

async function publicApiFetch<T>(path: string): Promise<{ status: "ok"; body: T } | { status: "not_found" } | { status: "error" }> {
  if (!API_BASE || !API_KEY) return { status: "error" };
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "X-Api-Key": API_KEY, "ngrok-skip-browser-warning": "true" },
    });
    if (res.status === 404) return { status: "not_found" };
    if (!res.ok) return { status: "error" };
    const body = await res.json().catch(() => null);
    return body ? { status: "ok", body: body as T } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}

/**
 * One page of published blogs for this brand, straight from the CMS's
 * public API. Used both at build time (server component, for SSG + SEO)
 * and in the browser (pagination clicks + live refresh via the stream, so
 * edits show up without a rebuild).
 *
 * Returns null on failure so callers can tell "fetch failed, keep what we
 * have" apart from "fetch succeeded, there are zero published posts."
 */
export async function fetchBlogsPage(
  page: number,
  limit: number
): Promise<{ blogs: Blog[]; pagination: Pagination } | null> {
  const result = await publicApiFetch<{ data: Blog[]; pagination: Pagination }>(
    `/api/v1/public/blogs?page=${page}&limit=${limit}`
  );
  if (result.status !== "ok" || !Array.isArray(result.body?.data)) return null;
  return { blogs: result.body.data, pagination: result.body.pagination };
}

/**
 * Every published blog, across all pages — only needed at build time to
 * enumerate slugs for generateStaticParams. The listing page itself uses
 * fetchBlogsPage so it doesn't have to load everything at once.
 */
export async function fetchAllBlogs(): Promise<Blog[] | null> {
  const PAGE_SIZE = 50;
  const MAX_PAGES = 20; // safety cap, not a real expected ceiling
  const all: Blog[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const result = await fetchBlogsPage(page, PAGE_SIZE);
    if (!result) return all.length ? all : null;
    all.push(...result.blogs);
    if (page >= result.pagination.totalPages || result.blogs.length === 0) break;
  }

  return all;
}

/**
 * A single published blog by slug. Distinguishes "genuinely doesn't exist /
 * not published" (404) from a transient failure, so callers can 404 in the
 * first case and fail open (keep showing the last known content) in the
 * second.
 */
export async function fetchBlogBySlug(
  slug: string
): Promise<{ status: "ok"; blog: Blog } | { status: "not_found" } | { status: "error" }> {
  const result = await publicApiFetch<{ data: Blog }>(`/api/v1/public/blogs/${encodeURIComponent(slug)}`);
  if (result.status === "ok" && result.body?.data) return { status: "ok", blog: result.body.data };
  if (result.status === "not_found") return { status: "not_found" };
  return { status: "error" };
}

let builtSlugsPromise: Promise<Set<string> | null> | null = null;

/**
 * Browser-only: slugs that have a pre-rendered /blog/[slug]/ page in the
 * currently deployed build (from the static /blog/built-slugs.json). Fetched
 * once per page load. Null if it couldn't be loaded.
 */
export function loadBuiltSlugs(): Promise<Set<string> | null> {
  builtSlugsPromise ??= fetch("/blog/built-slugs.json", { cache: "no-store" })
    .then((res) => (res.ok ? res.json() : null))
    .then((slugs) => (Array.isArray(slugs) ? new Set<string>(slugs) : null))
    .catch(() => null);
  return builtSlugsPromise;
}

/**
 * Link target for a post. The static export only has pages for slugs that
 * existed at build time, so posts published since then go to the
 * client-rendered /blog/view/ fallback until the next rebuild. With no
 * manifest (not loaded yet, or failed), assume the static page exists.
 */
export function blogHref(slug: string, builtSlugs: Set<string> | null): string {
  if (!builtSlugs || builtSlugs.has(slug)) return `/blog/${slug}/`;
  return `/blog/view/?slug=${encodeURIComponent(slug)}`;
}

/** URL for the live blog-change SSE stream, or null if not configured. */
export function blogStreamUrl(): string | null {
  if (!API_BASE || !API_KEY) return null;
  return `${API_BASE}/api/v1/public/blogs/stream?apiKey=${encodeURIComponent(API_KEY)}`;
}
