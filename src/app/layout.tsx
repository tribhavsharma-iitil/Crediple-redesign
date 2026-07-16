import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/context/ThemeContext";
import AppShell from "@/components/layout/AppShell";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  CONTACT_EMAIL,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: "technology",

  title: {
    default:
      "AI-Powered Digital Transformation & Technology Solutions | Crediple",
    template: "%s | Crediple",
  },

  description:
    "Crediple delivers data intelligence, software development, technology solutions, cloud solutions, artificial intelligence in business, SaaS platforms, and workflow automation.",

  alternates: {
    canonical: "/",
  },

  keywords: [
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
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "AI-Powered Digital Transformation & Technology Solutions | Crediple",
    description:
      "Crediple delivers data intelligence, software development, technology solutions, cloud solutions, artificial intelligence in business, SaaS platforms, and workflow automation.",
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
    title:
      "AI-Powered Digital Transformation & Technology Solutions | Crediple",
    description:
      "Crediple delivers data intelligence, software development, technology solutions, cloud solutions, artificial intelligence in business, SaaS platforms, and workflow automation.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "tNSBuJxzv5cBkVxbsQchE7GsfZ5X4CRYPrE4bf4kLGY",
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
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFF6FF" },
    { media: "(prefers-color-scheme: dark)", color: "#020B1A" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: COMPANY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_ADDRESS,
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    areaServed: "IN",
    availableLanguage: ["en"],
  },
  sameAs: [
    "https://www.linkedin.com/company/crediple",
    "https://twitter.com/crediple",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col dark:bg-dark-bg light:bg-white"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          <GoogleAnalytics />
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
