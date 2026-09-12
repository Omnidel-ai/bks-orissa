"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { napSeminarReport } from "@/content/media/napSeminarReport";

const report = napSeminarReport;

function sectionById(id: string) {
  return report.sections.find((s) => s.id === id)!;
}

export function NapSept10EventFeature() {
  const overview = sectionById("introduction");
  const participation = sectionById("participation");
  const nibedita = sectionById("felicitation-nibedita");
  const districts = sectionById("district-presidents");
  const women = sectionById("women-agri-entrepreneurs");
  const guests = sectionById("distinguished-guests");
  const focus = sectionById("key-focus");
  const leadership = sectionById("leadership");
  const significance = sectionById("significance");
  const conclusion = sectionById("conclusion");

  const hero = report.gallery.find((g) => g.group === "hero")!;
  const moments = report.gallery.filter((g) => g.group === "moments");
  const highlights = report.gallery.filter((g) => g.group === "highlights");

  return (
    <article className="nap-event" id="nap-sept-10-2026" aria-labelledby="nap-event-headline">
      <header className="nap-event-hero">
        <div className="wrap nap-event-hero-inner">
          <p className="nap-event-kicker">
            <span>{report.dateLabel}</span>
            <span aria-hidden="true"> · </span>
            <span>Sambalpur, Odisha</span>
          </p>
          <h2 id="nap-event-headline" className="nap-event-headline">
            {report.headline}
          </h2>
          <p className="nap-event-name">{report.eventName}</p>
          <ul className="nap-event-meta">
            <li>
              <strong>Venue</strong> {report.location}
            </li>
            <li>
              <strong>Time</strong> {report.time}
            </li>
            <li>
              <strong>Organised by</strong> {report.organisedBy}
            </li>
            <li>
              <strong>Supported by</strong> {report.supportedBy}
            </li>
          </ul>

          <figure className="nap-event-hero-photo">
            <div className="nap-event-hero-photo-media">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 1100px"
                style={{ objectFit: "cover", objectPosition: "center 35%" }}
              />
            </div>
            <figcaption>{hero.caption}</figcaption>
          </figure>
        </div>
      </header>

      <div className="wrap nap-event-body">
        <section className="nap-event-stats" aria-label="Event facts">
          {report.stats.map((stat) => (
            <div key={stat.label} className="nap-event-stat">
              <span className="nap-event-stat-value">{stat.value}</span>
              <strong>{stat.label}</strong>
            </div>
          ))}
        </section>

        <NapBlock id="nap-overview" title={overview.title}>
          {overview.paragraphs.map((p, i) => (
            <p key={`overview-${i}`}>{p}</p>
          ))}
        </NapBlock>

        <NapBlock id="nap-participation" title={participation.title}>
          {participation.paragraphs.map((p, i) => (
            <p key={`participation-${i}`}>{p}</p>
          ))}
          <ul className="nap-event-list">
            {participation.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </NapBlock>

        <NapBlock id="nap-nibedita" title={nibedita.title}>
          <div className="nap-event-feature-card">
            <div className="nap-event-feature-photo">
              <Image
                src={report.nibedita.image}
                alt={report.nibedita.name}
                fill
                sizes="(max-width: 700px) 100vw, 280px"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
            <div>
              <p className="nap-event-person-name">{report.nibedita.name}</p>
              <p className="nap-event-person-role">{report.nibedita.role}</p>
              {nibedita.paragraphs.map((p, i) => (
                <p key={`nibedita-${i}`}>{p}</p>
              ))}
            </div>
          </div>
        </NapBlock>

        <NapBlock id="nap-districts" title={districts.title}>
          {districts.paragraphs.map((p, i) => (
            <p key={`districts-${i}`}>{p}</p>
          ))}
          {districts.bullets ? (
            <ul className="nap-event-list">
              {districts.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <h4 className="nap-event-subhead">{report.leadershipProfilesTitle}</h4>
          <p className="nap-event-note">{report.leadershipProfilesNote}</p>
          <div className="nap-event-profile-grid">
            {report.leadershipProfiles.map((profile) => (
              <article key={profile.name} className="nap-event-profile-card">
                <div className="nap-event-profile-photo">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 700px) 45vw, 200px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <h5>{profile.name}</h5>
                <p>{profile.detail}</p>
              </article>
            ))}
          </div>
        </NapBlock>

        <NapBlock id="nap-women" title={women.title}>
          {women.paragraphs.map((p, i) => (
            <p key={`women-${i}`}>{p}</p>
          ))}
          <h4 className="nap-event-subhead">{report.womenProfilesTitle}</h4>
          <p className="nap-event-note">{report.womenProfilesNote}</p>
          <div className="nap-event-profile-grid">
            {report.womenProfiles.map((profile) => (
              <article key={profile.name} className="nap-event-profile-card">
                <div className="nap-event-profile-photo">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 700px) 45vw, 200px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <h5>{profile.name}</h5>
                <p>{profile.detail}</p>
              </article>
            ))}
          </div>
        </NapBlock>

        <NapBlock id="nap-guests" title={guests.title}>
          {guests.paragraphs.map((p, i) => (
            <p key={`guests-${i}`}>{p}</p>
          ))}
          <ul className="nap-event-guest-grid">
            {guests.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </NapBlock>

        <NapBlock id="nap-focus" title={focus.title}>
          {focus.paragraphs.map((p, i) => (
            <p key={`focus-${i}`}>{p}</p>
          ))}
          <div className="nap-event-focus-grid">
            {focus.bullets?.map((item) => (
              <div key={item} className="nap-event-focus-card">
                {item}
              </div>
            ))}
          </div>
          {focus.closing ? <p className="nap-event-closing">{focus.closing}</p> : null}
        </NapBlock>

        <NapBlock id="nap-leadership" title={leadership.title}>
          {leadership.paragraphs.map((p, i) => (
            <p key={`leadership-${i}`}>{p}</p>
          ))}
        </NapBlock>

        <NapBlock id="nap-significance" title={significance.title}>
          {significance.paragraphs.map((p, i) => (
            <p key={`significance-${i}`}>{p}</p>
          ))}
        </NapBlock>

        <NapBlock id="nap-conclusion" title={conclusion.title}>
          {conclusion.paragraphs.map((p, i) => (
            <p key={`conclusion-${i}`}>{p}</p>
          ))}
        </NapBlock>

        <section className="nap-event-gallery" aria-labelledby="nap-gallery-title">
          <h3 id="nap-gallery-title">11. Event Photo Gallery</h3>
          <div className="stitch-accent" aria-hidden="true" />

          <h4 className="nap-event-subhead">Event moments</h4>
          <div className="nap-event-gallery-grid">
            {moments.map((item) => (
              <figure key={item.src} className="nap-event-gallery-card">
                <div className="nap-event-gallery-media">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <h4 className="nap-event-subhead">Event highlights</h4>
          <div className="nap-event-gallery-grid">
            {highlights.map((item) => (
              <figure key={item.src} className="nap-event-gallery-card">
                <div className="nap-event-gallery-media">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="nap-event-video">
            <video controls preload="metadata" playsInline>
              <source src={report.video.src} type="video/mp4" />
            </video>
            <p>{report.video.caption}</p>
          </div>
        </section>
      </div>
    </article>
  );
}

function NapBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="nap-event-section" id={id} aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>{title}</h3>
      <div className="stitch-accent" aria-hidden="true" />
      <div className="nap-event-prose">{children}</div>
    </section>
  );
}
