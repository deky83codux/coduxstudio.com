import { pageMetadata } from "@/lib/seo";
import { AboutPage } from "@/views/AboutPage";

export const metadata = pageMetadata("about", "sr");

export default function Page() {
  return <AboutPage />;
}
