import { postMetadata } from "@/lib/seo";
import { getPost, getPosts, getSlugs } from "@/lib/blog";
import { BlogPost } from "@/views/BlogPost";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getSlugs("sr");
  // static export needs at least one param; "_" is never linked and 404s
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug, "sr");
  return post ? postMetadata(post) : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPost(slug, "sr");
  if (!post) return null;
  const related = getPosts("sr")
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === post.category) - (a.category === post.category))
    .slice(0, 3);
  return <BlogPost post={post} related={related} />;
}
