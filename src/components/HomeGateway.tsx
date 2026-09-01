"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NATIONAL_PRESIDENT_URL, NIBEDITA_PROFILE_PATH } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

function HomeBlock({
  eyebrow,
  title,
  body,
  href,
  cta,
  id,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  id: string;
}) {
  return (
    <section className="home-section" aria-labelledby={id}>
      <div className="wrap home-content-block">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={id}>{title}</h2>
        <div className="stitch-accent" aria-hidden="true" />
        <p className="home-content-body">{body}</p>
        <Link href={href} className="btn-secondary" style={{ marginTop: "1.25rem", display: "inline-flex" }}>
          {cta}
        </Link>
      </div>
    </section>
  );
}

export function HomeGateway() {
  const [locale, setLocale] = useLocale();
  const d = t(locale);
  const h = d.home;

  return (
    <div style={{ minHeight: "100vh", background: "var(--page)" }}>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main>
        <section className="home-section hero-section" aria-labelledby="hero-title">
          <div className="field-contours" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">{d.hero.eyebrow}</span>
              <h1 id="hero-title" className="hero-title">
                {d.brand}
              </h1>
              <div className="stitch-accent" aria-hidden="true" />
              <p className="hero-lead">{d.hero.title}</p>
              <p className="hero-lead" style={{ marginTop: "0.75rem", opacity: 0.92 }}>
                {d.hero.lead}
              </p>
              <div className="hero-actions">
                <Link href="/odisha" className="btn-gold">
                  {d.hero.primaryCta}
                </Link>
                <Link href="/leadership" className="hero-secondary-link">
                  {d.hero.secondaryCta}
                </Link>
              </div>
            </div>
            <figure className="photo-frame hero-photo-frame tilt-r" style={{ margin: 0 }}>
              <div className="photo-frame-media hero-photo-media">
                <Image
                  src="/assets/hero-letter-handover.jpg"
                  alt={d.hero.caption}
                  fill
                  sizes="(max-width: 900px) 100vw, 560px"
                  className="hero-photo-img hero-photo-desktop"
                  style={{ objectFit: "cover", objectPosition: "center 42%" }}
                  priority
                />
                <Image
                  src="/assets/hero-letter-handover-mobile.jpg"
                  alt={d.hero.caption}
                  fill
                  sizes="100vw"
                  className="hero-photo-img hero-photo-mobile"
                  style={{ objectFit: "cover", objectPosition: "center 38%" }}
                  priority
                />
              </div>
              <figcaption className="photo-frame-caption">{d.hero.caption}</figcaption>
            </figure>
          </div>
        </section>

        <div className="wrap">
          <div className="section-seam" aria-hidden="true" />
        </div>

        <HomeBlock
          id="home-about"
          eyebrow={h.aboutEyebrow}
          title={h.aboutTitle}
          body={h.aboutBody}
          href="/about"
          cta={h.aboutCta}
        />

        <HomeBlock
          id="home-odisha"
          eyebrow={h.odishaEyebrow}
          title={h.odishaTitle}
          body={h.odishaBody}
          href="/odisha"
          cta={h.odishaCta}
        />

        <section className="home-section" aria-labelledby="home-agri">
          <div className="wrap home-content-block home-agri-split">
            <div>
              <span className="eyebrow">{h.agriEyebrow}</span>
              <h2 id="home-agri">{h.agriTitle}</h2>
              <div className="stitch-accent" aria-hidden="true" />
              <p className="home-content-body">{h.agriBody}</p>
              <Link href="/agriculture" className="btn-secondary" style={{ marginTop: "1.25rem", display: "inline-flex" }}>
                {h.agriCta}
              </Link>
            </div>
            <figure className="photo-frame" style={{ margin: 0 }}>
              <div className="photo-frame-media" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src="/assets/story/story-jagannath.jpg"
                  alt={h.storyJagannathCaption}
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  style={{ objectFit: "cover", objectPosition: "center 25%" }}
                />
              </div>
              <figcaption className="photo-frame-caption">{h.storyJagannathCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-leadership">
          <div className="wrap home-content-block">
            <span className="eyebrow">{h.leadershipEyebrow}</span>
            <h2 id="home-leadership">{h.leadershipTitle}</h2>
            <div className="stitch-accent" aria-hidden="true" />
            <p className="home-content-body">{h.leadershipBody}</p>
            <div className="home-leader-row">
              <div className="home-leader-card">
                <div className="home-leader-photo">
                  <Image
                    src="/assets/dr-krishan-bir-chaudhary.jpg"
                    alt="Shri Krishan Bir Choudhary"
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <strong>{d.leadership.nationalLabel}</strong>
                  <p>Shri Krishan Bir Choudhary</p>
                  <a href={NATIONAL_PRESIDENT_URL} target="_blank" rel="noopener noreferrer">
                    {d.leadership.fullNationalProfile} ↗
                  </a>
                </div>
              </div>
              <div className="home-leader-card">
                <div className="home-leader-photo">
                  <Image
                    src="/assets/nibedita-portrait.jpg"
                    alt={d.nibedita.name}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>
                <div>
                  <strong>{d.leadership.stateLabel}</strong>
                  <p>{d.nibedita.name}</p>
                  <Link href={NIBEDITA_PROFILE_PATH}>{d.leadership.viewProfile}</Link>
                </div>
              </div>
            </div>
            <Link href="/leadership" className="btn-secondary" style={{ marginTop: "1.25rem", display: "inline-flex" }}>
              {h.leadershipCta}
            </Link>
          </div>
        </section>

        <HomeBlock
          id="home-presence"
          eyebrow={h.presenceEyebrow}
          title={h.presenceTitle}
          body={h.presenceBody}
          href="/presence"
          cta={h.presenceCta}
        />

        <section className="home-section" aria-labelledby="home-story">
          <div className="wrap">
            <div className="section-heading section-heading-wide">
              <span className="eyebrow">{h.storyEyebrow}</span>
              <h2 id="home-story">{h.storyTitle}</h2>
              <div className="stitch-accent" aria-hidden="true" />
              <p className="home-content-body" style={{ marginTop: "1rem" }}>
                {h.storyLead}
              </p>
            </div>
            <div className="story-grid">
              <figure className="photo-frame" style={{ margin: 0 }}>
                <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src="/assets/hero-chaudhary-nibedita.jpg"
                    alt={h.storyHeroCaption}
                    fill
                    sizes="(max-width: 900px) 100vw, 560px"
                    style={{ objectFit: "cover", objectPosition: "center 40%" }}
                  />
                </div>
                <figcaption className="photo-frame-caption">{h.storyHeroCaption}</figcaption>
              </figure>
              <figure className="photo-frame" style={{ margin: 0 }}>
                <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src="/assets/nibedita-portrait.jpg"
                    alt={d.nibedita.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 560px"
                    style={{ objectFit: "cover", objectPosition: "center 18%" }}
                  />
                </div>
                <figcaption className="photo-frame-caption">{d.nibedita.name}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-media">
          <div className="wrap home-content-block home-agri-split">
            <div>
              <span className="eyebrow">{h.mediaEyebrow}</span>
              <h2 id="home-media">{h.mediaTitle}</h2>
              <div className="stitch-accent" aria-hidden="true" />
              <p className="home-content-body">{h.mediaBody}</p>
              <Link href="/media" className="btn-secondary" style={{ marginTop: "1.25rem", display: "inline-flex" }}>
                {h.mediaCta}
              </Link>
            </div>
            <figure className="photo-frame" style={{ margin: 0 }}>
              <div className="photo-frame-media" style={{ aspectRatio: "16 / 9" }}>
                <Image
                  src="/assets/media-odisha-talks.jpg"
                  alt={d.media.odishaTalksTitle}
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="photo-frame-caption">{d.media.odishaTalksTitle}</figcaption>
            </figure>
          </div>
        </section>

        <HomeBlock
          id="home-join"
          eyebrow={h.joinEyebrow}
          title={h.joinTitle}
          body={h.joinBody}
          href="/apply"
          cta={h.joinCta}
        />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
