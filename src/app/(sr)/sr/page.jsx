import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata = pageMetadata("home", "sr");

export default function Page() {
  return <Home />;
}
