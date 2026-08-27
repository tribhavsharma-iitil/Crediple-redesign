"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useTheme } from "@/context/ThemeContext";
import { fetchBlogBySlug, type Blog } from "@/lib/blogs";
import { useBlogStream } from "@/lib/useBlogStream";
import { extractHeadings, withHeadingIds } from "@/lib/toc";

function formatDate(publishedAt: string | null) {
  if (!publishedAt) return "";
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function scrollToHeading(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BlogPost({ slug, initialBlog }: { slug: string; initialBlog: Blog }) {
  const { isDark } = useTheme();
  const [blog, setBlog] = useState(initialBlog);
  const [unavailable, setUnavailable] = useState(false);

  const refresh = useCallback(() => {
    fetchBlogBySlug(slug).then((result) => {
      if (result.status === "ok") setBlog(result.blog);
      else if (result.status === "not_found") setUnavailable(true);
      // "error" (network blip, etc.) — keep showing the last known content.
    });
  }, [slug]);

  // Catch up on anything that changed between the last build and this page
  // load, then stay live for as long as the tab is open.
  useEffect(refresh, [refresh]);
  useBlogStream(refresh);

  const headingClass = isDark ? "text-dark-heading" : "text-light-heading";
  const bodyClass = isDark ? "text-dark-body" : "text-light-body";
  const mutedClass = isDark ? "text-white/50" : "text-black/50";
  const dividerClass = isDark ? "text-white/30" : "text-black/30";

  if (unavailable) {
    return (
      <section className="section-py">
        <div className="max-w-[720px] mx-auto px-4 text-center">
          <h1 className={`font-heading text-2xl font-[800] ${headingClass}`}>
            This post is no longer available.
          </h1>
          <Link href="/blog" className={`mt-4 inline-block underline ${bodyClass}`}>
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  const metaItems = [...blog.tags.map((tag) => tag.name), formatDate(blog.publishedAt)].filter(Boolean);
  const headings = useMemo(() => extractHeadings(blog.content || ""), [blog.content]);
  const contentWithIds = useMemo(() => withHeadingIds(blog.content || ""), [blog.content]);
  // Sanitize last, after ids are injected, so the ids survive (DOMPurify
  // allows `id` by default) while any unsafe markup from the CMS is
  // stripped. Pure function of contentWithIds, so build-time (SSG) and
  // client hydration produce identical output — no mismatch.
  const safeContent = useMemo(() => DOMPurify.sanitize(contentWithIds), [contentWithIds]);
  const tocBorderClass = isDark ? "border-white/10" : "border-black/10";

  return (
    <article>
      <div className="max-w-[1260px] mx-auto px-4 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className={`mb-6 flex flex-wrap items-center gap-2 text-sm ${mutedClass}`}>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className={dividerClass}>/</span>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <span className={dividerClass}>/</span>
          <span className={headingClass}>{blog.title}</span>
        </nav>

        <h1
          className={`font-heading mb-4 text-3xl font-[800] tracking-tight sm:text-4xl lg:text-5xl ${headingClass}`}
        >
          {blog.title}
        </h1>

        {metaItems.length > 0 && (
          <div className={`mb-8 flex flex-wrap items-center gap-2 text-sm ${mutedClass}`}>
            {metaItems.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-2">
                {index > 0 && <span className={dividerClass}>/</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {blog.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blog.coverImageUrl}
          alt={blog.title}
          className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[480px]"
        />
      )}

      <div className="max-w-[1260px] mx-auto px-4 py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[21rem_minmax(0,1fr)]">
          {headings.length > 0 && (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <nav
                aria-label="Table of contents"
                className={`rounded-2xl border p-5 ${tocBorderClass} ${isDark ? "bg-white/[0.03]" : "bg-black/[0.02]"}`}
              >
                <p className={`text-xl font-medium tracking-[-0.02em] ${headingClass}`}>Table of contents</p>
                <ol className="mt-5">
                  {headings.map((item, index) => (
                    <li
                      key={item.id}
                      className={`${item.level === 3 ? "pl-4" : ""} ${
                        index < headings.length - 1 ? `border-b ${tocBorderClass}` : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToHeading(item.id)}
                        className={`block w-full py-2.5 text-left text-sm leading-6 transition-colors hover:underline ${bodyClass} hover:text-brand-blue`}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className="min-w-0 max-w-[720px]">
            {blog.excerpt && <p className={`mb-6 text-lg leading-relaxed ${bodyClass}`}>{blog.excerpt}</p>}
            {blog.content?.trim() ? (
              <div
                className="prose prose-lg max-w-none dark:prose-invert
                  prose-headings:font-heading prose-headings:text-light-heading dark:prose-headings:text-dark-heading
                  prose-p:text-light-body dark:prose-p:text-dark-body
                  prose-li:text-light-body dark:prose-li:text-dark-body
                  prose-strong:text-light-heading dark:prose-strong:text-dark-heading
                  prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />
            ) : (
              <p className={`italic ${bodyClass}`}>This post has no content yet.</p>
            )}
            <Link href="/blog" className={`mt-10 inline-block text-sm underline ${bodyClass}`}>
              ← Back to blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
