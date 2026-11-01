import "../globals.css";
import { RootShell, rootMetadata, rootViewport } from "../RootShell";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function EnglishLayout({ children }) {
  return <RootShell lang="en">{children}</RootShell>;
}
