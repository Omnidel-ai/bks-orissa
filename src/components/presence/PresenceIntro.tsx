"use client";

import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

export default function PresenceIntro() {
  const [locale] = useLocale();
  const d = t(locale);

  return (
    <section className="section-page-hero">
      <div className="wrap">
        <span className="eyebrow">{d.presence.eyebrow}</span>
        <h1>{d.presence.title}</h1>
        <div className="stitch-accent" aria-hidden="true" />
        <p>{d.presence.lead}</p>
      </div>
    </section>
  );
}
