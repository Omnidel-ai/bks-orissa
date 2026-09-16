import type { Locale } from "@/lib/i18n";

/** Admin-only copy. Isolated from public Presence locale. Default: English. */
export type AdminCopy = {
  kicker: string;
  title: string;
  loginHint: string;
  adminKeyLabel: string;
  enter: string;
  leave: string;
  districtSelect: string;
  presenceStatusManual: string;
  autoActiveNote: string;
  dbNotConnected: string;
  statsTotal: string;
  statsPublished: string;
  statsDraft: string;
  addMember: string;
  searchPlaceholder: string;
  filter: string;
  filterAll: string;
  filterPublished: string;
  filterDraft: string;
  loadingMembers: string;
  emptyMembers: string;
  noExtraInfo: string;
  edit: string;
  publish: string;
  unpublish: string;
  moveUp: string;
  moveDown: string;
  archive: string;
  archiveConfirm: string;
  createTitle: string;
  editTitle: string;
  name: string;
  designation: string;
  village: string;
  block: string;
  area: string;
  bio: string;
  category: string;
  publishCheckbox: string;
  photo: string;
  photoHint: string;
  choosePhoto: string;
  clearPhoto: string;
  save: string;
  cancel: string;
  statusUpcoming: string;
  statusIndicated: string;
  statusActive: string;
  published: string;
  draft: string;
  language: string;
  verifying: string;
  errBadKey: string;
  errNameRequired: string;
  errLoad: string;
  errSave: string;
  errStatus: string;
  errPhoto: string;
  errArchive: string;
  okSaved: string;
  okStatus: string;
  okArchived: string;
  okPhoto: string;
  dbPendingOr: string;
};

const EN: AdminCopy = {
  kicker: "Odisha — 30 districts",
  title: "BKS member management",
  loginHint:
    "Sign in with an authorised admin key. The key stays only in this browser tab.",
  adminKeyLabel: "Admin key",
  enter: "Enter",
  leave: "Leave",
  districtSelect: "Select district",
  presenceStatusManual: "Presence status (manual)",
  autoActiveNote:
    "Published members automatically mark the district Active / green.",
  dbNotConnected:
    "Database is not connected yet. After migrations and environment setup, this panel will work.",
  statsTotal: "Total members",
  statsPublished: "Published",
  statsDraft: "Draft",
  addMember: "+ Add new member",
  searchPlaceholder: "Search by name / village / area",
  filter: "Filter",
  filterAll: "All",
  filterPublished: "Published",
  filterDraft: "Draft",
  loadingMembers: "Loading members…",
  emptyMembers: "No members yet. Add a new member.",
  noExtraInfo: "No additional details",
  edit: "Edit",
  publish: "Publish",
  unpublish: "Unpublish",
  moveUp: "Move up",
  moveDown: "Move down",
  archive: "Archive",
  archiveConfirm: "Archive this member? They will leave public Presence.",
  createTitle: "New member",
  editTitle: "Edit member",
  name: "Full name",
  designation: "Designation",
  village: "Village",
  block: "Block",
  area: "Area",
  bio: "Bio",
  category: "Category",
  publishCheckbox: "Publish on public Presence",
  photo: "Photo",
  photoHint: "JPEG / PNG / WebP, up to 5 MB.",
  choosePhoto: "Choose photo",
  clearPhoto: "Clear",
  save: "Save",
  cancel: "Cancel",
  statusUpcoming: "Upcoming",
  statusIndicated: "Indicated",
  statusActive: "Active",
  published: "Published",
  draft: "Draft",
  language: "Language",
  verifying: "Checking admin key…",
  errBadKey: "Admin key is not correct.",
  errNameRequired: "Enter a name.",
  errLoad: "Could not load data.",
  errSave: "Could not save member.",
  errStatus: "Could not update status.",
  errPhoto: "Photo upload failed.",
  errArchive: "Could not archive member.",
  okSaved: "Member saved.",
  okStatus: "District Presence status updated.",
  okArchived: "Member archived.",
  okPhoto: "Photo updated.",
  dbPendingOr:
    "Database is not connected yet. It will work after migration is applied.",
};

