import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/blog";
import { BlogIndex } from "@/views/BlogIndex";

export const metadata = pageMetadata("blog", "en");

export default function Page() {
  return <BlogIndex posts={getPosts("en")} />;
}
