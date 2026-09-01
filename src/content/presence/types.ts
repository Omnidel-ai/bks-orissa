export type I18nText = { or: string; en: string; hi: string };

/** District / presence lifecycle on the public map. */
export type PresenceStatus = "active" | "indicated" | "upcoming";

export type StateUnit = {
  id: string;
  slug: string;
  officialName: string;
  name: I18nText;
};

/**
 * Future-ready block layer. Not published yet — kept for State → District → Block → Member.
 */
export type BlockUnit = {
  id: string;
  slug: string;
  districtId: string;
  officialName: string;
  name: I18nText;
};

export type District = {
  id: string;
  slug: string;
  stateId: string;
  officialName: string;
  name: I18nText;
  status: PresenceStatus;
  summary?: I18nText;
};

export type MemberLocality = {
  village?: string;
  post?: string;
  policeStation?: string;
  block?: string;
  pin?: string;
  district?: string;
};

export type TeamMember = {
  id: string;
  slug: string;
  districtId: string;
  blockId?: string;
  name: string;
  /** Only set when an official BKS designation is verified. */
  designation?: I18nText;
  photo?: string;
  publicBackground?: I18nText;
  locality?: MemberLocality;
  professionalBackground?: I18nText;
  agriculturalExperience?: I18nText;
  responsibilities?: I18nText;
  achievements?: I18nText;
};
