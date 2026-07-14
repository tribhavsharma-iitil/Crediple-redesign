import type { Metadata } from "next";

export const SITE_URL = "https://crediple.com";
export const SITE_NAME = "Crediple";
export const CONTACT_EMAIL = "contact@crediple.com";
export const COMPANY_NAME = "Crediple India Private Limited";
export const COMPANY_ADDRESS =
  "Sattva Knowledge City, Hi-Tech City, Hyderabad 500081, Telangana, India";
export const LAST_UPDATED = "June 2, 2026";
export const OG_IMAGE = "/og-image.png";

type SeoOptions = {
  /** Full document title (bypasses the root `%s | Crediple` template) */
  title: string;
  description: string;
  path?: string;
  keywords?: string | string[];
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
}: SeoOptions): Metadata {
  const keywordList = keywords
    ? Array.isArray(keywords)
      ? keywords
      : [keywords]
    : undefined;

  return {
    title: {
      absolute: title,
    },
    description,
    ...(keywordList ? { keywords: keywordList } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Crediple digital transformation and technology solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
