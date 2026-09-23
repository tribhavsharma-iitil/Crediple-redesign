import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { fetchBlogsPage, type Pagination } from "@/lib/blogs";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BlogList } from "./BlogList";
import BlogHero from "@/sections/blog/hero";

export const metadata: Metadata = createPageMetadata({
  title: "Blog | Crediple",
  description:
    "Insights, updates, and stories from Crediple on credit intelligence, technology, and building scalable brands.",
  path: "/blog/",
});

const PAGE_SIZE = 6;
const EMPTY_PAGINATION: Pagination = {
  page: 1,
  limit: PAGE_SIZE,
  totalItems: 0,
  totalPages: 1,
};

export default async function BlogIndexPage() {
  const initial = await fetchBlogsPage(1, PAGE_SIZE);

  return (
    <>
      <BlogHero />
      <SectionWrapper bg="alt">
        <BlogList
          initialBlogs={initial?.blogs ?? []}
          initialPagination={initial?.pagination ?? EMPTY_PAGINATION}
        />
      </SectionWrapper>
    </>
  );
}
