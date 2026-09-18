/**
 * Single source of truth for every word on this site.
 *
 * All copy below is taken from the original Crew8_Website.html concept kept in reference/.
 * Nothing here is invented. Where the source had no content for a slot the value is a
 * `TODO_` constant so it is obvious on the page and greppable in the codebase.
 *
 * The source file was truncated while being saved, so it contained no contact section,
 * footer, or CTA copy at all — those are the gaps marked below.
 */

/** Marks copy the source did not contain. Renders visibly so it cannot ship unnoticed. */
export const TODO = (what: string) => `TODO — supply ${what}`;

export const site = {
  name: "Crew 8",
  organization: "Alameda County Fire Department",

  /** Verbatim <title> from the source document. */
  title: "Crew 8 | Alameda County Fire Department",

  /**
   * The source had no meta description. This one is assembled only from source strings:
   * the hero eyebrow ("ACFD Wildland Hand Crew") and the mission paragraph.
   */
  description:
    "Crew 8 is an Alameda County Fire Department wildland hand crew supporting hazardous fuels reduction, defensible space improvement, roadside vegetation projects, storm recovery, public safety operations, training, and emergency response.",

  /**
   * Slide pages live in the About dropdown. Gallery and Contact stay as top-level links.
   */
  nav: [
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    eyebrow: "ACFD Wildland Hand Crew",
    heading: "Crew 8",
    organization: "Alameda County Fire Department",
    kicker: "Protect. Respond. Restore. Serve.",
    body: "Wildland fuels reduction, vegetation management, storm response, emergency support, and community resiliency throughout Alameda County.",
    actions: [
      { label: "Explore our work", href: "/what-we-do", variant: "primary" as const },
      { label: "View gallery", href: "/gallery", variant: "secondary" as const },
    ],
  },

  pillars: [
    { number: "01", title: "Protect", description: "Reduce wildfire risk" },
    { number: "02", title: "Respond", description: "Support emergency operations" },
    { number: "03", title: "Restore", description: "Improve resilient landscapes" },
    { number: "04", title: "Serve", description: "Strengthen communities" },
  ],

  mission: {
    number: "01",
    eyebrow: "Built for the field",
    /** The source set this as two lines with an explicit <br>. */
    headingLines: ["Mission-driven.", "Community-focused."],
    intro:
      "Crew 8 supports hazardous fuels reduction, defensible space improvement, roadside vegetation projects, storm recovery, public safety operations, training, and emergency response.",
    storyHeading: "More than a fuels crew.",
    storyBody:
      "Crew 8 combines hands-on field capability with a public-service mission. The crew supports planned mitigation work and can pivot to urgent community and emergency needs.",
  },

  capabilities: {
    number: "02",
    eyebrow: "Capabilities",
    heading: "What Crew 8 does",
    intro:
      "Field work that reduces hazards, restores access, and supports Alameda County communities.",
    items: [
      {
        index: "01",
        category: "Fuels",
        title: "Vegetation Management",
        body: "Chipping, brush removal, roadside clearance, and strategic fuels-reduction work.",
        image: "vegetationManagement" as const,
      },
      {
        index: "02",
        category: "Response",
        title: "Storm Operations",
        body: "Debris clearance, access restoration, and field support during storm impacts.",
        image: "stormDamagedTrees" as const,
      },
      {
        index: "03",
        category: "Community",
        title: "Community Resiliency",
        body: "Erosion control, sandbag operations, environmental restoration, and public safety projects.",
        image: "erosionControl" as const,
      },
    ],
  },

  gallery: {
    eyebrow: "In the field",
    heading: "Crew 8 in action",
    intro: "Select any image for a full-screen view.",
    /** Page title and description for the /gallery route, built only from source wording. */
    metaTitle: "Gallery | Crew 8 — Alameda County Fire Department",
    metaDescription:
      "Photographs of Crew 8 in the field: vegetation management, storm operations, sandbag operations, erosion control, and community projects in Alameda County.",
  },

  contact: {
    number: "03",
    eyebrow: "Contact",
    heading: "Contact Crew 8",
    /*
     * Everything in this section is missing from the source material. Replace each value
     * below with real, publishable department information. Delete any line that should
     * not be published rather than leaving a placeholder.
     */
    intro: TODO("a short public-facing contact paragraph"),
    details: [
      { label: "General inquiries", value: TODO("public email address") },
      { label: "Phone", value: TODO("public phone number") },
      { label: "Mailing address", value: TODO("mailing address") },
    ],
    /** For genuine emergencies the public message should be unambiguous. */
    emergencyNote: TODO("the department's preferred emergency-vs-inquiry wording"),
  },

  footer: {
    /** The source contained no footer markup, so there is no copyright or link text to preserve. */
    note: TODO("any required department disclaimer or credit line"),
  },
} as const;

/**
 * Alt text and captions for the photographs recovered from the source file.
 *
 * Where the source supplied alt text it is kept and, having viewed each photograph,
 * extended only with what is plainly visible in the frame. Captions reuse the source's own
 * vocabulary — "Crew 8", "Community Project", and the capability names — so no caption
 * asserts a location, date, or incident the source never stated.
 */
export const photos = {
  crew8Group: {
    /** Source alt: "Crew 8 group photo" */
    alt: "Crew 8 personnel assembled at night in front of the CRW8-A apparatus",
    caption: "Crew 8",
  },
  communityProject: {
    /** Source alt: "Crew members performing a community project" */
    alt: "Crew members filling and staging sandbags beside the CRW8-A apparatus",
    caption: "Community Project",
  },
  sandbagOperations: {
    alt: "Crew members shovelling sand and filling sandbags from a sand pile",
    caption: "Sandbag Operations",
  },
  vegetationManagement: {
    /** Source alt: "Vegetation management equipment in a wooded area" */
    alt: "Chipper staged on a tree-lined road during vegetation management work",
    caption: "Vegetation Management",
  },
  stormDamagedTrees: {
    /** Source alt: "Crew working around storm-damaged trees" */
    alt: "Crew members in high-visibility gear clearing a large downed tree from a roadway",
    caption: "Storm Operations",
  },
  erosionControl: {
    /** Source alt: "Crew installing erosion-control material" */
    alt: "Crew members installing an erosion-control wattle in a trench beside an apparatus",
    caption: "Erosion Control",
  },
  handCrewShield: {
    /** Source alt: "ACFD Hand Crew shield on apparatus" */
    alt: "ACFD Hand Crew shield emblem on the door of a Crew 8 apparatus",
    caption: "ACFD Hand Crew",
  },
} as const;

export const logoAlt = "Alameda County Fire Department logo";
