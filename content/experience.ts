export type Engagement = {
  client: string;
  dateRange: string;
  summary: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  dateRange: string;
  location: string;
  current?: boolean;
  description: string;
  highlights?: string[];
  /** Notable client engagements nested under this role (e.g. RCT contracts). */
  engagements?: Engagement[];
  /** 1 = most recent. Sort ascending. */
  order: number;
};

export const experience: ExperienceItem[] = [
  {
    company: "RCT",
    role: "Founder · AI Researcher · Builder",
    dateRange: "Mar 2018 — Present",
    location: "West Coast, Western Cape, ZA",
    current: true,
    description:
      "Consultations, new-product development, prototyping, and handing solutions to customers — across AI, IoT, computer vision, cybersecurity, industrial automation, and SaaS. From autonomous farm robots to lab automation to SIEM platforms to AdTech — name the requirement and I build the product.",
    highlights: [
      "Ship and operate Edgetower — AI surveillance & ops-intelligence SaaS, live and maintained.",
      "Delivered to Digital Marketing, Physical Security, Cybersecurity, Healthcare, Research Labs, and Mining clients.",
      "Polymath stack: Python, Node, C/C++, Django/FastAPI/Sanic, OpenCV/TensorFlow/YOLO, MQTT, Pub/Sub, Postgres/Redis/Mongo/Influx/BigQuery, AWS/GCP/Azure.",
    ],
    engagements: [
      {
        client: "Think WiFi (contracted via RCT)",
        dateRange: "2022 — 2024",
        summary:
          "Ad-pacing algorithm, MAC-keyed client context, Pub/Sub → BigQuery event pipeline, and a Django back-office for the captive-portal ad network. Ended amicably end of 2024.",
      },
      {
        client: "Omega Test House",
        dateRange: "2019",
        summary:
          "Designed and built SANS / SABS / SA Watermark-certified industrial test rigs — mechanical, electronics, firmware. Featured in Plumbing Africa, Sept 2019.",
      },
    ],
    order: 1,
  },
  {
    company: "Cybermarks",
    role: "Cybersecurity Research & Developer",
    dateRange: "Jul 2021 — Feb 2022",
    location: "Pretoria, ZA",
    description:
      "Helped build the company from technical leadership — the interface between senior management and the technical requirements. Built and deployed a distributed SIEM solution, an API gateway integrating third-party tools, and chaired technical meetings with industry partners.",
    highlights: [
      "Sanic-based API integrating client-facing back-office with third-party cybersec providers.",
      "Distributed SIEM agent rollout on Investor company infrastructure, server-cluster management on Proxmox.",
    ],
    order: 2,
  },
  {
    company: "Health Solutions Africa",
    role: "Senior Software Developer (contract)",
    dateRange: "Feb 2018 — Apr 2018",
    location: "Sandton, ZA",
    description:
      "Short contract — software development, hardware design, research, IoT, and automation across emergency-management systems and automated vehicle-response systems.",
    order: 3,
  },
  {
    company: "Naxian Systems",
    role: "Innovation Engineer",
    dateRange: "Oct 2017 — Feb 2018",
    location: "Sandton, ZA",
    description:
      "Called the “Jimmy Neutron of Naxian.” Researched, developed, and delivered AI prototypes per customer spec: computer vision, object recognition, facial recognition, human-pose recognition, emotion recognition, speech recognition.",
    order: 4,
  },
  {
    company: "RCT (v1)",
    role: "Founder & Technologist",
    dateRange: "Mar 2017 — Oct 2017",
    location: "Pretoria, ZA",
    description:
      "Web development, hosting services, IoT & networking systems, automation, autonomous vehicles, 3D printing, prototyping — Mission Planner, QGroundControl, Ardupilot, Python, C/C++, SolidWorks.",
    order: 5,
  },
  {
    company: "Vodacom",
    role: "Core Network Engineering (12 years, four roles)",
    dateRange: "Aug 2004 — Mar 2017",
    location: "Pretoria, ZA",
    description:
      "12 years operating the core network of South Africa’s largest mobile operator. Rel.4 architecture maintenance, future network growth and rollouts, change management across multiple departments. Data-centre management at +3 million subscriber scale.",
    highlights: [
      "Operations Specialist · Core Network Engineering (2008 — 2017, 9 yrs)",
      "Senior Technical Officer (2007 — 2008)",
      "Switching Technical Officer (2005 — 2007)",
      "Bursary Student Intern (2004 — 2005)",
    ],
    order: 6,
  },
];
