import { pageMetadata } from "@/lib/seo";
import { ServicesPage } from "@/views/ServicesPage";

export const metadata = pageMetadata("services", "en");

export default function Page() {
  return <ServicesPage />;
}
