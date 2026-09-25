"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { fetchBlogBySlug, type Blog } from "@/lib/blogs";
import { BlogPost } from "../[slug]/BlogPost";

type State = { status: "loading" } | { status: "ok"; blog: Blog } | { status: "not_found" } | { status: "error" };

export function BlogView() {
  const { isDark } = useTheme();
  const slug = useSearchParams().get("slug") ?? "";
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!slug) {
      setState({ status: "not_found" });
      return;
    }
    setState({ status: "loading" });
    fetchBlogBySlug(slug).then(setState);
  }, [slug]);

  if (state.status === "ok") return <BlogPost key={slug} slug={slug} initialBlog={state.blog} />;

  const headingClass = isDark ? "text-dark-heading" : "text-light-heading";
  const bodyClass = isDark ? "text-dark-body" : "text-light-body";
  const message =
    state.status === "loading"
      ? "Loading…"
      : state.status === "not_found"
        ? "This post is no longer available."
        : "Couldn't load this post. Please try again.";

  return (
    <section className="section-py">
      <div className="max-w-[720px] mx-auto px-4 pt-20 text-center">
        <h1 className={`font-heading text-2xl font-[800] ${headingClass}`}>{message}</h1>
        {state.status !== "loading" && (
          <Link href="/blog" className={`mt-4 inline-block underline ${bodyClass}`}>
            Back to blog
          </Link>
        )}
      </div>
    </section>
  );
}
