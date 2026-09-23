"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/context/ThemeContext";
import { fetchBlogsPage, type Blog, type Pagination } from "@/lib/blogs";
import { useBlogStream } from "@/lib/useBlogStream";

function formatDate(publishedAt: string | null) {
  if (!publishedAt) return "";
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogList({
  initialBlogs,
  initialPagination,
  showPagination = true,
}: {
  initialBlogs: Blog[];
  initialPagination: Pagination;
  showPagination?: boolean;
}) {
  const { isDark } = useTheme();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    fetchBlogsPage(page, pagination.limit).then((result) => {
      setLoading(false);
      if (result) {
        setBlogs(result.blogs);
        setPagination(result.pagination);
      }
    });
  }, [page, pagination.limit]);

  // Catch up on anything that changed between the last build and this page
  // load (and whenever the page number changes), then stay live for as
  // long as the tab is open.
  useEffect(refresh, [refresh]);
  useBlogStream(refresh);

  function goToPage(next: number) {
    if (next < 1 || next > pagination.totalPages || next === page || loading) return;
    setLoading(true);
    setPage(next);
  }

  const headingClass = isDark ? "text-dark-heading" : "text-light-heading";
  const bodyClass = isDark ? "text-dark-body" : "text-light-body";
  const dividerClass = isDark ? "border-white/10" : "border-black/10";

  if (!blogs.length) {
    return <p className={bodyClass}>No posts published yet — check back soon.</p>;
  }

  return (
    <div>
      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity ${loading ? "opacity-50" : ""}`}>
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`}>
            <Card className="h-full overflow-hidden p-0">
              {blog.coverImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={blog.coverImageUrl} alt={blog.title} className="h-48 w-full object-cover" />
              )}
              <div className="p-6">
                <h2 className={`font-heading line-clamp-2 text-lg font-semibold ${headingClass}`}>
                  {blog.title}
                </h2>
                {blog.excerpt && (
                  <p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${bodyClass}`}>{blog.excerpt}</p>
                )}
                <div className={`mt-5 flex items-center justify-end gap-1.5 border-t pt-4 text-xs ${dividerClass} ${bodyClass}`}>
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(blog.publishedAt)}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {showPagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1 || loading}
            aria-label="Previous page"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${dividerClass} ${bodyClass} hover:border-brand-blue`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className={`text-sm ${bodyClass}`}>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page >= pagination.totalPages || loading}
            aria-label="Next page"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${dividerClass} ${bodyClass} hover:border-brand-blue`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
