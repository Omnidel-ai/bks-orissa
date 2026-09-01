import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Leadership | Bharatiya Krishak Samaj, Odisha" };

export default function LeadershipPage() {
  return <SectionPage kind="leadership" />;
}
