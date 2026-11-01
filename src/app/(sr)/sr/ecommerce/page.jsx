import { pageMetadata } from "@/lib/seo";
import { EcommercePage } from "@/views/EcommercePage";

export const metadata = pageMetadata("ecommerce", "sr");

export default function Page() {
  return <EcommercePage />;
}
