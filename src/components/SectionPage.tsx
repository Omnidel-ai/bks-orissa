"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NATIONAL_PRESIDENT_URL, NIBEDITA_PROFILE_PATH, ODISHA_TALKS_URL } from "@/lib/site";
import { t, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

export type SectionKind = "about" | "odisha" | "leadership" | "media" | "apply" | "agriculture";

const APPLY_NOTE: Record<Locale, string> = {
  en: "The Odisha application form will open once official contact details are published. Until then, use Leadership and the National President profile.",
  hi: "ओडिशा आवेदन फॉर्म औपचारिक संपर्क विवरण उपलब्ध होने पर सक्रिय होगा। अभी नेतृत्व या राष्ट्रीय अध्यक्ष प्रोफ़ाइल से जुड़ें।",
  or: "ଓଡ଼ିଶା ଆବେଦନ ଫର୍ମ ଔପଚାରିକ ଯୋଗାଯୋଗ ବିବରଣୀ ପ୍ରକାଶିତ ହେବା ପରେ ଖୋଲିବ। ଏପର୍ଯ୍ୟନ୍ତ ନେତୃତ୍ୱ କିମ୍ବା ଜାତୀୟ ସଭାପତି ପ୍ରୋଫାଇଲ୍ ବ୍ୟବହାର କରନ୍ତୁ।",
};

export function SectionPage({ kind }: { kind: SectionKind }) {
  const [locale, setLocale] = useLocale();
  const d = t(locale);

  return (
    <div style={{ minHeight: "100vh", background: "var(--page)" }}>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main>
        {kind === "about" ? (
          <>
            <PageHeading eyebrow={d.about.eyebrow} title={d.about.title} back={d.common.backHome} />
            <section className="home-section">
              <div className="wrap prose-block page-reading">
                <h2>{d.about.whoTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.about.whoBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.about.historyTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                {d.about.historyParas.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}

                <h2 style={{ marginTop: "2rem" }}>{d.about.standTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.about.standIntro}</p>
                <h3 style={{ marginTop: "1.25rem", fontSize: "1.05rem" }}>{d.about.objectivesTitle}</h3>
                <ul className="profile-list">
                  {d.about.objectives.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2 style={{ marginTop: "2rem" }}>{d.about.workTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.about.workBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.about.reachTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.about.reachBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.about.whyOdishaTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.about.whyOdishaBody}</p>
                <p>{d.about.odishaLinkNote}</p>
                <div className="leader-links" style={{ marginTop: "1.5rem" }}>
                  <Link href="/odisha" className="btn-secondary">
                    {d.nav.odisha}
                  </Link>
                  <Link href="/agriculture" className="btn-secondary">
                    {d.nav.agriculture}
                  </Link>
                  <a
                    href={NATIONAL_PRESIDENT_URL}
                    className="btn-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.leadership.fullNationalProfile}
                  </a>
                </div>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap">
                <figure className="photo-frame" style={{ margin: 0, maxWidth: 820 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 9" }}>
                    <Image
                      src="/assets/story/story-letter-group.jpg"
                      alt={d.home.storyLetterCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 820px"
                      style={{ objectFit: "cover", objectPosition: "center 35%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.home.storyLetterCaption}</figcaption>
                </figure>
              </div>
            </section>
          </>
        ) : null}

        {kind === "odisha" ? (
          <>
            <PageHeading eyebrow={d.odishaPage.eyebrow} title={d.odishaPage.title} back={d.common.backHome} />
            <section className="home-section">
              <div className="wrap prose-block page-reading">
                {d.odishaPage.paras.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <div className="leader-links" style={{ marginTop: "1.5rem" }}>
                  <Link href="/agriculture" className="btn-gold">
                    {d.nav.agriculture}
                  </Link>
                  <Link href="/presence" className="btn-secondary">
                    {d.nav.presence}
                  </Link>
                </div>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap">
                <figure className="photo-frame" style={{ margin: 0, maxWidth: 720 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "4 / 5" }}>
                    <Image
                      src="/assets/story/story-jagannath.jpg"
                      alt={d.home.storyJagannathCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 720px"
                      style={{ objectFit: "cover", objectPosition: "center 25%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.home.storyJagannathCaption}</figcaption>
                </figure>
              </div>
            </section>
          </>
        ) : null}

        {kind === "agriculture" ? (
          <>
            <PageHeading
              eyebrow={d.agriculture.eyebrow}
              title={d.agriculture.title}
              lead={d.agriculture.lead}
              back={d.common.backHome}
            />
            <section className="home-section">
              <div className="wrap agri-stats">
                {d.agriculture.stats.map((s) => (
                  <div key={s.label} className="agri-stat">
                    <span className="agri-stat-value">{s.value}</span>
                    <strong>{s.label}</strong>
                    <p>{s.note}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="home-section">
              <div className="wrap prose-block page-reading">
                <h2>{d.agriculture.landscapeTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.landscapeBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.agriculture.cropsTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.cropsBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.agriculture.smallTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.smallBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.agriculture.irrigationTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.irrigationBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.agriculture.climateTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.climateBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.agriculture.techTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.techBody}</p>

                <h2 style={{ marginTop: "2rem" }}>{d.agriculture.bksTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.agriculture.bksBody}</p>
                <p className="source-note">{d.agriculture.sourceNote}</p>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap">
                <figure className="photo-frame" style={{ margin: 0, maxWidth: 820 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 9" }}>
                    <Image
                      src="/assets/story/story-letter-group.jpg"
                      alt={d.home.storyLetterCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 820px"
                      style={{ objectFit: "cover", objectPosition: "center 32%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.home.storyLetterCaption}</figcaption>
                </figure>
              </div>
            </section>
          </>
        ) : null}

        {kind === "leadership" ? (
          <>
            <PageHeading
              eyebrow={d.leadership.eyebrow}
              title={d.leadership.title}
              lead={d.leadership.lead}
              back={d.common.backHome}
            />
            <section className="home-section">
              <div className="wrap leader-profile">
                <div className="profile-photo-block">
                  <div className="leader-portrait leader-portrait-large">
                    <Image
                      src="/assets/dr-krishan-bir-chaudhary.jpg"
                      alt="Shri Krishan Bir Choudhary"
                      fill
                      sizes="220px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p>{d.leadership.nationalRoleCaption}</p>
                </div>
                <div>
                  <span className="eyebrow">{d.leadership.nationalLabel}</span>
                  <h2>Shri Krishan Bir Choudhary</h2>
                  <div className="stitch-accent" aria-hidden="true" />
                  <div className="prose-block">
                    <p>{d.leadership.nationalBody}</p>
                  </div>
                  <div className="leader-links" style={{ marginTop: "1.25rem" }}>
                    <a
                      href={NATIONAL_PRESIDENT_URL}
                      className="btn-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {d.leadership.fullNationalProfile}
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap person-feature">
                <div className="person-feature-photo">
                  <Image
                    src="/assets/nibedita-portrait.jpg"
                    alt={d.nibedita.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 340px"
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>
                <div>
                  <span className="eyebrow">{d.leadership.stateLabel}</span>
                  <h2>{d.nibedita.name}</h2>
                  <p className="person-role">{d.nibedita.roleNote}</p>
                  <p>{d.nibedita.summary}</p>
                  <Link
                    href={NIBEDITA_PROFILE_PATH}
                    className="btn-gold"
                    style={{ marginTop: "1rem", display: "inline-flex" }}
                  >
                    {d.leadership.viewProfile}
                  </Link>
                </div>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap">
                <figure className="photo-frame" style={{ margin: 0, maxWidth: 820 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 9" }}>
                    <Image
                      src="/assets/story/story-letter-group.jpg"
                      alt={d.home.storyLetterCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 820px"
                      style={{ objectFit: "cover", objectPosition: "center 32%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.home.storyLetterCaption}</figcaption>
                </figure>
              </div>
            </section>
          </>
        ) : null}

        {kind === "media" ? (
          <>
            <PageHeading
              eyebrow={d.media.eyebrow}
              title={d.media.title}
              lead={d.media.lead}
              back={d.common.backHome}
            />
            <section className="home-section">
              <div className="wrap prose-block page-reading">
                <h2>{d.media.napSeminarTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p className="source-note">{d.media.napSeminarMeta}</p>
                <p>{d.media.napSeminarIntro}</p>
                <h3 style={{ marginTop: "1.25rem", fontSize: "1.05rem" }}>
                  {d.media.napSeminarLeadersTitle}
                </h3>
                <ul className="profile-list">
                  {d.media.napSeminarLeaders.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap story-grid">
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/media-nap-seminar-group.jpg"
                      alt={d.media.napSeminarCaptionGroup}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 40%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">
                    {d.media.napSeminarCaptionGroup}
                  </figcaption>
                </figure>
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/media-nap-seminar-booklet.jpg"
                      alt={d.media.napSeminarCaptionBooklet}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 45%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">
                    {d.media.napSeminarCaptionBooklet}
                  </figcaption>
                </figure>
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/media-nap-seminar-stage.jpg"
                      alt={d.media.napSeminarCaptionStage}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 42%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">
                    {d.media.napSeminarCaptionStage}
                  </figcaption>
                </figure>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap prose-block page-reading">
                <h2>{d.media.bandeFelicitationTitle}</h2>
                <div className="stitch-accent" aria-hidden="true" />
                <p>{d.media.bandeFelicitationBody}</p>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap" style={{ maxWidth: 820 }}>
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/media-bande-odisha-felicitation.jpg"
                      alt={d.media.bandeFelicitationCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 820px"
                      style={{ objectFit: "cover", objectPosition: "center 35%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">
                    {d.media.bandeFelicitationCaption}
                  </figcaption>
                </figure>
              </div>
            </section>
            <section className="media-feature-section" aria-labelledby="featured-media-title">
              <div className="wrap">
                <article className="media-feature-card">
                  <a
                    className="media-feature-image"
                    href={ODISHA_TALKS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/assets/media-odisha-talks.jpg"
                      alt={d.media.odishaTalksTitle}
                      fill
                      sizes="(max-width: 900px) 100vw, 520px"
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                  <div className="media-feature-body">
                    <h2 id="featured-media-title">{d.media.odishaTalksTitle}</h2>
                    <p>{d.media.odishaTalksBody}</p>
                    <a
                      href={ODISHA_TALKS_URL}
                      className="btn-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {d.media.watch}
                    </a>
                  </div>
                </article>
              </div>
            </section>
            <section className="home-section">
              <div className="wrap story-grid">
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/media-meeting-handover.jpg"
                      alt={d.media.meetingHandoverCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 40%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.media.meetingHandoverCaption}</figcaption>
                </figure>
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/media-meeting-review.jpg"
                      alt={d.media.meetingReviewCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 45%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.media.meetingReviewCaption}</figcaption>
                </figure>
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/hero-chaudhary-nibedita.jpg"
                      alt={d.home.storyHeroCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 40%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.home.storyHeroCaption}</figcaption>
                </figure>
                <figure className="photo-frame" style={{ margin: 0 }}>
                  <div className="photo-frame-media" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src="/assets/story/story-letter-group.jpg"
                      alt={d.home.storyLetterCaption}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      style={{ objectFit: "cover", objectPosition: "center 32%" }}
                    />
                  </div>
                  <figcaption className="photo-frame-caption">{d.home.storyLetterCaption}</figcaption>
                </figure>
              </div>
            </section>
          </>
        ) : null}

        {kind === "apply" ? (
          <>
            <PageHeading eyebrow={d.nav.apply} title={d.nav.apply} back={d.common.backHome} />
            <section className="home-section">
              <div className="wrap prose-block page-reading">
                <p>{APPLY_NOTE[locale]}</p>
                <p>{d.common.comingSoon}</p>
                <div className="leader-links" style={{ marginTop: "1.25rem" }}>
                  <Link href="/leadership" className="btn-gold">
                    {d.nav.leadership}
                  </Link>
                  <a
                    href={NATIONAL_PRESIDENT_URL}
                    className="btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.nav.nationalPresident}
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

function PageHeading({
  eyebrow,
  title,
  lead,
  back,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  back: string;
}) {
  return (
    <section className="home-section page-heading-section">
      <div className="wrap">
        <Link href="/" className="back-link">
          ← {back}
        </Link>
        <span className="eyebrow" style={{ display: "block", marginTop: "1rem" }}>
          {eyebrow}
        </span>
        <h1 className="page-title">{title}</h1>
        <div className="stitch-accent" aria-hidden="true" />
        {lead ? <p className="page-lead">{lead}</p> : null}
      </div>
    </section>
  );
}
