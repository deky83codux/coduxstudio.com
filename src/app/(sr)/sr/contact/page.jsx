import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/views/ContactPage";

export const metadata = pageMetadata("contact", "sr");

export default function Page() {
  return <ContactPage />;
}
