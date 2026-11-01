import { pageMetadata } from "@/lib/seo";
import { TermsPage } from "@/views/TermsPage";

export const metadata = pageMetadata("terms", "en");

export default function Page() {
  return <TermsPage />;
}