const OR: AdminCopy = {
  kicker: "ଓଡ଼ିଶା — ୩୦ ଜିଲ୍ଲା",
  title: "BKS ସଦସ୍ୟ ପରିଚାଳନା",
  loginHint:
    "ଅନୁମୋଦିତ ଆଡମିନ୍ କି ସହ ପ୍ରବେଶ କରନ୍ତୁ। କି କେବଳ ଏହି ବ୍ରାଉଜର୍ ଟ୍ୟାବରେ ମନେ ରଖାଯାଏ।",
  adminKeyLabel: "ଆଡମିନ୍ କି",
  enter: "ପ୍ରବେଶ କରନ୍ତୁ",
  leave: "ପ୍ରସ୍ଥାନ",
  districtSelect: "ଜିଲ୍ଲା ଚୟନ",
  presenceStatusManual: "Presence ସ୍ଥିତି (ମାନୁଆଲ୍)",
  autoActiveNote: "ପ୍ରକାଶିତ ସଦସ୍ୟ ଥିଲେ ସ୍ୱୟଂ Active/Green ହୁଏ।",
  dbNotConnected:
    "ଡାଟାବେସ ଏପର୍ଯ୍ୟନ୍ତ ସଂଯୋଗ ହୋଇନାହିଁ। ମାଇଗ୍ରେସନ୍ ଓ `.env.local` ସେଟ୍ ହେବା ପରେ କାମ କରିବ।",
  statsTotal: "ମୋଟ ସଦସ୍ୟ",
  statsPublished: "ପ୍ରକାଶିତ",
  statsDraft: "ଖସଡ଼ା",
  addMember: "+ ନୂଆ ସଦସ୍ୟ ଯୋଗ କରନ୍ତୁ",
  searchPlaceholder: "ନାମ / ଗାଁ / ଅଞ୍ଚଳ ଦ୍ୱାରା ଖୋଜନ୍ତୁ",
  filter: "ଫିଲ୍ଟର",
  filterAll: "ସବୁ",
  filterPublished: "ପ୍ରକାଶିତ",
  filterDraft: "ଖସଡ଼ା",
  loadingMembers: "ସଦସ୍ୟ ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି...",
  emptyMembers: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସଦସ୍ୟ ନାହାନ୍ତି। ନୂଆ ସଦସ୍ୟ ଯୋଗ କରନ୍ତୁ।",
  noExtraInfo: "ଅତିରିକ୍ତ ତଥ୍ୟ ନାହିଁ",
  edit: "ସମ୍ପାଦନା",
  publish: "ପ୍ରକାଶ କରନ୍ତୁ",
  unpublish: "ଲୁଚାନ୍ତୁ",
  moveUp: "ଉପରକୁ",
  moveDown: "ତଳକୁ",
  archive: "ଅଭିଲେଖ",
  archiveConfirm: "ଏହି ସଦସ୍ୟଙ୍କୁ ଅଭିଲେଖ କରିବେ? ସେ ସାର୍ବଜନୀନ Presence ରୁ ହଟିଯିବେ।",
  createTitle: "ନୂଆ ସଦସ୍ୟ",
  editTitle: "ସଦସ୍ୟ ସମ୍ପାଦନା",
  name: "ପୂରା ନାମ",
  designation: "ପଦବୀ",
  village: "ଗାଁ",
  block: "ବ୍ଲକ",
  area: "ଅଞ୍ଚଳ",
  bio: "ପରିଚୟ",
  category: "ବର୍ଗ",
  publishCheckbox: "ସାର୍ବଜନୀନ Presence ରେ ପ୍ରକାଶ କରନ୍ତୁ",
  photo: "ଫଟୋ",
  photoHint: "JPEG / PNG / WebP, 5 MB ପର୍ଯ୍ୟନ୍ତ।",
  choosePhoto: "ଫଟୋ ବାଛନ୍ତୁ",
  clearPhoto: "ସଫା",
  save: "ସଂରକ୍ଷଣ",
  cancel: "ବାତିଲ୍",
  statusUpcoming: "Upcoming",
  statusIndicated: "Indicated",
  statusActive: "Active",
  published: "ପ୍ରକାଶିତ",
  draft: "ଖସଡ଼ା",
  language: "ଭାଷା",
  verifying: "ଆଡମିନ୍ କି ଯାଞ୍ଚ ହେଉଛି…",
  errBadKey: "ଆଡମିନ୍ କି ସଠିକ୍ ନୁହେଁ।",
  errNameRequired: "ନାମ ଲେଖନ୍ତୁ।",
  errLoad: "ତଥ୍ୟ ଲୋଡ୍ କରାଯାଇପାରିଲା ନାହିଁ।",
  errSave: "ସଦସ୍ୟ ସଂରକ୍ଷଣ ବିଫଳ।",
  errStatus: "ସ୍ଥିତି ଅଦ୍ୟତନ ବିଫଳ।",
  errPhoto: "ଫଟୋ ଅପଲୋଡ୍ ବିଫଳ।",
  errArchive: "ଅଭିଲେଖ ବିଫଳ।",
  okSaved: "ସଦସ୍ୟ ସଂରକ୍ଷିତ।",
  okStatus: "ଜିଲ୍ଲା Presence ସ୍ଥିତି ଅଦ୍ୟତନ ହୋଇଛି।",
  okArchived: "ସଦସ୍ୟ ଅଭିଲେଖ ହୋଇଛି।",
  okPhoto: "ଫଟୋ ଅଦ୍ୟତନ ହୋଇଛି।",
  dbPendingOr:
    "ଡାଟାବେସ ଏପର୍ଯ୍ୟନ୍ତ ସଂଯୋଗ ହୋଇନାହିଁ। ମାଇଗ୍ରେସନ୍ ପ୍ରୟୋଗ ପରେ କାମ କରିବ।",
};

