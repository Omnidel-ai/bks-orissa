import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PresenceShell from "@/components/presence/PresenceShell";
import { getDistrict } from "@/content/presence";
import { getPublicMember } from "@/lib/district-members/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ district: string; member: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district: districtSlug, member: memberSlug } = await params;
  const district = getDistrict(districtSlug);
  if (!district) return { title: "Member | BKS Odisha" };
  const member = await getPublicMember(district.id, memberSlug);
  if (!member) return { title: "Member | BKS Odisha" };
  return {
    title: `${member.name} | ${district.officialName} | BKS Odisha`,
    description: member.designation || member.bio || `${member.name}, BKS Odisha`,
  };
}

export default async function OdishaMemberPage({ params }: Props) {
  const { district: districtSlug, member: memberSlug } = await params;
  const district = getDistrict(districtSlug);
  if (!district) notFound();

  const member = await getPublicMember(district.id, memberSlug);
  if (!member) notFound();

  return (
    <PresenceShell>
      <section className="section-page-hero">
        <div className="wrap">
          <p>
            <Link href={`/presence/odisha/${district.slug}`} className="text-link">
              ← {district.name.or} / {district.officialName}
            </Link>
          </p>
          <div className="member-profile" style={{ marginTop: "1.5rem" }}>
            <div className="member-profile-hero">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={180}
                  height={180}
                  className="member-profile-photo"
                  unoptimized={member.photo.includes("supabase.co")}
                />
              ) : (
                <span className="member-profile-photo placeholder" aria-hidden>
                  {member.name.slice(0, 1)}
                </span>
              )}
              <div>
                <h1 style={{ margin: 0 }}>{member.name}</h1>
                {member.designation ? (
                  <p className="member-designation">{member.designation}</p>
                ) : null}
                {(member.village || member.block || member.area) && (
                  <ul className="member-locality">
                    {member.village ? (
                      <li>
                        <span>Village</span> {member.village}
                      </li>
                    ) : null}
                    {member.block ? (
                      <li>
                        <span>Block</span> {member.block}
                      </li>
                    ) : null}
                    {member.area ? (
                      <li>
                        <span>Area</span> {member.area}
                      </li>
                    ) : null}
                  </ul>
                )}
              </div>
            </div>
            {member.bio ? (
              <div className="member-section">
                <h2>About</h2>
                <p>{member.bio}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </PresenceShell>
  );
}
