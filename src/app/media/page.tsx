import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Media | Bharatiya Krishak Samaj, Odisha" };

export default function MediaPage() {
  return <SectionPage kind="media" />;
}
