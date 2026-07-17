import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us | Crediple",
  description:
    "Contact Crediple for digital transformation, software development & enterprise technology solutions in healthcare, finance & legal. Book a consultation.",
  keywords: "Contact Us",
  path: "/contact/",
});

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
