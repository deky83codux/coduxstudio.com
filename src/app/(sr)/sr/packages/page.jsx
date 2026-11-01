import { pageMetadata } from "@/lib/seo";
import { PackagesPage } from "@/views/PackagesPage";

export const metadata = pageMetadata("packages", "sr");

export default function Page() {
  return <PackagesPage />;
}
