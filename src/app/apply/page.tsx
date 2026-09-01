import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Apply | Bharatiya Krishak Samaj, Odisha" };

export default function ApplyPage() {
  return <SectionPage kind="apply" />;
}
