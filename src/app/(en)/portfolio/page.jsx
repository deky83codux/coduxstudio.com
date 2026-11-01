import { pageMetadata } from "@/lib/seo";
import { PortfolioPage } from "@/views/PortfolioPage";

export const metadata = pageMetadata("portfolio", "en");

export default function Page() {
  return <PortfolioPage />;
}
