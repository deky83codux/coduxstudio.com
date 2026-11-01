import "./globals.css";
import { RootShell, rootViewport } from "./RootShell";
import { NotFound } from "@/views/NotFound";

export const metadata = {
  title: "404 — Page not found | Codux Studio",
};
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootShell lang="en" notFound>
      <NotFound />
    </RootShell>
  );
}
