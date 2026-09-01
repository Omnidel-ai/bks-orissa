import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "About | Bharatiya Krishak Samaj, Odisha" };

export default function AboutPage() {
  return <SectionPage kind="about" />;
}
