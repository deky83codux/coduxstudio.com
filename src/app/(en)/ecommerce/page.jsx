import { pageMetadata } from "@/lib/seo";
import { EcommercePage } from "@/views/EcommercePage";

export const metadata = pageMetadata("ecommerce", "en");

export default function Page() {
  return <EcommercePage />;
}
