import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogView } from "./BlogView";

// Fallback for posts published after the last build (see blogHref in
// lib/blogs). Not indexed — the canonical /blog/[slug]/ page takes over
// once the site is rebuilt.
export const metadata: Metadata = {
  title: "Blog | Crediple",
  robots: { index: false, follow: true },
};

export default function BlogViewPage() {
  return (
    <Suspense>
      <BlogView />
    </Suspense>
  );
}
