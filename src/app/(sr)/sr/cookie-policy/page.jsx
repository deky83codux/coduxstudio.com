import { pageMetadata } from "@/lib/seo";
import { CookiePolicyPage } from "@/views/CookiePolicyPage";

export const metadata = pageMetadata("cookie-policy", "sr");

export default function Page() {
  return <CookiePolicyPage />;
}
