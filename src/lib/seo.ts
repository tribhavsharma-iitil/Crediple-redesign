import type { Metadata } from "next";

export const SITE_URL = "https://crediple.com";
export const SITE_NAME = "Crediple";
export const CONTACT_EMAIL = "contact@crediple.com";
export const COMPANY_NAME = "Crediple India Private Limited";
export const COMPANY_ADDRESS =
  "Sattva Knowledge City, Hi-Tech City, Hyderabad 500081, Telangana, India";
export const LAST_UPDATED = "June 2, 2026";

/** Public OG/Twitter share image (1200×630) — must live in /public */
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE = OG_IMAGE_PATH;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  "Crediple — AI-powered digital transformation and technology solutions";

export const DEFAULT_TITLE =
  "AI-Powered Digital Transformation & Technology Solutions | Crediple";

export const DEFAULT_DESCRIPTION =
  "Crediple delivers data intelligence, software development, technology solutions, cloud solutions, artificial intelligence in business, SaaS platforms, and workflow automation.";

export const DEFAULT_KEYWORDS = [
  "Crediple",
  "data intelligence",
  "software development",
  "technology solutions",
  "cloud solutions",
  "artificial intelligence in business",
  "SaaS Companies",
  "workflow automation",
  "industry-specific software",
  "AI & ML",
] as const;

/** Normalize path for trailingSlash: true static export */
export function canonicalPath(path = "/"): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

export function absoluteUrl(path = "/"): string {
  const normalized = canonicalPath(path);
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

export function absoluteAssetUrl(assetPath: string): string {
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${SITE_URL}${path}`;
}

export function buildOgImages(alt = OG_IMAGE_ALT) {
  return [
    {
      url: absoluteAssetUrl(OG_IMAGE_PATH),
      secureUrl: absoluteAssetUrl(OG_IMAGE_PATH),
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt,
      type: "image/png" as const,
    },
  ];
}

type SeoOptions = {
  /** Full document title (bypasses the root `%s | Crediple` template) */
  title: string;
  description: string;
  path?: string;
  keywords?: string | string[];
  /** Optional OG/Twitter image alt override */
  imageAlt?: string;
  noIndex?: boolean;
};

/**
 * Page-level metadata for the static-export site.
 * Uses absolute titles + absolute OG/Twitter image URLs for crawler reliability.
 */
export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
  imageAlt = OG_IMAGE_ALT,
  noIndex = false,
}: SeoOptions): Metadata {
  const keywordList = keywords
    ? Array.isArray(keywords)
      ? keywords
      : [keywords]
    : undefined;
  const canonical = canonicalPath(path);
  const url = absoluteUrl(path);
  const images = buildOgImages(imageAlt);

  return {
    title: {
      absolute: title,
    },
    description,
    ...(keywordList ? { keywords: keywordList } : {}),
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteAssetUrl(OG_IMAGE_PATH)],
    },
  };
}

/** Root / homepage metadata (shared defaults) */
export function createRootMetadata(): Metadata {
  const images = buildOgImages();

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    category: "technology",
    title: {
      default: DEFAULT_TITLE,
      template: "%s | Crediple",
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [...DEFAULT_KEYWORDS],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [absoluteAssetUrl(OG_IMAGE_PATH)],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: false,
    },
    other: {
      "msapplication-TileColor": "#EFF6FF",
    },
  };
}
