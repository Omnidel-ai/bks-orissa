import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PresenceExplorer from "@/components/presence/PresenceExplorer";
import PresenceIntro from "@/components/presence/PresenceIntro";
import PresenceShell from "@/components/presence/PresenceShell";
import { getDistrict } from "@/content/presence";
import { getDistrictsWithPresenceStatus } from "@/lib/district-members/presence-status";
import { getPublicMembersForDistrict } from "@/lib/district-members/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ district: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district: slug } = await params;
  const district = getDistrict(slug);
  if (!district) {
    return { title: "District | BKS Odisha Presence" };
  }
  return {
    title: `${district.officialName} | BKS Odisha Presence`,
    description: `BKS presence and registered members in ${district.officialName} district, Odisha.`,
  };
}

export default async function OdishaDistrictPresencePage({ params }: Props) {
  const { district: slug } = await params;
  if (!getDistrict(slug)) notFound();

  const districts = await getDistrictsWithPresenceStatus();
  const current = districts.find((d) => d.slug === slug);
  if (!current) notFound();

  const members = await getPublicMembersForDistrict(current.id);

  return (
    <PresenceShell>
      <PresenceIntro />
      <section className="home-section">
        <div className="wrap">
          <PresenceExplorer
            initialSlug={current.slug}
            members={members}
            districts={districts}
          />
        </div>
      </section>
    </PresenceShell>
  );
}
