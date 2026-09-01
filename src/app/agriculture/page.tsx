import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = {
  title: "Agriculture in Odisha | BKS Odisha",
  description:
    "Odisha farming landscape, paddy, small and marginal farmers, irrigation and agro-climatic zones — context for Bharatiya Krishak Samaj Odisha.",
};

export default function AgriculturePage() {
  return <SectionPage kind="agriculture" />;
}
