import { pageMetadata } from "@/lib/seo";
import { AIConsultingPage } from "@/views/AIConsultingPage";

export const metadata = pageMetadata("ai-consulting", "sr");

export default function Page() {
  return <AIConsultingPage />;
}
