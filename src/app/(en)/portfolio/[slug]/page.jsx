import { projectMetadata } from "@/lib/seo";
import { projects } from "@/data/projects";
import { PortfolioItem } from "@/views/PortfolioItem";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return projectMetadata(slug, "en");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <PortfolioItem slug={slug} />;
}
