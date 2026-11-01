import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/views/ContactPage";

export const metadata = pageMetadata("contact", "en");

export default function Page() {
  return <ContactPage />;
}
