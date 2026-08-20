import type { Metadata } from "next";
import { getBlogPosts } from "@/content/blog";
import { createPageMetadata, DEFAULT_KEYWORDS } from "@/lib/seo";
import BlogHero from "@/sections/blog/hero";
import BlogGrid from "@/sections/blog/grid";

export const metadata: Metadata = createPageMetadata({
    title: "Insights | Crediple",
    description:
        "Explore Crediple's latest insights on digital transformation, technology, and business growth.",
    path: "/blog",
    keywords: [...DEFAULT_KEYWORDS, "blog", "insights", "digital transformation"],
});

export default function BlogPage() {
    const posts = getBlogPosts();
    return (
        <>
            <BlogHero />
            <BlogGrid posts={posts} />
        </>
    );
}
