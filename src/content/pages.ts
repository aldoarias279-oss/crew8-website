/**
 * Interior pages drawn from the 2024 Crew 8 presentation.
 * Wording is taken from those slides. Hours, names, and project lists are 2024 figures
 * as they appear in that deck — they are not updated here.
 */

export type PagePhotoSlot = {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

/** A plain line, or a line that opens one of the detail pages. */
export type PageListItem = string | { text: string; href: string };

export type InteriorPage = {
  slug: string;
  label: string;
  title: string;
  eyebrow: string;
  kicker?: string;
  paragraphs: string[];
  /**
   * Detail pages sit under a hub. The header links to the hub.
   * The hub page, and the footer, still lead to every detail page.
   */
  hub?: "what-we-do" | "the-crew";
  groups?: { heading?: string; items: PageListItem[] }[];
  /** Empty objects are visible slots until photographs are supplied. */
  photoSlots: PagePhotoSlot[];
};

export const emptySlots = (count: number): PagePhotoSlot[] =>
  Array.from({ length: count }, () => ({}));

export const pages: InteriorPage[] = [
  {
    slug: "who-is-crew-8",
    label: "Who is Crew 8",
    title: "Who is Crew 8",
    eyebrow: "About",
    kicker:
      "Crew 8 is committed to selfless sacrifice to our communities, our countryside, and each other. We will dedicate ourselves to becoming the best firefighters, teammates, and crew through our obligation to make Alameda County thrive.",
    paragraphs: [
      "Crew 8, founded in 2023 by members of the Alameda County Fire Department (ACFD), embodies resilience, dedication, and hard work in the most challenging environments. Created with funding from the Coastal Conservancy, Crew 8 is a 15-to-18-member hand crew focused on fuels management, wildfire suppression, and mutual aid, both locally and statewide. Operating in rugged and remote areas with limited access to roads and water sources, the crew uses hand tools and chainsaws to create fire breaks and prevent fire spread, employing techniques that date back to the early days of wildland firefighting.",
      "Crew 8 has been instrumental in fuels reduction projects and community chipping initiatives throughout Alameda County, playing a crucial role in wildfire preparedness and prevention. Their daily training in physical fitness, wildfire techniques, and emergency response ensures they are ready for any situation as an all-risk crew, providing support during any emergency as a force multiplier. Deployed across California through the Master Mutual Aid System, Crew 8 has demonstrated its value in battling large, out-of-control wildfires. With their commitment to public safety, teamwork, and excellence, Crew 8 represents the best of ACFD’s proactive approach to wildfire mitigation and community resilience. The hope is that Crew 8 will continue to be supported by the Alameda County Fire Department, becoming a model for effective wildfire management and a cornerstone of countywide fire prevention efforts.",
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "what-we-do",
    label: "What We Do",
    title: "What We Do",
    eyebrow: "Capabilities",
    paragraphs: [
      "Field work that reduces hazards, restores access, and supports Alameda County communities.",
    ],
    groups: [
      {
        items: [
          {
            text: "Vegetation Management: Crew 8 works to reduce hazardous vegetation, and create defensible spaces around homes, infrastructure, and critical wildfire evacuation routes.",
            href: "/vegetation-management",
          },
          {
            text: "Suppression: Crew 8 assists suppression crews with all risk incidents, including but not limited to vegetation fires, flooding, and downed tree removal.",
            href: "/suppression",
          },
          {
            text: "Fuel Reduction: Crew 8 implements controlled burns, thinning operations, and other fuel reduction techniques to decrease the risk of wildfire ignition and spread.",
            href: "/fuels-reduction",
          },
          {
            text: "Community Outreach: Besides their fieldwork, Crew 8 engages in community outreach and education efforts to raise awareness about wildfire safety and preparedness.",
            href: "/community-outreach",
          },
          {
            text: "Master Mutual Aid: Under CAL OES, Crew 8 provides master mutual aid throughout the state.",
            href: "/master-mutual-aid",
          },
          {
            text: "Training: Crew 8 is held to a high rigorous training standard. Creating competent employees able to build lifelong skill sets.",
            href: "/training-and-career",
          },
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "vegetation-management",
    label: "Vegetation Management",
    title: "Vegetation Management",
    eyebrow: "What we do",
    hub: "what-we-do",
    kicker: "3,000 hours in 2024",
    paragraphs: [
      "Crew 8 works to reduce hazardous vegetation, and create defensible spaces around homes, infrastructure, and critical wildfire evacuation routes.",
    ],
    groups: [
      {
        items: [
          "Cal Fire Vegetation Management Prescribed Burns",
          "Pile Burns",
          "East Bay Regional Parks",
          "Multiple Grass Prescribed burns",
          "Sycamore Grove Park",
          "LLNL Site 300 burns",
          "ACFD Training burns",
          "Camp Parks",
          "ACSO",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "suppression",
    label: "Suppression",
    title: "Suppression",
    eyebrow: "What we do",
    hub: "what-we-do",
    kicker: "2024",
    paragraphs: [
      "Crew 8 assists suppression crews with all risk incidents, including but not limited to vegetation fires, flooding, and downed tree removal.",
    ],
    groups: [
      {
        items: [
          "Type 2 IA Hand Crew",
          "8–18 trained Fire Fuels Crew Technicians",
          "1 Crew Superintendent/Fire Captain (Captain Eric Truax)",
          "1–2 Assistant Crew Boss",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "fuels-reduction",
    label: "Fuels Reduction",
    title: "Fuels Reduction",
    eyebrow: "What we do",
    hub: "what-we-do",
    kicker: "3,000 hours in 2024",
    paragraphs: [
      "Crew 8 implements controlled burns, thinning operations, and other fuel reduction techniques to decrease the risk of wildfire ignition and spread.",
    ],
    groups: [
      {
        heading: "Defensible space",
        items: [
          "Alta Mira Fuel Break, Castro Valley, CA",
          "Mines Rd Fuel Break / Defensible Space",
          "ACFD Facilities",
        ],
      },
      {
        heading: "Hazard tree mitigation",
        items: [
          "Mines Rd Burn Scar Tree Reduction",
          "Sycamore Grove Eucalyptus",
          "ACSO Bomb Range",
        ],
      },
      {
        heading: "Brush mitigation",
        items: [
          "Prescribed Burn",
          "Sunol Area Access Egress Project (Kilkare Rd)",
          "Canyon Middle School Project (Castro Valley)",
          "Community chipping provided throughout Alameda County",
          "Removal of invasive species",
          "Removed several tons of invasive species from Sunol Area",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "community-outreach",
    label: "Community Outreach",
    title: "Community Outreach",
    eyebrow: "What we do",
    hub: "what-we-do",
    kicker: "2024",
    paragraphs: [
      "Besides their fieldwork, Crew 8 engages in community outreach and education efforts to raise awareness about wildfire safety and preparedness.",
    ],
    groups: [
      {
        items: [
          "George Mark Children’s House BBQ, Birthday Event",
          "Crew trained as CPR instructors",
          "Community event BBQ in the Livermore Area",
          "Taught Bay EMT / ACFD Reserve Academy",
          "Assisted teaching online ACFD New Hire Wildland Academy",
          "Sandbag filling for the community during storm events",
          "Davis Street Christmas Event",
          "San Leandro Chetland Chili Cook-Off",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "master-mutual-aid",
    label: "Master Mutual Aid",
    title: "Master Mutual Aid",
    eyebrow: "What we do",
    hub: "what-we-do",
    kicker: "10,000 hours in 2024",
    paragraphs: [
      "Under CAL OES, Crew 8 provides master mutual aid throughout the state.",
    ],
    groups: [
      {
        heading: "2024 deployments",
        items: [
          "Corral Fire — June 1, 2024",
          "Creek Fire — July 26, 2024",
          "Park Fire (4th biggest fire in California) — July 29, 2024",
          "Bridge Fire (Southern California) — September 11, 2024",
          "CAL OES prepositions — January, July, August, September, October, November",
        ],
      },
      {
        heading: "Local mutual aid",
        items: [
          "Oakland Fire",
          "Hayward Fire",
          "Fremont Fire",
          "CAL FIRE",
          "East Bay Regional Parks",
          "Livermore-Pleasanton Fire",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "the-crew",
    label: "The Crew",
    title: "The Crew",
    eyebrow: "The crew",
    paragraphs: [],
    photoSlots: [],
  },
  {
    slug: "training-and-career",
    label: "Training and Career",
    title: "Training & Career Development",
    eyebrow: "The crew",
    hub: "the-crew",
    kicker: "5,000 hours in 2024",
    paragraphs: [
      "Crew 8 is held to a high rigorous training standard, creating competent employees able to build lifelong skill sets.",
    ],
    groups: [
      {
        items: [
          "Wildland Fire Fighting",
          "Rope Rescue",
          "Fireline Chainsaw Use",
          "Maps / Land Navigation",
          "Radios",
          "Fire Weather",
          "Air Operations",
          "Chipper Operations",
          "EMS / CPR",
          "Many additional training topics covered",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "physical-fitness",
    label: "Physical Fitness",
    title: "Physical Fitness",
    eyebrow: "The crew",
    hub: "the-crew",
    kicker: "3,000 hours in 2024",
    paragraphs: [
      "Crew 8 is held to a regimented physical fitness standard.",
    ],
    groups: [
      {
        heading: "Our PT includes",
        items: [
          "Running",
          "Hiking",
          "Weight training",
          "HIIT work outs",
          "Agility training",
          "Injury prevention",
          "Stretching",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "crew-8-development",
    label: "Crew 8 Development",
    title: "Crew 8 Career Development",
    eyebrow: "The crew",
    hub: "the-crew",
    kicker: "Lifelong skills",
    paragraphs: [],
    groups: [
      {
        heading: "Lifelong skills",
        items: ["Duty", "Respect", "Integrity", "Honesty", "Work Ethic", "Attention to Detail"],
      },
      {
        heading: "Crew members hired in municipal fire departments",
        items: [
          "Alameda County Fire — 6 members",
          "Oakland Fire — 1 member",
          "Hayward Fire — 1 member",
          "San Francisco — 1 member",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
  {
    slug: "members",
    label: "Members",
    title: "Members",
    eyebrow: "The crew",
    hub: "the-crew",
    kicker: "Who we are",
    paragraphs: [
      "Names and cities as listed in the 2024 Crew 8 presentation.",
    ],
    groups: [
      {
        items: [
          "Aaron Norton — Berkeley",
          "Eric Truax — San Lorenzo",
          "Aaron Harris — Oakland",
          "Cheyenne Davis — Martinez",
          "Tyler Hayes — Pleasanton",
          "Jess Fisi — Clayton",
          "Jaden Cardera — Dublin",
          "John Mertes — San Ramon",
          "Manuel Perez — Oakland",
          "Josh Montez — Oakland",
          "Fabian Banuelos — Hayward",
          "Jesus Delgado — Hayward",
          "Jair Salgado — Oakland",
          "Ryan Nielson — Pleasanton",
          "Phillip Stevenson — Oakland",
          "Kendell Paraja — Livermore",
          "Zeb Roldan — Oakland",
          "Kevin Montalvo Moreno — Oakland",
          "Cameron Naas — Castro Valley",
        ],
      },
    ],
    photoSlots: emptySlots(6),
  },
];

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

/** Detail pages that belong under a hub such as What We Do or The Crew. */
export function pagesInHub(hub: string) {
  return pages.filter((page) => page.hub === hub);
}
