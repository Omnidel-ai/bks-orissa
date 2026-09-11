export const LOCALES = ["en", "hi", "or"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  or: "ଓଡ଼ିଆ",
};

export const LANG_SHORT: Record<Locale, string> = {
  en: "EN",
  hi: "HI",
  or: "OD",
};

export type Dict = {
  brand: string;
  brandSub: string;
  nav: {
    about: string;
    odisha: string;
    leadership: string;
    presence: string;
    nationalPresident: string;
    media: string;
    agriculture: string;
    apply: string;
    aboutGroup: string;
    learnGroup: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    caption: string;
  };
  home: {
    aboutEyebrow: string;
    aboutTitle: string;
    aboutBody: string;
    aboutCta: string;
    odishaEyebrow: string;
    odishaTitle: string;
    odishaBody: string;
    odishaCta: string;
    agriEyebrow: string;
    agriTitle: string;
    agriBody: string;
    agriCta: string;
    leadershipEyebrow: string;
    leadershipTitle: string;
    leadershipBody: string;
    leadershipCta: string;
    presenceEyebrow: string;
    presenceTitle: string;
    presenceBody: string;
    presenceCta: string;
    storyEyebrow: string;
    storyTitle: string;
    storyLead: string;
    storyLetterCaption: string;
    storyJagannathCaption: string;
    storyHeroCaption: string;
    mediaEyebrow: string;
    mediaTitle: string;
    mediaBody: string;
    mediaCta: string;
    joinEyebrow: string;
    joinTitle: string;
    joinBody: string;
    joinCta: string;
  };
  explore: { eyebrow: string; title: string };
  about: {
    eyebrow: string;
    title: string;
    whoTitle: string;
    whoBody: string;
    historyTitle: string;
    historyParas: string[];
    standTitle: string;
    standIntro: string;
    objectivesTitle: string;
    objectives: string[];
    workTitle: string;
    workBody: string;
    reachTitle: string;
    reachBody: string;
    whyOdishaTitle: string;
    whyOdishaBody: string;
    odishaLinkNote: string;
  };
  odishaPage: { eyebrow: string; title: string; paras: string[] };
  agriculture: {
    eyebrow: string;
    title: string;
    lead: string;
    landscapeTitle: string;
    landscapeBody: string;
    cropsTitle: string;
    cropsBody: string;
    smallTitle: string;
    smallBody: string;
    irrigationTitle: string;
    irrigationBody: string;
    climateTitle: string;
    climateBody: string;
    techTitle: string;
    techBody: string;
    bksTitle: string;
    bksBody: string;
    sourceNote: string;
    stats: { label: string; value: string; note: string }[];
  };
  leadership: {
    eyebrow: string;
    title: string;
    lead: string;
    nationalLabel: string;
    nationalBody: string;
    nationalRoleCaption: string;
    stateLabel: string;
    viewProfile: string;
    fullNationalProfile: string;
  };
  nibedita: {
    name: string;
    roleNote: string;
    intro: string;
    leadershipTitle: string;
    leadershipBody: string;
    areasTitle: string;
    areas: string[];
    experienceTitle: string;
    experienceBody: string;
    odishaTitle: string;
    odishaBody: string;
    mediaTitle: string;
    mediaBody: string;
    educationTitle: string;
    educationBody: string;
    connectionTitle: string;
    connectionBody: string;
    summary: string;
    education: string;
    work: string;
    trust: string;
  };
  presence: {
    eyebrow: string;
    title: string;
    lead: string;
    empty: string;
    stateLabel: string;
    districtsLabel: string;
    architectureNote: string;
  };
  media: {
    eyebrow: string;
    title: string;
    lead: string;
    odishaTalksTitle: string;
    odishaTalksBody: string;
    watch: string;
    meetingHandoverCaption: string;
    meetingReviewCaption: string;
    napSeminarTitle: string;
    napSeminarMeta: string;
    napSeminarIntro: string;
    napSeminarLeadersTitle: string;
    napSeminarLeaders: string[];
    napSeminarCaptionGroup: string;
    napSeminarCaptionBooklet: string;
    napSeminarCaptionStage: string;
    bandeFelicitationTitle: string;
    bandeFelicitationBody: string;
    bandeFelicitationCaption: string;
  };
  footer: { quote: string; org: string };
  common: {
    backHome: string;
    comingSoon: string;
    menu: string;
    close: string;
    readMore: string;
  };
};

