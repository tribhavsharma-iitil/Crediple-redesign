import { fetchAllBlogs } from "@/lib/blogs";

// Emitted as a static file at build time: the slugs that got a pre-rendered
// /blog/[slug]/ page in this build. The client uses it to route posts
// published after the build to /blog/view/ instead of a page that doesn't
// exist yet.
export const dynamic = "force-static";

export async function GET() {
  const blogs = (await fetchAllBlogs()) ?? [];
  return Response.json(blogs.map((blog) => blog.slug));
}
