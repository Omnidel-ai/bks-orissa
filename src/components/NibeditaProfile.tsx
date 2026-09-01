"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ODISHA_TALKS_URL } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

export function NibeditaProfile() {
  const [locale, setLocale] = useLocale();
  const d = t(locale);
  const n = d.nibedita;

  return (
    <div style={{ minHeight: "100vh", background: "var(--page)" }}>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main>
        <section className="home-section">
          <div className="wrap">
            <Link href="/leadership" className="back-link">
              ← {d.nav.leadership}
            </Link>
            <span className="eyebrow" style={{ display: "block", marginTop: "1rem" }}>
              {d.leadership.stateLabel}
            </span>
            <h1 className="page-title" style={{ marginTop: "0.5rem" }}>
              {n.name}
            </h1>
            <div className="stitch-accent" aria-hidden="true" />
            <p className="person-role">{n.roleNote}</p>
          </div>
        </section>

        <section className="home-section">
          <div className="wrap person-feature">
            <div className="person-feature-photo">
              <Image
                src="/assets/nibedita-portrait.jpg"
                alt={n.name}
                fill
                sizes="(max-width: 900px) 100vw, 340px"
                style={{ objectFit: "cover", objectPosition: "center 18%" }}
                priority
              />
            </div>
            <div className="prose-block page-reading">
              <p>{n.intro}</p>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="wrap page-reading prose-block">
            <h2>{n.leadershipTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p>{n.leadershipBody}</p>

            <h2 style={{ marginTop: "2rem" }}>{n.areasTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <ul className="profile-list">
              {n.areas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 style={{ marginTop: "2rem" }}>{n.experienceTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p>{n.experienceBody}</p>

            <h2 style={{ marginTop: "2rem" }}>{n.odishaTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p>{n.odishaBody}</p>
          </div>
        </section>

        <section className="home-section">
          <div className="wrap">
            <figure className="photo-frame" style={{ margin: 0, maxWidth: 720 }}>
              <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                <Image
                  src="/assets/story/story-letter-group.jpg"
                  alt={d.home.storyLetterCaption}
                  fill
                  sizes="(max-width: 900px) 100vw, 720px"
                  style={{ objectFit: "cover", objectPosition: "center 32%" }}
                />
              </div>
              <figcaption className="photo-frame-caption">{d.home.storyLetterCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="home-section">
          <div className="wrap page-reading prose-block">
            <h2>{n.mediaTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p>{n.mediaBody}</p>
            <div className="leader-links" style={{ marginTop: "1.25rem" }}>
              <a href={ODISHA_TALKS_URL} className="btn-gold" target="_blank" rel="noopener noreferrer">
                {d.media.watch}
              </a>
              <Link href="/media" className="btn-secondary">
                {d.nav.media}
              </Link>
            </div>

            <h2 style={{ marginTop: "2.5rem" }}>{n.educationTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p>{n.educationBody}</p>

            <h2 style={{ marginTop: "2rem" }}>{n.connectionTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p>{n.connectionBody}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
