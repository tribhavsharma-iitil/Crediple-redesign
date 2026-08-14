import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostById, getBlogPosts } from "@/content/blog";
import { createPageMetadata, DEFAULT_KEYWORDS } from "@/lib/seo";
import BlogPostView from "@/sections/blog/postView";

interface BlogPageParams {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return getBlogPosts().map((post) => ({ id: post.id }));
}

export async function generateMetadata(
    { params }: BlogPageParams,
): Promise<Metadata> {
    const { id } = await params;
    const post = getBlogPostById(id);
    if (!post) return { title: "Not Found" };

    return createPageMetadata({
        title: `${post.title} | Crediple Insights`,
        description: post.description,
        keywords: [...DEFAULT_KEYWORDS, post.category, "blog", "insights"],
        path: `/blog/${id}`,
    });
}

export default async function BlogPostPage({ params }: BlogPageParams) {
    const { id } = await params;
    const post = getBlogPostById(id);
    if (!post) {
        notFound();
    }

    const relatedPosts = getBlogPosts();

    return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
