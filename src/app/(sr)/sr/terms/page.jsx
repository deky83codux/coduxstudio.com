import { pageMetadata } from "@/lib/seo";
import { TermsPage } from "@/views/TermsPage";

export const metadata = pageMetadata("terms", "sr");

export default function Page() {
  return <TermsPage />;
}
