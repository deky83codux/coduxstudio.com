import { pageMetadata } from "@/lib/seo";
import { PrivacyPolicyPage } from "@/views/PrivacyPolicyPage";

export const metadata = pageMetadata("privacy-policy", "en");

export default function Page() {
  return <PrivacyPolicyPage />;
}
