import Image from "next/image";
import { jungleJaluchhe, membershipDrive } from "@/content/media/membershipDrive";

export function MembershipDriveCoverage() {
  const { hero } = membershipDrive;

  return (
    <>
      <article className="nap-event" id={membershipDrive.id} aria-labelledby="membership-drive-headline">
        <header className="nap-event-hero">
          <div className="wrap nap-event-hero-inner">
            <p className="nap-event-kicker">
              <span>{membershipDrive.kicker}</span>
            </p>
            <h2 id="membership-drive-headline" className="nap-event-headline">
              {membershipDrive.headline}
            </h2>
            <p>{membershipDrive.outreach}</p>
            <p>{membershipDrive.committeeStatement}</p>

            {membershipDrive.events.map((event) => (
              <section key={event.id} id={event.id} aria-labelledby={`${event.id}-title`}>
                <h3 id={`${event.id}-title`} className="nap-event-subhead">
                  {event.district}
                </h3>
                <p className="nap-event-name">{event.title}</p>
                <ul className="nap-event-meta">
                  <li>
                    <strong>Date</strong> {event.dateLabel}
                  </li>
                  <li>
                    <strong>Venue</strong> {event.venue}
                  </li>
                  <li>
                    <strong>District</strong> {event.district}
                  </li>
                </ul>
              </section>
            ))}

            <figure className="nap-event-hero-photo">
              <div className="nap-event-hero-photo-media">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 1100px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <figcaption>{hero.caption}</figcaption>
            </figure>
          </div>
        </header>

        <div className="wrap nap-event-body">
          <section className="nap-event-gallery" aria-labelledby="sundargarh-gallery-title">
            <h3 id="sundargarh-gallery-title">Sundargarh event photos</h3>
            <div className="stitch-accent" aria-hidden="true" />
            <div className="nap-event-gallery-grid">
              {membershipDrive.gallery.map((item) => (
                <figure key={item.src} className="nap-event-gallery-card">
                  <div className="nap-event-gallery-media">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 800px) 100vw, 50vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>

            <h4 className="nap-event-subhead">Event videos</h4>
            {membershipDrive.videos.map((video) => (
              <div key={video.src} className="nap-event-video">
                <video controls preload="metadata" playsInline>
                  <source src={video.src} type="video/mp4" />
                </video>
                <p>{video.caption}</p>
              </div>
            ))}
          </section>
        </div>
      </article>

      <section className="home-section" id={jungleJaluchhe.id} aria-labelledby="jungle-jaluchhe-title">
        <div className="wrap prose-block page-reading">
          <h2 id="jungle-jaluchhe-title">{jungleJaluchhe.title}</h2>
          <div className="stitch-accent" aria-hidden="true" />
          <p>{jungleJaluchhe.focus}</p>
          <p>{jungleJaluchhe.credit}</p>
        </div>
      </section>
    </>
  );
}
