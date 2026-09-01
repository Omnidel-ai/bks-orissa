"use client";

import Link from "next/link";
import { districts, states } from "@/content/presence";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

/**
 * Sister architecture to BKS West Bengal Presence explorer.
 * Odisha state is registered; district/member panels stay empty until verified data arrives.
 */
export default function PresenceExplorer() {
  const [locale] = useLocale();
  const d = t(locale);
  const odisha = states[0];

  return (
    <div className="wrap" style={{ display: "grid", gap: "1.5rem", paddingBottom: "3rem" }}>
      <article className="note-block">
        <span className="eyebrow">{d.presence.stateLabel}</span>
        <h2 style={{ marginTop: "0.35rem" }}>{odisha.name[locale]}</h2>
        <div className="stitch-accent" aria-hidden="true" />
        <p>{d.presence.architectureNote}</p>
        <p style={{ marginTop: "0.75rem" }}>
          <Link href="/presence/odisha" className="hero-secondary-link">
            /presence/odisha
          </Link>
        </p>
      </article>

      <section aria-labelledby="odisha-districts-title">
        <h3 id="odisha-districts-title" className="gateway-group-label">
          {d.presence.districtsLabel}
        </h3>
        {districts.length === 0 ? (
          <article className="note-block" style={{ marginTop: "0.75rem" }}>
            <p>{d.presence.empty}</p>
          </article>
        ) : (
          <ul className="priority-list page-priority-list" style={{ marginTop: "0.75rem" }}>
            {districts.map((district) => (
              <li key={district.id}>
                <Link href={`/presence/odisha/${district.slug}`}>{district.name[locale]}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
