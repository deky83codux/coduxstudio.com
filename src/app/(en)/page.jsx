import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata = pageMetadata("home", "en");

export default function Page() {
  return <Home />;
}
