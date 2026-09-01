import type { Metadata } from "next";
import PresenceExplorer from "@/components/presence/PresenceExplorer";
import PresenceIntro from "@/components/presence/PresenceIntro";
import PresenceShell from "@/components/presence/PresenceShell";

export const metadata: Metadata = {
  title: "Odisha Presence | Bharatiya Krishak Samaj",
  description: "BKS Odisha district and block presence — published with verified details only.",
};

/** State entry — ready for /presence/odisha/[district] when data arrives. */
export default function OdishaPresencePage() {
  return (
    <PresenceShell>
      <PresenceIntro />
      <section className="home-section">
        <PresenceExplorer />
      </section>
    </PresenceShell>
  );
}
