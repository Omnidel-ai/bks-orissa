/**
 * National Agricultural Policy Seminar — 10 September 2026
 * Tapaswini Auditorium, Sambalpur
 * Source report write-up for native web feature (not PDF-only).
 */

export type NapReportSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  closing?: string;
};

export type NapWomanProfile = {
  name: string;
  detail: string;
  image: string;
};

export type NapLeadershipProfile = {
  name: string;
  detail: string;
  image: string;
};

export type NapGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  group: "hero" | "moments" | "leadership" | "highlights";
};

export const napSeminarReport = {
  eventName: "National Agricultural Policy Seminar & Women’s Leadership Felicitation",
  headline: "From Farmers to Future Leaders: National Agricultural Policy Seminar 2026",
  dateLabel: "September 10, 2026",
  location: "Tapaswini Auditorium, Sambalpur, Odisha",
  time: "11:30 AM – 1:30 PM",
  organisedBy: "Bharatiya Krishak Samaj, Odisha",
  supportedBy: "Sthapna Charitable Trust",
  title: 'Report on Seminar — “National Agricultural Policy”',
  meta:
    "Organised by Bharatiya Krishak Samaj, Odisha · Supported by Sthapna Charitable Trust · 10th September 2026 · Tapaswini Auditorium, Sambalpur",
  stats: [
    { value: "Approximately 350", label: "Participants" },
    { value: "10", label: "District Presidents recognised" },
    { value: "10", label: "Women agri-entrepreneurs recognised" },
    { value: "Western Odisha", label: "Farmer community representation" },
  ],
  sections: [
    {
      id: "introduction",
      title: "1. INTRODUCTION",
      paragraphs: [
        "Bharatiya Krishak Samaj, Odisha, with the support of Sthapna Charitable Trust, organised a seminar on the “National Agricultural Policy” on 10th September 2026 at Tapaswini Auditorium, Sambalpur.",
        "Approximately 350 participants attended the programme. The gathering brought together farmers, women farmers and agri-entrepreneurs, researchers, agricultural innovators, social workers, and representatives of the farming community from different parts of Western Odisha.",
        "The seminar provided a shared platform to discuss agricultural policy in relation to farmers’ interests, rural development, agricultural entrepreneurship, women’s participation in agriculture, and innovation-led livelihoods.",
      ],
    },
    {
      id: "participation",
      title: "2. PARTICIPATION AND REPRESENTATION",
      paragraphs: [
        "The programme reflected broad representation from the farming community and allied stakeholders. Approximately 350 participants attended the programme.",
      ],
      bullets: [
        "Farmers and progressive farmers",
        "Women farmers and women agri-entrepreneurs",
        "Agri-entrepreneurs and agricultural innovators",
        "Researchers and professionals",
        "Social workers",
        "Representatives of farmers’ organisations",
        "District-level representatives of Bharatiya Krishak Samaj",
        "Representatives from different districts of Western Odisha",
      ],
    },
    {
      id: "felicitation-nibedita",
      title: "3. FELICITATION OF SMT. NIBEDITA BALISINGH NAYAK",
      paragraphs: [
        "Smt. Nibedita Baliarsingh Nayak, State President (Women), Bharatiya Krishak Samaj, Odisha, was felicitated at the seminar in recognition of her leadership.",
        "The recognition acknowledged her work in strengthening women’s participation in agriculture, advancing agricultural entrepreneurship, supporting rural livelihoods, and promoting community-based development.",
        "It also recognised her efforts in strengthening the women’s wing of Bharatiya Krishak Samaj and expanding the organisational presence of BKS across Odisha.",
      ],
    },
    {
      id: "district-presidents",
      title: "4. RECOGNITION OF DISTRICT PRESIDENTS",
      paragraphs: [
        "District Presidents of Bharatiya Krishak Samaj from 10 districts of Western Odisha were recognised during the programme. Both male and female representatives were recognised.",
        "This recognition formed part of organisational strengthening. It was intended to encourage district-level leadership and to strengthen the BKS organisational network among farmers and rural communities.",
        "The following named leadership and district profiles appear in the supplied programme material. Only source-supported designations are listed; no additional biographies have been added.",
      ],
      bullets: [
        "Krishan Bir Chaudhary — Member, Prime Minister’s High Level Committee on MSP",
      ],
    },
    {
      id: "women-agri-entrepreneurs",
      title: "5. FELICITATION OF WOMEN AGRI-ENTREPRENEURS",
      paragraphs: [
        "Ten Women Agri-Entrepreneurs were recognised at the seminar for their contribution to women-led entrepreneurship and agri-based enterprises.",
        "The areas of recognition included Biotez & Agri-Innovation; Bloom – Controlled Environment Saffron Cultivation; Innovative Millet Artisans; millet-based food and value-added products; and other innovative agricultural and rural livelihood initiatives.",
        "The recognition was significant because it affirmed women not only as farmers, but also as innovators, entrepreneurs and livelihood creators — advancing value addition, technology, innovation and the strengthening of rural economies.",
        "Individual profiles available in the supplied programme material are listed below. The report records that 10 women agri-entrepreneurs were recognised; eight individual profiles from the supplied source material are published here without fabricating missing entries.",
      ],
    },
    {
      id: "distinguished-guests",
      title: "6. DISTINGUISHED GUESTS",
      paragraphs: [
        "The seminar was attended by distinguished guests whose presence added significance to the programme and reinforced collaborative efforts for farmers’ welfare, agricultural development and rural transformation.",
      ],
      bullets: [
        "Sj. Nauri Naik, Ex-MLA, Rengali Assembly Constituency and Nominee of Sj. Dharmendra Pradhan, Hon’ble MP, Sambalpur Parliamentary Constituency and former Union Minister",
        "Sj. Jayanarayan Mishra, Hon’ble MLA, Sambalpur Assembly Constituency",
        "Sj. Sureswar Satpathy, Senior Leader and Convenor, Dhanu Jatra Mahotsav, Bargarh",
        "Dr. Purusottam Agarwal, Eminent Doctor and Social Worker",
        "Dr. Jaydev Meher",
        "Er. Rajkishore Nayak",
        "Mr. Anil Tuli",
      ],
    },
    {
      id: "key-focus",
      title: "7. KEY FOCUS OF THE SEMINAR",
      paragraphs: [
        "The seminar focused on the following priorities for agricultural policy and rural development:",
      ],
      bullets: [
        "Strengthening farmers’ livelihoods and incomes",
        "Promoting agricultural entrepreneurship",
        "Encouraging women farmers to become agri-entrepreneurs",
        "Supporting agricultural innovation and technology",
        "Promoting millet-based and value-added products",
        "Creating opportunities for rural youth",
        "Strengthening farmer organisations and district-level networks",
        "Encouraging research and knowledge-based agriculture",
        "Promoting sustainable and locally relevant agricultural practices",
        "Connecting farmers with opportunities for markets, value addition and enterprise development",
      ],
      closing:
        "The seminar underscored the need for stronger coordination among farmers, researchers, entrepreneurs, civil society organisations and institutional stakeholders.",
    },
    {
      id: "leadership",
      title: "8. LEADERSHIP AND COORDINATION",
      paragraphs: [
        "Programme leadership was provided by Smt. Nibedita Baliarsingh Nayak, State President (Women), Bharatiya Krishak Samaj, Odisha.",
        "Programme coordination was undertaken by Sj. Saroj Kumar Bhuyan and Smt. Ritu Tuli. Their coordination and organisational support enabled the successful conduct of the seminar and the associated recognition programmes.",
        "Source-supported designations for Sj. Saroj Kumar Bhuyan: Secretary, Sthapna Charitable Trust (report); Secretary, Odisha SEVAC, and Coordinator, Bharatiya Krishak Samaj, Odisha (programme material).",
        "Source-supported designations for Smt. Ritu Tuli: Sthapna Women Task Force (report); Vice President, Bharatiya Krishak Samaj, Sambalpur, Odisha (programme material).",
      ],
    },
    {
      id: "significance",
      title: "9. SIGNIFICANCE OF THE EVENT",
      paragraphs: [
        "The seminar brought together farmers, women entrepreneurs, researchers, innovators and social leaders around the future of agriculture and rural development.",
        "Recognition of district-level BKS leadership from 10 districts, and the felicitation of 10 women agri-entrepreneurs, strengthened organisational presence and highlighted women-led agricultural entrepreneurship, innovation, value addition and rural economic development.",
        "The event contributed to a stronger BKS network among farmers and agricultural stakeholders in Odisha, with particular engagement from Western Odisha.",
      ],
    },
    {
      id: "conclusion",
      title: "10. CONCLUSION",
      paragraphs: [
        "The Seminar on “National Agricultural Policy” organised by Bharatiya Krishak Samaj, Odisha, with the support of Sthapna Charitable Trust, was successfully conducted on 10th September 2026 at Tapaswini Auditorium, Sambalpur.",
        "Approximately 350 participants — including farmers, women agri-entrepreneurs, researchers, innovators and social workers — took part in dialogue, recognition and organisational strengthening.",
        "The programme included the felicitation of Smt. Nibedita Baliarsingh Nayak, recognition of 10 district-level BKS Presidents, and felicitation of 10 women agri-entrepreneurs.",
        "It affirmed farmer leadership and the role of women as important stakeholders in the future of Indian agriculture, and supported a stronger, inclusive and innovation-oriented agricultural movement in Odisha, with particular emphasis on Western Odisha.",
      ],
    },
  ] satisfies NapReportSection[],
  nibedita: {
    name: "Smt. Nibedita Baliarsingh Nayak",
    role: "State President (Women), Bharatiya Krishak Samaj, Odisha",
    image: "/assets/nap-profiles/nibedita-balisingh-nayak.jpg",
  },
  leadershipProfilesTitle: "Named leadership and district presidents — profiles from programme material",
  leadershipProfilesNote:
    "The following individual profiles are published from the supplied programme material (second.pdf). Designations are shown exactly as supported by that source.",
  leadershipProfiles: [
    {
      name: "Sri Saroj Kumar Bhuyan",
      detail: "Secretary, Odisha SEVAC; Coordinator, Bharatiya Krishak Samaj, Odisha",
      image: "/assets/nap-profiles/saroj-kumar-bhuyan.jpg",
    },
    {
      name: "Sri Tapan Kumar Dehury",
      detail: "Director, Odisha SEVAC; Vice President, Bharatiya Krishak Samaj, Odisha",
      image: "/assets/nap-profiles/tapan-kumar-dehury.jpg",
    },
    {
      name: "Smt. Sandhya Rani Kissan",
      detail:
        'Pioneer — “Control Environment Saffron Cultivation”, Jharsuguda; District President, Bharatiya Krishak Samaj (Women Wing), Deogarh District',
      image: "/assets/nap-profiles/sandhya-rani-kissan.jpg",
    },
    {
      name: "Sri Malaya Kumar Deep",
      detail:
        "State & National Awardee — Roof Top Garden Competition; District President, Bharatiya Krishak Samaj, Kalahandi District",
      image: "/assets/nap-profiles/malaya-kumar-deep.jpg",
    },
    {
      name: "Sri Kunja Bihari Samant",
      detail: "District President, Bharatiya Krishak Samaj, Sundargarh District",
      image: "/assets/nap-profiles/kunja-bihari-samant.jpg",
    },
    {
      name: "Sri Mahendra Thakur",
      detail: "District President, Bharatiya Krishak Samaj, Deogarh District",
      image: "/assets/nap-profiles/mahendra-thakur.jpg",
    },
  ] satisfies NapLeadershipProfile[],
  womenProfilesTitle: "Recognised women agri-entrepreneurs — individual profiles from programme material",
  womenProfilesNote:
    "Ten women agri-entrepreneurs were recognised. The following eight individual profiles are published from the supplied source material; additional profiles were not available in the supplied files and have not been invented.",
  womenProfiles: [
    {
      name: "Dr Shitarashmi Sahu",
      detail: "Prakriti Sukham Gachhanti — Biotez Aginovation Pvt. Ltd.",
      image: "/assets/nap-profiles/shitarashmi-sahu.jpg",
    },
    {
      name: "Ms Sujata Agarwal",
      detail: 'Pioneer — "Control Environment Saffron Cultivation", Jharsuguda',
      image: "/assets/nap-profiles/sujata-agarwal.jpg",
    },
    {
      name: "Smt Bandita Pujari",
      detail: "State & National Awardee — Roof Top Garden Competition",
      image: "/assets/nap-profiles/bandita-pujari.jpg",
    },
    {
      name: "Ms Prabhjot Kaur",
      detail: "Millet — Value Addition Entrepreneur",
      image: "/assets/nap-profiles/prabhjot-kaur.jpg",
    },
    {
      name: "Ms Sapna Bedi",
      detail: "Women Entrepreneurs in Household Solutions",
      image: "/assets/nap-profiles/sapna-bedi.jpg",
    },
    {
      name: "Ms Deepika Mahawar",
      detail: "Wonder Wrap — Creative Handicraft & Gift Artisan",
      image: "/assets/nap-profiles/deepika-mahawar.jpg",
    },
    {
      name: "Ms Nancy Kheng",
      detail: "Creative Crochet & Cake Artisan",
      image: "/assets/nap-profiles/nancy-kheng.jpg",
    },
    {
      name: "Ms Puja Chhabriya",
      detail: "Traditional Grain & Millet Food Innovator",
      image: "/assets/nap-profiles/puja-chhabriya.jpg",
    },
  ] satisfies NapWomanProfile[],
  gallery: [
    {
      src: "/assets/media-nap-seminar-group.jpg",
      alt: "National Agricultural Policy seminar group on stage, Bharatiya Krishak Samaj Odisha",
      caption: "Featured — seminar gathering at Tapaswini Auditorium, Sambalpur",
      group: "hero",
    },
    {
      src: "/assets/media-nap-seminar-audience.jpg",
      alt: "Audience at the National Agricultural Policy seminar in Sambalpur",
      caption: "Event moment — approximately 350 participants in the auditorium",
      group: "moments",
    },
    {
      src: "/assets/media-nap-seminar-stage.jpg",
      alt: "Leaders on stage at the National Agricultural Policy seminar",
      caption: "Event moment — leaders and participants on stage",
      group: "moments",
    },
    {
      src: "/assets/media-nap-seminar-booklet.jpg",
      alt: "Programme booklet release at the National Agricultural Policy seminar",
      caption: "Event moment — programme booklet on stage",
      group: "moments",
    },
    {
      src: "/assets/media-nap-seminar-speaker-biotez.jpg",
      alt: "Speaker at the National Agricultural Policy seminar podium with Biotez Agrinovation backdrop, Sambalpur",
      caption:
        "A speaker addresses the National Agricultural Policy Seminar in Sambalpur from the podium, with Biotez Agrinovation Pvt. Ltd. messaging on plant growth, soil fertility, organic farming and waste management visible behind — themes that sit within the seminar’s focus on agricultural innovation and agri-enterprise.",
      group: "moments",
    },
    {
      src: "/assets/media-nap-seminar-speaker-podium.jpg",
      alt: "Speaker addressing participants from the podium at the National Agricultural Policy seminar, Sambalpur",
      caption:
        "A speaker addresses farmers, women agri-entrepreneurs and agricultural stakeholders from the podium during the National Agricultural Policy Seminar at Tapaswini Auditorium, Sambalpur.",
      group: "moments",
    },
    {
      src: "/assets/media-nap-pdf-page1.jpg",
      alt: "Bharatiya Krishak Samaj Odisha programme artwork",
      caption: "Event highlight — programme artwork from the seminar material",
      group: "highlights",
    },
    {
      src: "/assets/media-nap-pdf-page2.jpg",
      alt: "Seminar programme visual from supplied materials",
      caption: "Event highlight — programme visual from the seminar material",
      group: "highlights",
    },
    {
      src: "/assets/media-nap-pdf-page3.jpg",
      alt: "Seminar programme visual from supplied materials",
      caption: "Event highlight — additional programme visual",
      group: "highlights",
    },
  ] satisfies NapGalleryItem[],
  video: {
    src: "/assets/media-nap-seminar-clip.mp4",
    caption: "Event clip from the National Agricultural Policy seminar, 10 September 2026",
  },
} as const;
