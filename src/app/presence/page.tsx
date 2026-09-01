import type { Metadata } from "next";
import PresenceExplorer from "@/components/presence/PresenceExplorer";
import PresenceIntro from "@/components/presence/PresenceIntro";
import PresenceShell from "@/components/presence/PresenceShell";

export const metadata: Metadata = {
  title: "Our Presence | Bharatiya Krishak Samaj, Odisha",
  description: "BKS geographic presence across Odisha districts.",
};

export default function PresencePage() {
  return (
    <PresenceShell>
      <PresenceIntro />
      <section className="home-section">
        <PresenceExplorer />
      </section>
    </PresenceShell>
  );
}