const HI: AdminCopy = {
  kicker: "ओडिशा — ३० ज़िले",
  title: "BKS सदस्य प्रबंधन",
  loginHint:
    "अधिकृत एडमिन कुंजी से प्रवेश करें। कुंजी केवल इस ब्राउज़र टैब में रहती है।",
  adminKeyLabel: "एडमिन कुंजी",
  enter: "प्रवेश करें",
  leave: "बाहर जाएँ",
  districtSelect: "ज़िला चुनें",
  presenceStatusManual: "Presence स्थिति (मैनुअल)",
  autoActiveNote:
    "प्रकाशित सदस्य होने पर ज़िला स्वतः Active / हरा हो जाता है।",
  dbNotConnected:
    "डेटाबेस अभी जुड़ा नहीं है। माइग्रेशन और पर्यावरण सेटअप के बाद यह पैनल काम करेगा।",
  statsTotal: "कुल सदस्य",
  statsPublished: "प्रकाशित",
  statsDraft: "मसौदा",
  addMember: "+ नया सदस्य जोड़ें",
  searchPlaceholder: "नाम / गाँव / क्षेत्र से खोजें",
  filter: "फ़िल्टर",
  filterAll: "सभी",
  filterPublished: "प्रकाशित",
  filterDraft: "मसौदा",
  loadingMembers: "सदस्य लोड हो रहे हैं…",
  emptyMembers: "अभी कोई सदस्य नहीं है। नया सदस्य जोड़ें।",
  noExtraInfo: "अतिरिक्त जानकारी नहीं",
  edit: "संपादन",
  publish: "प्रकाशित करें",
  unpublish: "अप्रकाशित करें",
  moveUp: "ऊपर",
  moveDown: "नीचे",
  archive: "अभिलेख",
  archiveConfirm: "इस सदस्य को अभिलेख करें? वे सार्वजनिक Presence से हट जाएँगे।",
  createTitle: "नया सदस्य",
  editTitle: "सदस्य संपादन",
  name: "पूरा नाम",
  designation: "पदनाम",
  village: "गाँव",
  block: "ब्लॉक",
  area: "क्षेत्र",
  bio: "परिचय",
  category: "श्रेणी",
  publishCheckbox: "सार्वजनिक Presence पर प्रकाशित करें",
  photo: "फ़ोटो",
  photoHint: "JPEG / PNG / WebP, अधिकतम 5 MB।",
  choosePhoto: "फ़ोटो चुनें",
  clearPhoto: "साफ़ करें",
  save: "सहेजें",
  cancel: "रद्द करें",
  statusUpcoming: "Upcoming",
  statusIndicated: "Indicated",
  statusActive: "Active",
  published: "प्रकाशित",
  draft: "मसौदा",
  language: "भाषा",
  verifying: "एडमिन कुंजी जाँची जा रही है…",
  errBadKey: "एडमिन कुंजी सही नहीं है।",
  errNameRequired: "नाम लिखें।",
  errLoad: "डेटा लोड नहीं हो सका।",
  errSave: "सदस्य सहेजा नहीं जा सका।",
  errStatus: "स्थिति अपडेट नहीं हो सकी।",
  errPhoto: "फ़ोटो अपलोड विफल।",
  errArchive: "अभिलेख विफल।",
  okSaved: "सदस्य सहेजा गया।",
  okStatus: "ज़िला Presence स्थिति अपडेट हुई।",
  okArchived: "सदस्य अभिलेख किया गया।",
  okPhoto: "फ़ोटो अपडेट हुई।",
  dbPendingOr:
    "डेटाबेस अभी जुड़ा नहीं है। माइग्रेशन लागू होने के बाद काम करेगा।",
};

const BY_LOCALE: Record<Locale, AdminCopy> = {
  en: EN,
  or: OR,
  hi: HI,
};

export function adminT(locale: Locale): AdminCopy {
  return BY_LOCALE[locale] ?? EN;
}

export const ADMIN_LOCALE_STORAGE = "bks-odisha-admin-locale";
