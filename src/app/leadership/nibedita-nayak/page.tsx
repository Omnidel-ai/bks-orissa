import type { Metadata } from "next";
import { NibeditaProfile } from "@/components/NibeditaProfile";

export const metadata: Metadata = {
  title: "Smt. Nibedita Nayak Baliarsingh | BKS Odisha",
  description:
    "Organisational leadership profile of Smt. Nibedita Nayak Baliarsingh on Bharatiya Krishak Samaj Odisha.",
};

export default function NibeditaNayakPage() {
  return <NibeditaProfile />;
}
