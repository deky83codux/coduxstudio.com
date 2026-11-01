import "../../globals.css";
import { RootShell, rootMetadata, rootViewport } from "../../RootShell";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function SerbianLayout({ children }) {
  return <RootShell lang="sr">{children}</RootShell>;
}
