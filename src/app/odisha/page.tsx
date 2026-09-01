import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Odisha | Bharatiya Krishak Samaj" };

export default function OdishaPage() {
  return <SectionPage kind="odisha" />;
}
