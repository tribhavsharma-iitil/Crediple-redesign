"use client";

import Link from "next/link";

import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeUp, homeFadeLeft } from "@/lib/animations";
import { BlogList } from "@/app/blog/BlogList";
import { fetchBlogsPage, type Pagination } from "@/lib/blogs";
import { useEffect, useState } from "react";
import { homeContent } from "@/content/home";

const PAGE_SIZE = 3;

const EMPTY_PAGINATION: Pagination = {
  page: 1,
  limit: PAGE_SIZE,
  totalItems: 0,
  totalPages: 1,
};

export default function Insights() {
  const { isDark } = useTheme();

  const { insights } = homeContent;

  const [blogs, setBlogs] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination>(EMPTY_PAGINATION);

  useEffect(() => {
    const loadBlogs = async () => {
      const result = await fetchBlogsPage(1, PAGE_SIZE);

      setBlogs(result?.blogs ?? []);
      setPagination(result?.pagination ?? EMPTY_PAGINATION);
    };

    loadBlogs();
  }, []);

  return (
    <section
      id="insights"
      className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
      style={{ background: isDark ? "#000000" : "white" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end md:mb-16">
          <HomeReveal variants={homeFadeLeft} className="flex-1">
            <h2
              className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: isDark ? "#FFFFFF" : "var(--foreground)",
              }}
            >
              {insights.title}
            </h2>

            <p
              className="mt-3 text-left text-sm font-medium sm:text-base"
              style={{
                color: isDark ? "#FFFFFF" : "var(--foreground)",
              }}
            >
              {insights.subtitle}
            </p>
          </HomeReveal>

          <HomeReveal variants={homeFadeUp}>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap px-8 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
                style={{
                  background: isDark ? "#FFFFFF" : "#0047AB",
                  color: isDark ? "#0047AB" : "#FFFFFF",
                }}
              >
                {insights.ctaLabel}
              </Link>
            </div>
          </HomeReveal>
        </div>

        <BlogList initialBlogs={blogs} initialPagination={pagination} showPagination={false} />
      </div>
    </section>
  );
}