const en: Dict = {
  brand: "Bharatiya Krishak Samaj",
  brandSub: "Odisha",
  nav: {
    about: "About BKS",
    odisha: "Odisha",
    leadership: "Leadership",
    presence: "Presence",
    nationalPresident: "National President",
    media: "Media",
    agriculture: "Agriculture",
    apply: "Apply",
    aboutGroup: "About",
    learnGroup: "Learn & media",
    home: "Home",
  },
  hero: {
    eyebrow: "Bharatiya Krishak Samaj, Odisha",
    title: "Farmer dignity, self-reliant agriculture and practical knowledge for Odisha.",
    lead: "The Odisha chapter of Bharatiya Krishak Samaj works in the same national spirit as our sister chapters — rooted in the annadata, open to partners, and built for the field.",
    primaryCta: "Explore BKS Odisha",
    secondaryCta: "Meet the leadership",
    caption: "National President Shri Krishan Bir Choudhary with Smt. Nibedita Nayak Baliarsingh — BKS Odisha.",
  },
  home: {
    aboutEyebrow: "About BKS",
    aboutTitle: "A national farmer organisation for the annadata.",
    aboutBody: "Bharatiya Krishak Samaj carries farmer rights, agricultural income, seed sovereignty and just agri-policy into public debate — with state chapters that work in local languages and districts.",
    aboutCta: "Read about BKS",
    odishaEyebrow: "Odisha chapter",
    odishaTitle: "BKS Odisha — sister chapter of the national organisation.",
    odishaBody: "Published as a companion state platform to BKS West Bengal: same brand, same organisational connection to the National President, and verification-first Odisha content.",
    odishaCta: "Open Odisha chapter",
    agriEyebrow: "Agriculture",
    agriTitle: "Odisha’s farm landscape, in context.",
    agriBody: "Cultivable land, smallholder reality, agro-climatic zones and the policy questions that shape farmer livelihoods — summarised from public Odisha agriculture sources.",
    agriCta: "Explore agriculture",
    leadershipEyebrow: "Leadership",
    leadershipTitle: "National connection and Odisha leadership.",
    leadershipBody: "Meet the National President and the verified Odisha leadership featured on this chapter site — without inventing designations.",
    leadershipCta: "Meet leadership",
    presenceEyebrow: "Our Presence",
    presenceTitle: "District presence, published only when verified.",
    presenceBody: "State → District → Block → Member architecture matches BKS West Bengal. Odisha panels open when official names are supplied.",
    presenceCta: "View presence",
    storyEyebrow: "In focus",
    storyTitle: "Odisha — people, leadership and organisation.",
    storyLead: "Approved photographs of national and Odisha leadership, used as chapter storytelling — not as a random gallery.",
    storyLetterCaption: "National President Shri Krishan Bir Choudhary with Smt. Nibedita Nayak Baliarsingh.",
    storyJagannathCaption: "National President Shri Krishan Bir Choudhary in an Odisha cultural setting.",
    storyHeroCaption: "National President with Smt. Nibedita Nayak Baliarsingh — BKS Odisha.",
    mediaEyebrow: "Media",
    mediaTitle: "Verified Odisha media room.",
    mediaBody: "Public interviews and references for farmers, partners and journalists — starting with Odisha Talks.",
    mediaCta: "Open media",
    joinEyebrow: "Join",
    joinTitle: "Apply to engage with the Odisha chapter.",
    joinBody: "A minimal application path for chapter engagement. Formal roles are published only after official verification.",
    joinCta: "Apply now",
  },
  explore: {
    eyebrow: "Explore",
    title: "A public chapter platform for farmers, partners and institutions in Odisha.",
  },
  about: {
    eyebrow: "About BKS",
    title: "A national farmer organisation carrying the annadata’s voice.",
    whoTitle: "Who we are",
    whoBody:
      "Bharatiya Krishak Samaj / Bharat Krishak Samaj (BKS) is a national farmers’ organisation focused on farmer prosperity, farmer dignity, sustainable agriculture and inclusive food systems. It works through policy advocacy, farmer education, training, knowledge exchange, value addition, better market linkages and farmer entrepreneurship — so the annadata’s voice reaches ministries, markets and public debate.",
    historyTitle: "Our history",
    historyParas: [
      "The organisation’s founding story is rooted in the mid-1950s. Authoritative records place formal registration in 1955 under Dr. Panjabrao S. Deshmukh, in the context of a national farmers’ convention movement.",
      "Public and archival sources use closely related names — Bharat Krishak Samaj (Farmers’ Forum, India), Bharatiya Krishak Samaj, and Bharatiya Kisan Samaj. Across decades, the work has included farmer conventions, agricultural fairs, training, publications, farmer–government dialogue and policy advocacy.",
      "Today, Krishan Bir Chaudhary’s current public title is President, Bharatiya Krishak Samaj.",
    ],
    standTitle: "What we stand for",
    standIntro:
      "BKS stands with farmers as keepers of soil, seed, culture and national resilience — not as an adjustable variable in trade or corporate strategy.",
    objectivesTitle: "Core objectives",
    objectives: [
      "Legal guarantee of Minimum Support Price and fair market outcomes",
      "Seed sovereignty and opposition to illegal patents / royalty regimes",
      "Natural farming, IPM, and practical field knowledge",
      "Farmer dignity and swadeshi agricultural strength",
      "Training, demonstrations and usable technology for the field",
      "Stronger market linkages, value addition and farmer entrepreneurship",
    ],
    workTitle: "How we work with farmers",
    workBody:
      "BKS works through organisation and dialogue: farmer conventions and fairs, training and knowledge exchange, publications, and structured feedback into agri-policy. The aim is practical — income growth, climate-aware farming, market access and a clearer public voice for small and marginal cultivators.",
    reachTitle: "National reach",
    reachBody:
      "Under President Krishan Bir Chaudhary, the organisation engages MSP and natural-farming policy, seed and pesticide legislation, WTO and food-sovereignty debates, and state chapter building — including sister platforms in West Bengal and Odisha — with public communication through Kisan Ki Awaaz and national media.",
    whyOdishaTitle: "Why Odisha",
    whyOdishaBody:
      "Odisha’s farm economy is built on rice, diversified crops, horticulture, fisheries and forest-linked livelihoods — with a large share of small and marginal farmers across ten agro-climatic zones. BKS Odisha exists so national farmer priorities meet this state reality: knowledge, markets, value addition, climate resilience and a verified chapter platform linked to the same National President.",
    odishaLinkNote: "BKS Odisha is published as a sister chapter site of BKS West Bengal, linked to the same National President and national farmer mission.",
  },
  odishaPage: {
    eyebrow: "Odisha chapter",
    title: "BKS Odisha — the state chapter of Bharatiya Krishak Samaj.",
    paras: [
      "BKS Odisha is published as a sister chapter site of BKS West Bengal: same brand, same colours, and the same organisational connection to National President Shri Krishan Bir Chaudhary.",
      "The chapter platform is built for farmers, partners and institutions in Odisha — carrying national priorities such as farmer dignity, fair price, seed sovereignty and practical knowledge into a state context shaped by rice, horticulture, fisheries, forest-linked livelihoods and a large smallholder majority.",
      "Agriculture in Odisha is not a side note here: it is the reason the chapter exists. See the Agriculture page for the public land, climate and livelihood facts that frame this work.",
      "Verified Odisha presence, media and leadership details are added only as they are formally shared. No invented district lists, designations or claims appear on this site.",
    ],
  },
  agriculture: {
    eyebrow: "Agriculture",
    title: "Odisha agriculture — land, farmers and agro-climatic reality.",
    lead: "A concise public summary of Odisha’s farm landscape to ground BKS Odisha’s work in field facts — drawn from Odisha agriculture policy material summarised by the Directorate of Horticulture.",
    landscapeTitle: "Land and cultivation",
    landscapeBody: "Odisha has a large cultivable base within its total geographical area. Public agriculture-policy summaries record about 64.09 lakh hectares of cultivable land and about 61.50 lakh hectares under cultivation — figures that frame how much of the state remains tied to farm livelihoods.",
    cropsTitle: "Crops and livelihood base",
    cropsBody: "Rice remains the principal crop in Odisha’s kharif season, with pulses, oilseeds, fibres, sugarcane, vegetables, spices and horticulture supporting diversified farm incomes across districts. Horticulture is repeatedly noted as a pathway to raise returns where agro-climatic conditions allow.",
    smallTitle: "Small and marginal farmers",
    smallBody: "Small and marginal farmers constitute about 83% of Odisha’s farming community in the same public summaries, with average holdings near 1.25 hectares. Policy and organisation work must therefore speak to fragmented holdings, input access and market reach — not only aggregate production.",
    irrigationTitle: "Irrigation and water stress",
    irrigationBody: "State agriculture summaries also note acidic soils on a large share of cultivable land, with salinity and waterlogging affecting smaller but critical areas. Irrigation potential and monsoon dependence shape both kharif rice outcomes and rabi cropping choices.",
    climateTitle: "Ten agro-climatic zones",
    climateBody: "Odisha is divided into 10 agro-climatic zones based on soil structure, humidity, elevation, topography, vegetation, rainfall and related factors. Any practical farmer programme in the state must respect this zonal diversity rather than assume a single cropping model.",
    techTitle: "Knowledge and technology",
    techBody: "For BKS, technology matters when it reaches the annadata in usable form: natural and chemical-conscious practices, IPM-aligned field knowledge, seed strength, and local-language guidance that fits Odisha’s smallholder majority.",
    bksTitle: "Why BKS Odisha matters",
    bksBody:
      "Odisha’s agricultural reality — small holdings, monsoon and irrigation stress, zonal diversity, and the need for markets and value addition — is exactly where a farmers’ organisation must speak clearly. BKS Odisha connects that field reality to national priorities: income growth, climate-resilient and natural farming, farmer training, usable technology, youth and women in agriculture, and structured farmer feedback into policy. Chapter details are published only when verified; the organisational purpose is not.",
    sourceNote: "Key landholding and agro-climatic figures above follow Odisha Agriculture Policy summaries republished by the Directorate of Horticulture (odihort.nic.in/agriculturepolicy). Exact survey years can vary across republications; treat the numbers as the official summary figures cited there, not as newly surveyed statistics invented for this site.",
    stats: [
      { label: "Cultivable area", value: "~64.09 lakh ha", note: "Of about 155.711 lakh ha total geographical area (~41.16%), per Odisha agriculture policy summary via Directorate of Horticulture." },
      { label: "Cultivated area", value: "~61.50 lakh ha", note: "Total cultivated area cited in the same Odisha agriculture policy summary." },
      { label: "Small & marginal farmers", value: "~83%", note: "Share of the farming community; average holding about 1.25 ha in the same summary." },
      { label: "Agro-climatic zones", value: "10", note: "Zones defined by soil, humidity, elevation, topography, vegetation, rainfall and related factors." },
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    title: "National connection and Odisha leadership.",
    lead: "The chapter remains linked to the National President, while Odisha leadership is featured through verified public material.",
    nationalLabel: "National President",
    nationalBody: "Shri Krishan Bir Choudhary, President of Bharatiya Krishak Samaj. Full profile is maintained on the dedicated National President site.",
    nationalRoleCaption: "President, Bharatiya Krishak Samaj",
    stateLabel: "Odisha leadership",
    viewProfile: "View full profile",
    fullNationalProfile: "Full National President profile",
  },
  nibedita: {
    name: "Smt. Nibedita Nayak Baliarsingh",
    roleNote: "Featured Odisha leadership on BKS Odisha. Formal BKS designation will be published only after official verification.",
    intro: "Smt. Nibedita Nayak Baliarsingh is publicly associated with women empowerment, community development, culture and social transformation work in Odisha, and has been featured in Odisha Talks.",
    leadershipTitle: "Leadership presence",
    leadershipBody: "On BKS Odisha she is presented as featured Odisha leadership connected to the chapter’s public platform and to National President Shri Krishan Bir Choudhary. No invented organisational title is claimed here.",
    areasTitle: "Areas of public work",
    areas: ["Women empowerment", "Rural and community development", "Social development", "Public communication"],
    experienceTitle: "Professional experience",
    experienceBody: "Odisha Talks material describes over two decades of consulting, public relations, and gender, youth and socio-cultural empowerment work across associations and community platforms.",
    odishaTitle: "Odisha community work",
    odishaBody: "Through Sthapana Charitable Trust, she is associated with community cultural initiatives in western Odisha, including Kirtan Mandalis and Bhagavad Tungis, as stated in Odisha Talks material.",
    mediaTitle: "Public media",
    mediaBody: "Her verified public interview — “Exclusive talk with Nibedita Nayak Baliarsingh” — is published by Odisha Talks and listed in the BKS Odisha media room.",
    educationTitle: "Education",
    educationBody: "As stated in Odisha Talks material, she holds a Master’s degree background in History, Public Health and Education from Utkal University.",
    connectionTitle: "Connection to BKS Odisha",
    connectionBody: "BKS Odisha features her as part of the chapter’s verified public leadership face alongside the National President. Formal BKS office designation, if any, will be added only after official confirmation.",
    summary: "Publicly associated with women empowerment, community development, culture and social transformation work in Odisha. Featured in Odisha Talks.",
    education: "Holds a Master's degree background in History, Public Health and Education from Utkal University (as stated in Odisha Talks material).",
    work: "Over two decades of consulting, public relations, and gender / youth / socio-cultural empowerment work across associations and community platforms.",
    trust: "Through Sthapana Charitable Trust, associated with community cultural initiatives in western Odisha, including Kirtan Mandalis and Bhagavad Tungis (as stated in Odisha Talks material).",
  },
  presence: {
    eyebrow: "Our Presence",
    title: "Odisha geographic presence.",
    lead: "District and block presence will be published only with verified names and details — same discipline as BKS West Bengal.",
    empty: "No public Odisha district representative list has been published yet.",
    stateLabel: "Odisha",
    districtsLabel: "Districts",
    architectureNote: "Architecture matches the West Bengal chapter: State → District → Block → Member. District panels open here when verified names are supplied.",
  },
  media: {
    eyebrow: "Media",
    title: "BKS Odisha media room",
    lead: "Verified stories and public references from BKS Odisha. Built for farmers, partners, journalists and public readers.",
    odishaTalksTitle: "Odisha Talks — Exclusive talk with Nibedita Nayak Baliarsingh",
    odishaTalksBody: "Verified interview published by Odisha Talks.",
    watch: "Watch on YouTube",
    meetingHandoverCaption:
      "Formal document presentation with Smt. Nibedita Nayak Baliarsingh and BKS Odisha colleagues.",
    meetingReviewCaption:
      "Leadership meeting — reviewing an official document with BKS Odisha representatives.",
    napSeminarTitle: 'Report on seminar — "National Agricultural Policy"',
    napSeminarMeta:
      "Organised by Bharatiya Krishak Samaj, Odisha · Supported by Sthapna Charitable Trust · 10 September 2026",
    napSeminarIntro:
      "Bharatiya Krishak Samaj, Odisha organised a seminar on the National Agricultural Policy, bringing together state leadership, district presidents and farmer representatives for discussion on policy priorities for Odisha agriculture.",
    napSeminarLeadersTitle: "Leaders and speakers featured in the programme",
    napSeminarLeaders: [
      "Shri Krishan Bir Chaudhary — Member, Prime Minister's High Level Committee on MSP",
      "Smt. Nibedita Baliarsingh Nayak — State President (Women), Bharatiya Krishak Samaj, Odisha",
      "Sri Saroj Kumar Bhuyan — Secretary, Odisha SEVAC; Coordinator, Bharatiya Krishak Samaj, Odisha",
      "Sri Tapan Kumar Dehury — Director, Odisha SEVAC; Vice President, Bharatiya Krishak Samaj, Odisha",
      "Smt. Sandhya Rani Kissan — District President, Bharatiya Krishak Samaj (Women Wing), Deogarh",
      "Sri Malaya Kumar Deep — District President, Bharatiya Krishak Samaj, Kalahandi",
      "Sri Kunja Bihari Samant — District President, Bharatiya Krishak Samaj, Sundargarh",
      "Sri Mahendra Thakur — District President, Bharatiya Krishak Samaj, Deogarh",
    ],
    napSeminarCaptionGroup:
      "National Agricultural Policy seminar — Bharatiya Krishak Samaj, Odisha, 10 September 2026.",
    napSeminarCaptionBooklet:
      "Programme booklet release on stage at the National Agricultural Policy seminar.",
    napSeminarCaptionStage:
      "Leaders on stage at the National Agricultural Policy seminar, Bharatiya Krishak Samaj, Odisha.",
    bandeFelicitationTitle: "Felicitation at BANDE ODISHA",
    bandeFelicitationBody:
      "Felicitation Program of Nibedita Baliarsingh Nayak, State President, Bharatiya Krishak Samaj — Women Odisha, at the prestigious programme BANDE ODISHA — the signature programme supported by the Odisha Government.",
    bandeFelicitationCaption:
      "Felicitation of Smt. Nibedita Baliarsingh Nayak at BANDE ODISHA.",
  },
  footer: {
    quote: "The farmer is the keeper of soil, seed, culture and national resilience.",
    org: "Bharatiya Krishak Samaj, Odisha",
  },
  common: {
    backHome: "Back to home",
    comingSoon: "Coming soon",
    menu: "Menu",
    close: "Close",
    readMore: "Read more",
  },
};


/** Hindi UI chrome + key titles; longer bodies may reuse English until full translation is supplied. */
const hi: Dict = {
  ...en,
  brand: "Bharatiya Krishak Samaj",
  brandSub: "Odisha",
  nav: {
    about: "BKS के बारे में",
    odisha: "ओडिशा",
    leadership: "नेतृत्व",
    presence: "उपस्थिति",
    nationalPresident: "राष्ट्रीय अध्यक्ष",
    media: "मीडिया",
    agriculture: "कृषि",
    apply: "आवेदन",
    aboutGroup: "परिचय",
    learnGroup: "शिक्षा व मीडिया",
    home: "होम",
  },
  hero: {
    eyebrow: "Bharatiya Krishak Samaj, Odisha",
    title: "ओडिशा के लिए किसान की गरिमा, आत्मनिर्भर कृषि और व्यावहारिक ज्ञान।",
    lead: "भारतीय कृषक समाज का ओडिशा अध्याय उसी राष्ट्रीय भावना से काम करता है — अन्नदाता के साथ, सहयोगियों के लिए खुला, और खेत के लिए बना।",
    primaryCta: "BKS ओडिशा जानें",
    secondaryCta: "नेतृत्व से मिलें",
    caption: "राष्ट्रीय अध्यक्ष श्री कृष्ण बीर चौधरी और श्रीमती निबेदिता नायक बलियारसिंह — BKS ओडिशा।",
  },
  home: {
    ...en.home,
    aboutEyebrow: "BKS के बारे में",
    aboutTitle: "अन्नदाता के लिए राष्ट्रीय किसान संगठन।",
    aboutCta: "BKS पढ़ें",
    odishaEyebrow: "ओडिशा अध्याय",
    odishaTitle: "BKS ओडिशा — राष्ट्रीय संगठन का बहन-अध्याय।",
    odishaCta: "ओडिशा अध्याय खोलें",
    agriEyebrow: "कृषि",
    agriTitle: "ओडिशा का कृषि परिदृश्य, संदर्भ सहित।",
    agriCta: "कृषि जानें",
    leadershipEyebrow: "नेतृत्व",
    leadershipTitle: "राष्ट्रीय जुड़ाव और ओडिशा नेतृत्व।",
    leadershipCta: "नेतृत्व से मिलें",
    presenceEyebrow: "हमारी उपस्थिति",
    presenceTitle: "ज़िला उपस्थिति — केवल सत्यापन के बाद।",
    presenceCta: "उपस्थिति देखें",
    storyEyebrow: "फोकस में",
    storyTitle: "ओडिशा — लोग, नेतृत्व और संगठन।",
    mediaEyebrow: "मीडिया",
    mediaTitle: "सत्यापित ओडिशा मीडिया कक्ष।",
    mediaCta: "मीडिया खोलें",
    joinEyebrow: "जुड़ें",
    joinTitle: "ओडिशा अध्याय से जुड़ने के लिए आवेदन करें।",
    joinCta: "अभी आवेदन करें",
  },
  explore: {
    eyebrow: "जानें",
    title: "ओडिशा में किसानों, भागीदारों और संस्थानों के लिए सार्वजनिक अध्याय मंच।",
  },
  about: {
    ...en.about,
    eyebrow: "BKS के बारे में",
    title: "अन्नदाता की आवाज़ ले जाने वाला राष्ट्रीय किसान संगठन।",
    whoTitle: "हम कौन हैं",
    historyTitle: "हमारा इतिहास",
    standTitle: "हम किसके पक्ष में हैं",
    objectivesTitle: "मुख्य उद्देश्य",
    workTitle: "किसानों के साथ हमारा काम",
    reachTitle: "राष्ट्रीय पहुँच",
    whyOdishaTitle: "ओडिशा क्यों",
  },
  odishaPage: {
    ...en.odishaPage,
    eyebrow: "ओडिशा अध्याय",
    title: "BKS ओडिशा — भारतीय कृषक समाज का राज्य अध्याय।",
  },
  agriculture: {
    ...en.agriculture,
    eyebrow: "कृषि",
    title: "ओडिशा कृषि — भूमि, किसान और कृषि-जलवायु वास्तविकता।",
  },
  leadership: {
    eyebrow: "नेतृत्व",
    title: "राष्ट्रीय जुड़ाव और ओडिशा नेतृत्व।",
    lead: "अध्याय राष्ट्रीय अध्यक्ष से जुड़ा रहता है, और ओडिशा नेतृत्व सत्यापित सार्वजनिक सामग्री के माध्यम से प्रस्तुत है।",
    nationalLabel: "राष्ट्रीय अध्यक्ष",
    nationalBody: "श्री कृष्ण बीर चौधरी, भारतीय कृषक समाज के अध्यक्ष। पूर्ण प्रोफ़ाइल राष्ट्रीय अध्यक्ष की समर्पित साइट पर उपलब्ध है।",
    nationalRoleCaption: "अध्यक्ष, भारतीय कृषक समाज",
    stateLabel: "ओडिशा नेतृत्व",
    viewProfile: "पूर्ण प्रोफ़ाइल देखें",
    fullNationalProfile: "पूर्ण राष्ट्रीय अध्यक्ष प्रोफ़ाइल",
  },
  nibedita: {
    ...en.nibedita,
    name: "श्रीमती निबेदिता नायक बलियारसिंह",
    roleNote: "BKS ओडिशा पर विशेष ओडिशा नेतृत्व। औपचारिक BKS पद केवल आधिकारिक सत्यापन के बाद प्रकाशित होगा।",
    leadershipTitle: "नेतृत्व उपस्थिति",
    areasTitle: "सार्वजनिक कार्य के क्षेत्र",
    experienceTitle: "पेशेवर अनुभव",
    odishaTitle: "ओडिशा सामुदायिक कार्य",
    mediaTitle: "सार्वजनिक मीडिया",
    educationTitle: "शिक्षा",
    connectionTitle: "BKS ओडिशा से जुड़ाव",
  },
  presence: {
    ...en.presence,
    eyebrow: "हमारी उपस्थिति",
    title: "ओडिशा की भौगोलिक उपस्थिति।",
    stateLabel: "ओडिशा",
    districtsLabel: "ज़िले",
  },
  media: {
    ...en.media,
    eyebrow: "मीडिया",
    title: "BKS ओडिशा मीडिया कक्ष",
    watch: "YouTube पर देखें",
    meetingHandoverCaption:
      "श्रीमती निबेदिता नायक बलियारसिंह और BKS ओडिशा सहयोगियों के साथ औपचारिक दस्तावेज़ प्रस्तुति।",
    meetingReviewCaption:
      "नेतृत्व बैठक — BKS ओडिशा प्रतिनिधियों के साथ आधिकारिक दस्तावेज़ की समीक्षा।",
    napSeminarTitle: 'सेमिनार रिपोर्ट — "राष्ट्रीय कृषि नीति"',
    napSeminarMeta:
      "आयोजक: भारतीय कृषक समाज, ओडिशा · सहयोग: स्थापना चैरिटेबल ट्रस्ट · 10 सितंबर 2026",
    bandeFelicitationTitle: "बंदे ओडिशा में सम्मान समारोह",
    bandeFelicitationBody:
      "निबेदिता बलियारसिंह नायक, राज्य अध्यक्ष, भारतीय कृषक समाज — महिला ओडिशा का सम्मान समारोह, प्रतिष्ठित कार्यक्रम बंदे ओडिशा में — ओडिशा सरकार द्वारा समर्थित सिग्नेचर कार्यक्रम।",
  },
  footer: {
    quote: "किसान मिट्टी, बीज, संस्कृति और राष्ट्रीय लचीलेपन का रक्षक है।",
    org: "Bharatiya Krishak Samaj, Odisha",
  },
  common: {
    backHome: "होम पर लौटें",
    comingSoon: "शीघ्र आ रहा है",
    menu: "मेनू",
    close: "बंद करें",
    readMore: "और पढ़ें",
  },
};


/** Odia UI chrome + key titles; longer bodies may reuse English until full Odia translation is supplied. */
const orLocale: Dict = {
  ...en,
  brand: "Bharatiya Krishak Samaj",
  brandSub: "ଓଡ଼ିଶା",
  nav: {
    about: "BKS ବିଷୟରେ",
    odisha: "ଓଡ଼ିଶା",
    leadership: "ନେତୃତ୍ୱ",
    presence: "ଉପସ୍ଥିତି",
    nationalPresident: "ଜାତୀୟ ସଭାପତି",
    media: "ମିଡ଼ିଆ",
    agriculture: "କୃଷି",
    apply: "ଆବେଦନ",
    aboutGroup: "ପରିଚୟ",
    learnGroup: "ଶିକ୍ଷା ଓ ମାଧ୍ୟମ",
    home: "ହୋମ୍",
  },
  hero: {
    eyebrow: "Bharatiya Krishak Samaj, ଓଡ଼ିଶା",
    title: "ଓଡ଼ିଶା ପାଇଁ କୃଷକ ମର୍ଯ୍ୟାଦା, ସ୍ୱାବଲମ୍ବୀ କୃଷି ଏବଂ ବ୍ୟବହାରିକ ଜ୍ଞାନ।",
    lead: "ଭାରତୀୟ କୃଷକ ସମାଜର ଓଡ଼ିଶା ଅଧ୍ୟାୟ ସେହି ଜାତୀୟ ଭାବନାରେ କାମ କରେ — ଅନ୍ନଦାତାଙ୍କ ସହ, ସହଯୋଗୀଙ୍କ ପାଇଁ ଖୋଲା, ଏବଂ କ୍ଷେତ ପାଇଁ ନିର୍ମିତ।",
    primaryCta: "BKS ଓଡ଼ିଶା ଜାଣନ୍ତୁ",
    secondaryCta: "ନେତୃତ୍ୱ ସହ ମିଳନ୍ତୁ",
    caption: "ଜାତୀୟ ସଭାପତି ଶ୍ରୀ କୃଷ୍ଣ ବୀର ଚୌଧୁରୀ ଏବଂ ଶ୍ରୀମତୀ ନିବେଦିତା ନାୟକ ବଳିଆରସିଂହ — BKS ଓଡ଼ିଶା।",
  },
  home: {
    ...en.home,
    aboutEyebrow: "BKS ବିଷୟରେ",
    aboutTitle: "ଅନ୍ନଦାତାଙ୍କ ପାଇଁ ଏକ ଜାତୀୟ କୃଷକ ସଂଗଠନ।",
    aboutBody: "ଭାରତୀୟ କୃଷକ ସମାଜ କୃଷକ ଅଧିକାର, କୃଷି ଆୟ, ବୀଜ ସାର୍ବଭୌମତ୍ୱ ଓ ନ୍ୟାୟସଙ୍ଗତ କୃଷି ନୀତିକୁ ଜନସଂବାଦକୁ ନେଇୟାଏ — ରାଜ୍ୟ ଅଧ୍ୟାୟଗୁଡ଼ିକ ସ୍ଥାନୀୟ ଭାଷା ଓ ଜିଲ୍ଲାରେ କାମ କରନ୍ତି।",
    aboutCta: "BKS ପଢ଼ନ୍ତୁ",
    odishaEyebrow: "ଓଡ଼ିଶା ଅଧ୍ୟାୟ",
    odishaTitle: "BKS ଓଡ଼ିଶା — ଜାତୀୟ ସଂଗଠନର ଭଗିନୀ ଅଧ୍ୟାୟ।",
    odishaBody: "BKS ପଶ୍ଚିମବଙ୍ଗର ସହଯୋଗୀ ରାଜ୍ୟ ମଞ୍ଚ ଭାବେ ପ୍ରକାଶିତ: ସମାନ ବ୍ରାଣ୍ଡ, ଜାତୀୟ ସଭାପତିଙ୍କ ସହ ସମାନ ସଂଯୋଗ, ଏବଂ ଯାଞ୍ଚ-ପ୍ରଥମ ଓଡ଼ିଶା ବିଷୟବସ୍ତୁ।",
    odishaCta: "ଓଡ଼ିଶା ଅଧ୍ୟାୟ ଖୋଲନ୍ତୁ",
    agriEyebrow: "କୃଷି",
    agriTitle: "ଓଡ଼ିଶାର କୃଷି ପରିଦୃଶ୍ୟ, ପ୍ରସଙ୍ଗ ସହିତ।",
    agriBody: "ଚାଷଯୋଗ୍ୟ ଜମି, ଛୋଟ କୃଷକ ବାସ୍ତବତା, କୃଷି-ଜଳବାୟୁ ଅଞ୍ଚଳ ଓ କୃଷକ ଜୀବିକାକୁ ଗଢ଼ୁଥିବା ନୀତି ପ୍ରଶ୍ନ — ସାର୍ବଜନୀନ ଓଡ଼ିଶା କୃଷି ଉତ୍ସରୁ ସଂକ୍ଷେପ।",
    agriCta: "କୃଷି ଜାଣନ୍ତୁ",
    leadershipEyebrow: "ନେତୃତ୍ୱ",
    leadershipTitle: "ଜାତୀୟ ସଂଯୋଗ ଏବଂ ଓଡ଼ିଶା ନେତୃତ୍ୱ।",
    leadershipBody: "ଜାତୀୟ ସଭାପତି ଏବଂ ଏହି ଅଧ୍ୟାୟ ସାଇଟରେ ବିଶେଷ ଭାବେ ପ୍ରଦର୍ଶିତ ଯାଞ୍ଚିତ ଓଡ଼ିଶା ନେତୃତ୍ୱ — କୌଣସି କାଳ୍ପନିକ ପଦବୀ ବିନା।",
    leadershipCta: "ନେତୃତ୍ୱ ସହ ମିଳନ୍ତୁ",
    presenceEyebrow: "ଆମର ଉପସ୍ଥିତି",
    presenceTitle: "ଜିଲ୍ଲା ଉପସ୍ଥିତି — କେବଳ ଯାଞ୍ଚ ପରେ।",
    presenceBody: "ରାଜ୍ୟ → ଜିଲ୍ଲା → ବ୍ଲକ → ସଦସ୍ୟ ଗଠନ BKS ପଶ୍ଚିମବଙ୍ଗ ସହ ସମାନ। ଅଧିକାରିକ ନାମ ମିଳିବା ପରେ ଓଡ଼ିଶା ପ୍ୟାନେଲ ଖୋଲିବ।",
    presenceCta: "ଉପସ୍ଥିତି ଦେଖନ୍ତୁ",
    storyEyebrow: "ଫୋକସରେ",
    storyTitle: "ଓଡ଼ିଶା — ଲୋକ, ନେତୃତ୍ୱ ଓ ସଂଗଠନ।",
    storyLead: "ଜାତୀୟ ଓ ଓଡ଼ିଶା ନେତୃତ୍ୱର ଅନୁମୋଦିତ ଫଟୋ — ଅଧ୍ୟାୟ କାହାଣୀ ଭାବେ ବ୍ୟବହୃତ, ଯାଦୃଚ୍ଛିକ ଗ୍ୟାଲେରୀ ନୁହେଁ।",
    storyLetterCaption: "ଜାତୀୟ ସଭାପତି ଶ୍ରୀ କୃଷ୍ଣ ବୀର ଚୌଧୁରୀ ଏବଂ ଶ୍ରୀମତୀ ନିବେଦିତା ନାୟକ ବଳିଆରସିଂହ।",
    storyJagannathCaption: "ଜାତୀୟ ସଭାପତି ଶ୍ରୀ କୃଷ୍ଣ ବୀର ଚୌଧୁରୀ ଏକ ଓଡ଼ିଆ ସାଂସ୍କୃତିକ ପରିବେଶରେ।",
    storyHeroCaption: "ଜାତୀୟ ସଭାପତି ଏବଂ ଶ୍ରୀମତୀ ନିବେଦିତା ନାୟକ ବଳିଆରସିଂହ — BKS ଓଡ଼ିଶା।",
    mediaEyebrow: "ମିଡ଼ିଆ",
    mediaTitle: "ଯାଞ୍ଚିତ ଓଡ଼ିଶା ମିଡ଼ିଆ କକ୍ଷ।",
    mediaBody: "କୃଷକ, ସହଯୋଗୀ ଓ ସାମ୍ବାଦିକଙ୍କ ପାଇଁ ସାର୍ବଜନୀନ ସାକ୍ଷାତକାର ଓ ସନ୍ଦର୍ଭ — Odisha Talksରୁ ଆରମ୍ଭ।",
    mediaCta: "ମିଡ଼ିଆ ଖୋଲନ୍ତୁ",
    joinEyebrow: "ଯୋଗ ଦିଅନ୍ତୁ",
    joinTitle: "ଓଡ଼ିଶା ଅଧ୍ୟାୟ ସହ ଯୋଗ ଦେବାକୁ ଆବେଦନ କରନ୍ତୁ।",
    joinBody: "ଅଧ୍ୟାୟ ସହଯୋଗ ପାଇଁ ଏକ ସରଳ ଆବେଦନ ପଥ। ଔପଚାରିକ ଭୂମିକା କେବଳ ଯାଞ୍ଚ ପରେ ପ୍ରକାଶିତ ହୁଏ।",
    joinCta: "ବର୍ତ୍ତମାନ ଆବେଦନ କରନ୍ତୁ",
  },
  explore: {
    eyebrow: "ଜାଣନ୍ତୁ",
    title: "ଓଡ଼ିଶାରେ କୃଷକ, ସହଯୋଗୀ ଓ ଅନୁଷ୍ଠାନ ପାଇଁ ସାର୍ବଜନୀନ ଅଧ୍ୟାୟ ମଞ୍ଚ।",
  },
  about: {
    ...en.about,
    eyebrow: "BKS ବିଷୟରେ",
    title: "ଅନ୍ନଦାତାଙ୍କ ସ୍ୱର ବହନ କରୁଥିବା ଜାତୀୟ କୃଷକ ସଂଗଠନ।",
    whoTitle: "ଆମେ କିଏ",
    historyTitle: "ଆମର ଇତିହାସ",
    standTitle: "ଆମେ କାହା ପକ୍ଷରେ",
    objectivesTitle: "ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ",
    workTitle: "କୃଷକଙ୍କ ସହ ଆମର କାର୍ଯ୍ୟ",
    reachTitle: "ଜାତୀୟ ପହଞ୍ଚ",
    whyOdishaTitle: "ଓଡ଼ିଶା କାହିଁକି",
  },
  odishaPage: {
    ...en.odishaPage,
    eyebrow: "ଓଡ଼ିଶା ଅଧ୍ୟାୟ",
    title: "BKS ଓଡ଼ିଶା — ଭାରତୀୟ କୃଷକ ସମାଜର ରାଜ୍ୟ ଅଧ୍ୟାୟ।",
  },
  agriculture: {
    ...en.agriculture,
    eyebrow: "କୃଷି",
    title: "ଓଡ଼ିଶା କୃଷି — ଭୂମି, କୃଷକ ଓ କୃଷି-ଜଳବାୟୁ ବାସ୍ତବତା।",
  },
  leadership: {
    eyebrow: "ନେତୃତ୍ୱ",
    title: "ଜାତୀୟ ସଂଯୋଗ ଏବଂ ଓଡ଼ିଶା ନେତୃତ୍ୱ।",
    lead: "ଅଧ୍ୟାୟ ଜାତୀୟ ସଭାପତିଙ୍କ ସହ ଯୋଡ଼ି ରହିଛି, ଏବଂ ଓଡ଼ିଶା ନେତୃତ୍ୱ ଯାଞ୍ଚିତ ସାର୍ବଜନୀନ ସାମଗ୍ରୀ ମାଧ୍ୟମରେ ଉପସ୍ଥାପିତ।",
    nationalLabel: "ଜାତୀୟ ସଭାପତି",
    nationalBody: "ଶ୍ରୀ କୃଷ୍ଣ ବୀର ଚୌଧୁରୀ, ଭାରତୀୟ କୃଷକ ସମାଜର ସଭାପତି। ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରୋଫାଇଲ୍ ଜାତୀୟ ସଭାପତିଙ୍କ ସମର୍ପିତ ସାଇଟରେ ଉପଲବ୍ଧ।",
    nationalRoleCaption: "ସଭାପତି, ଭାରତୀୟ କୃଷକ ସମାଜ",
    stateLabel: "ଓଡ଼ିଶା ନେତୃତ୍ୱ",
    viewProfile: "ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରୋଫାଇଲ୍ ଦେଖନ୍ତୁ",
    fullNationalProfile: "ସମ୍ପୂର୍ଣ୍ଣ ଜାତୀୟ ସଭାପତି ପ୍ରୋଫାଇଲ୍",
  },
  nibedita: {
    ...en.nibedita,
    name: "ଶ୍ରୀମତୀ ନିବେଦିତା ନାୟକ ବଳିଆରସିଂହ",
    roleNote: "BKS ଓଡ଼ିଶାରେ ବିଶେଷ ଓଡ଼ିଶା ନେତୃତ୍ୱ। ଔପଚାରିକ BKS ପଦବୀ କେବଳ ସରକାରୀ ଯାଞ୍ଚ ପରେ ପ୍ରକାଶିତ ହେବ।",
    leadershipTitle: "ନେତୃତ୍ୱ ଉପସ୍ଥିତି",
    areasTitle: "ସାର୍ବଜନୀନ କାର୍ଯ୍ୟର କ୍ଷେତ୍ର",
    experienceTitle: "ବୃତ୍ତିଗତ ଅନୁଭବ",
    odishaTitle: "ଓଡ଼ିଶା ସାମୁଦାୟିକ କାର୍ଯ୍ୟ",
    mediaTitle: "ସାର୍ବଜନୀନ ମିଡ଼ିଆ",
    educationTitle: "ଶିକ୍ଷା",
    connectionTitle: "BKS ଓଡ଼ିଶା ସହ ସଂଯୋଗ",
  },
  presence: {
    ...en.presence,
    eyebrow: "ଆମର ଉପସ୍ଥିତି",
    title: "ଓଡ଼ିଶାର ଭୌଗୋଳିକ ଉପସ୍ଥିତି।",
    lead: "ଜିଲ୍ଲା ଓ ବ୍ଲକ ଉପସ୍ଥିତି କେବଳ ଯାଞ୍ଚିତ ନାମ ଓ ବିବରଣୀ ସହ ପ୍ରକାଶିତ ହେବ — BKS ପଶ୍ଚିମବଙ୍ଗ ପରି।",
    empty: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସାର୍ବଜନୀନ ଓଡ଼ିଶା ଜିଲ୍ଲା ପ୍ରତିନିଧି ତାଲିକା ପ୍ରକାଶିତ ହୋଇନାହିଁ।",
    stateLabel: "ଓଡ଼ିଶା",
    districtsLabel: "ଜିଲ୍ଲା",
    architectureNote: "ଗଠନ ପଶ୍ଚିମବଙ୍ଗ ଅଧ୍ୟାୟ ସହ ସମାନ: ରାଜ୍ୟ → ଜିଲ୍ଲା → ବ୍ଲକ → ସଦସ୍ୟ। ଯାଞ୍ଚିତ ନାମ ମିଳିଲେ ଜିଲ୍ଲା ପ୍ୟାନେଲ ଏଠାରେ ଖୋଲିବ।",
  },
  media: {
    ...en.media,
    eyebrow: "ମିଡ଼ିଆ",
    title: "BKS ଓଡ଼ିଶା ମିଡ଼ିଆ କକ୍ଷ",
    lead: "BKS ଓଡ଼ିଶାର ଯାଞ୍ଚିତ କାହାଣୀ ଓ ସାର୍ବଜନୀନ ସନ୍ଦର୍ଭ। କୃଷକ, ସହଯୋଗୀ, ସାମ୍ବାଦିକ ଓ ପାଠକଙ୍କ ପାଇଁ।",
    odishaTalksTitle: "Odisha Talks — ନିବେଦିତା ନାୟକ ବଳିଆରସିଂହଙ୍କ ସହ ବିଶେଷ ଆଲୋଚନା",
    odishaTalksBody: "Odisha Talks ଦ୍ୱାରା ପ୍ରକାଶିତ ଯାଞ୍ଚିତ ସାକ୍ଷାତକାର।",
    watch: "YouTubeରେ ଦେଖନ୍ତୁ",
    meetingHandoverCaption:
      "ଶ୍ରୀମତୀ ନିବେଦିତା ନାୟକ ବଳିଆରସିଂହ ଏବଂ BKS ଓଡ଼ିଶା ସହକର୍ମୀଙ୍କ ସହ ଔପଚାରିକ ଦଲିଲ ଉପସ୍ଥାପନା।",
    meetingReviewCaption:
      "ନେତୃତ୍ୱ ବୈଠକ — BKS ଓଡ଼ିଶା ପ୍ରତିନିଧିଙ୍କ ସହ ସରକାରୀ ଦଲିଲ ସମୀକ୍ଷା।",
    napSeminarTitle: 'ସେମିନାର ରିପୋର୍ଟ — "ଜାତୀୟ କୃଷି ନୀତି"',
    napSeminarMeta:
      "ଆୟୋଜକ: ଭାରତୀୟ କୃଷକ ସମାଜ, ଓଡ଼ିଶା · ସହଯୋଗ: ସ୍ଥାପନା ଚ୍ୟାରିଟେବଲ୍ ଟ୍ରଷ୍ଟ · 10 ସେପ୍ଟେମ୍ବର 2026",
    bandeFelicitationTitle: "ବନ୍ଦେ ଓଡ଼ିଶାରେ ସମ୍ମାନ",
    bandeFelicitationBody:
      "ନିବେଦିତା ବଳିଆରସିଂହ ନାୟକ, ରାଜ୍ୟ ସଭାପତି, ଭାରତୀୟ କୃଷକ ସମାଜ — ମହିଳା ଓଡ଼ିଶାଙ୍କ ସମ୍ମାନ ସମାରୋହ, ପ୍ରତିଷ୍ଠିତ କାର୍ଯ୍ୟକ୍ରମ ବନ୍ଦେ ଓଡ଼ିଶାରେ — ଓଡ଼ିଶା ସରକାର ସମର୍ଥିତ ସିଗ୍ନେଚର କାର୍ଯ୍ୟକ୍ରମ।",
  },
  footer: {
    quote: "କୃଷକ ମାଟି, ବୀଜ, ସଂସ୍କୃତି ଓ ଜାତୀୟ ସ୍ଥିତିସ୍ଥାପକତାର ରକ୍ଷକ।",
    org: "ଭାରତୀୟ କୃଷକ ସମାଜ, ଓଡ଼ିଶା",
  },
  common: {
    backHome: "ହୋମକୁ ଫେରନ୍ତୁ",
    comingSoon: "ଶୀଘ୍ର ଆସୁଛି",
    menu: "ମେନୁ",
    close: "ବନ୍ଦ କରନ୍ତୁ",
    readMore: "ଅଧିକ ପଢ଼ନ୍ତୁ",
  },
};

export const DICTS: Record<Locale, Dict> = { en, hi, or: orLocale };

export function t(locale: Locale): Dict {
  return DICTS[locale];
}
