import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import { fetchAllBlogs, fetchBlogBySlug } from "@/lib/blogs";
import { BlogPost } from "./BlogPost";

// Static export has no server to render unlisted params on demand — only
// slugs published as of the last build get a page. New posts appear once
// the site is rebuilt and redeployed.
export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = (await fetchAllBlogs()) ?? [];
  // `output: "export"` fails the entire build if a dynamic route resolves
  // zero params (e.g. before any blog is ever published, or the CMS is
  // unreachable at build time) — keep a harmless placeholder so the build
  // always succeeds; it just 404s like any other unknown slug.
  if (!blogs.length) return [{ slug: "__none__" }];
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchBlogBySlug(slug);

  if (result.status !== "ok") {
    return createPageMetadata({ title: "Blog | Crediple", description: "", path: `/blog/${slug}/` });
  }

  const { blog } = result;
  return createPageMetadata({
    title: blog.metaTitle || `${blog.title} | Crediple`,
    description: blog.metaDescription || blog.excerpt,
    path: `/blog/${slug}/`,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await fetchBlogBySlug(slug);
  if (result.status !== "ok") notFound();

  return <BlogPost slug={slug} initialBlog={result.blog} />;
}
