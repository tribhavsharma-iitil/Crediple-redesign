import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Crediple to discuss software development, digital transformation, workflow automation, cloud solutions, and technology consulting.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
