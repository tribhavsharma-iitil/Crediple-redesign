import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { fetchBlogsPage, type Pagination } from "@/lib/blogs";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BlogList } from "./BlogList";

export const metadata: Metadata = createPageMetadata({
  title: "Blog | Crediple",
  description:
    "Insights, updates, and stories from Crediple on credit intelligence, technology, and building scalable brands.",
  path: "/blog/",
});

const PAGE_SIZE = 3;
const EMPTY_PAGINATION: Pagination = { page: 1, limit: PAGE_SIZE, totalItems: 0, totalPages: 1 };

export default async function BlogIndexPage() {
  const initial = await fetchBlogsPage(1, PAGE_SIZE);

  return (
    <SectionWrapper>
      <div className="px-4">
        <h1
          className="font-heading mb-3 text-3xl font-[800] tracking-tight sm:text-4xl"
          style={{ color: "var(--foreground)" }}
        >
          Latest Insights
        </h1>
        <p className="mb-10 max-w-2xl text-sm sm:text-base opacity-70" style={{ color: "var(--foreground)" }}>
          Explore our latest thinking, stories, and expertise across technology, design, and business transformation.
        </p>
        <BlogList initialBlogs={initial?.blogs ?? []} initialPagination={initial?.pagination ?? EMPTY_PAGINATION} />
      </div>
    </SectionWrapper>
  );
}
