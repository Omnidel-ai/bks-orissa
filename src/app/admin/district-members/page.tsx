import type { Metadata } from "next";
import DistrictMembersAdmin from "@/components/admin/DistrictMembersAdmin";

export const metadata: Metadata = {
  title: "ଓଡ଼ିଶା — ସଦସ୍ୟ ପରିଚାଳନା | BKS Odisha",
  robots: { index: false, follow: false },
};

export default function DistrictMembersAdminPage() {
  return <DistrictMembersAdmin />;
}
