import type { Metadata } from "next";
import PresenceExplorer from "@/components/presence/PresenceExplorer";
import PresenceIntro from "@/components/presence/PresenceIntro";
import PresenceShell from "@/components/presence/PresenceShell";
import { getDistrictsWithPresenceStatus } from "@/lib/district-members/presence-status";
import { getPublicMembersForDistrict } from "@/lib/district-members/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Odisha Presence | Bharatiya Krishak Samaj",
  description:
    "BKS Odisha district presence — Active/Green when published members are registered.",
};

export default async function OdishaPresencePage() {
  const districts = await getDistrictsWithPresenceStatus();
  const initial =
    districts.find((d) => d.status === "active") ?? districts[0];
  const members = initial
    ? await getPublicMembersForDistrict(initial.id)
    : [];

  return (
    <PresenceShell>
      <PresenceIntro />
      <section className="home-section">
        <div className="wrap">
          <PresenceExplorer
            initialSlug={initial?.slug}
            members={members}
            districts={districts}
          />
        </div>
      </section>
    </PresenceShell>
  );
}
