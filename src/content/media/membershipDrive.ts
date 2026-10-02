/**
 * District-level membership drive meetings — Deogarh and Sundargarh.
 * Copy and facts are limited to the supplied brief and Sundargarh event assets.
 */

export type MembershipDriveEvent = {
  id: string;
  title: string;
  dateLabel: string;
  venue: string;
  district: string;
};

export type MembershipDrivePhoto = {
  src: string;
  alt: string;
  caption: string;
};

const BASE = "/assets/events/sundargarh-2026-10-02";

export const membershipDrive = {
  id: "membership-drives-2026",
  kicker: "Western Odisha",
  headline: "District-Level Membership Drive Meetings",
  outreach:
    "Bharatiya Krishak Samaj (BKS), Odisha organised Farmers/Annadata meetings in tribal-dominated areas of Western Odisha to strengthen grassroots participation, membership and organisational outreach.",
  committeeStatement:
    "District Committees of BKS will be formed in 10 districts during the first phase, with both male and female members.",
  events: [
    {
      id: "deogarh-2026-09-30",
      title: "District-Level Membership Drive Meeting",
      dateLabel: "30 September 2026",
      venue: "JharaGogua, Tileibani ITDA Block",
      district: "Deogarh",
    },
    {
      id: "sundargarh-2026-10-02",
      title: "District-Level Membership Drive Meeting",
      dateLabel: "2 October 2026",
      venue: "Hanuman Vatika Ground, Gurundia Block",
      district: "Sundargarh",
    },
  ] satisfies MembershipDriveEvent[],
  hero: {
    src: `${BASE}/01-venue-gate.jpg`,
    alt: "Entrance to the Bharatiya Krishak Samaj Odisha meeting at Hanuman Vatika Ground, Gurundia, Sundargarh, 2 October 2026",
    caption:
      "Sundargarh — Hanuman Vatika Ground, Gurundia Block, 2 October 2026",
  } satisfies MembershipDrivePhoto,
  gallery: [
    {
      src: `${BASE}/03-pandal-gathering.jpg`,
      alt: "Farmers seated under the pandal at the Sundargarh district meeting",
      caption: "Meeting under the pandal, Gurundia, Sundargarh",
    },
    {
      src: `${BASE}/04-stage-group.jpg`,
      alt: "Participants gathered at the Sundargarh district meeting",
      caption: "Participants at the Sundargarh district meeting",
    },
    {
      src: `${BASE}/05-seated-farmers.jpg`,
      alt: "Farmers seated at the Sundargarh membership drive meeting",
      caption: "Farmers at the Sundargarh membership drive meeting",
    },
    {
      src: `${BASE}/08-participants.jpg`,
      alt: "Women and men participants at the Sundargarh district meeting",
      caption: "Participants at the Sundargarh district meeting",
    },
    {
      src: `${BASE}/02-programme-banner.jpg`,
      alt: "Bharatiya Krishak Samaj, Odisha programme banner displayed at the Sundargarh meeting",
      caption: "Programme banner at the Sundargarh meeting",
    },
    {
      src: `${BASE}/06-community-meal.jpg`,
      alt: "Community meal during the Sundargarh programme",
      caption: "Community meal during the Sundargarh programme",
    },
    {
      src: `${BASE}/07-annadata-queue.jpg`,
      alt: "Gathering for a community meal at the Sundargarh programme",
      caption: "Community meal at the Sundargarh programme",
    },
  ] satisfies MembershipDrivePhoto[],
  videos: [
    {
      src: `${BASE}/event-video-1.mp4`,
      caption:
        "Event video — District-Level Membership Drive Meeting, Hanuman Vatika Ground, Gurundia Block, Sundargarh, 2 October 2026",
    },
    {
      src: `${BASE}/event-video-2.mp4`,
      caption:
        "Event video — District-Level Membership Drive Meeting, Hanuman Vatika Ground, Gurundia Block, Sundargarh, 2 October 2026",
    },
    {
      src: `${BASE}/event-video-3.mp4`,
      caption:
        "Event video — District-Level Membership Drive Meeting, Hanuman Vatika Ground, Gurundia Block, Sundargarh, 2 October 2026",
    },
  ],
} as const;

export const jungleJaluchhe = {
  id: "jungle-jaluchhe",
  title: "JUNGLE JALUCHHE",
  focus:
    "The cultural heritage of Western Odisha, tribal traditions, folk culture, forests, livelihood, identity, women, youth and social responsibility.",
  credit: "Contribution of Smt. Nibedita Baliarsingh Nayak and her team.",
} as const;
