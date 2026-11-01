import { pageMetadata } from "@/lib/seo";
import { PortfolioPage } from "@/views/PortfolioPage";

export const metadata = pageMetadata("portfolio", "sr");

export default function Page() {
  return <PortfolioPage />;
}
