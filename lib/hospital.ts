export const HOSPITAL = {
  name: "Unique Hospital",
  slogan: "Service of the Heart",
  tagline: "Care that heals, compassion that stays",
  founded: "2022-08-08",
  founder: "Franklin Kehbuma",
  founderCredentials: "RN, BSN",
  founderBio:
    "After a distinguished career as a Registered Nurse in the United States, Mr. Kehbuma returned to his roots with a clear mission: to close the gap between international healthcare standards and local accessibility.",
  location: {
    district: "Wouri – Bonasama Health District",
    area: "Bonaberi, Douala",
    landmark: "Cibec Entrance (Near Tradex), behind Mother Julia Primary School",
    neighborhood: "Minkwelle",
    country: "Cameroon",
  },
  phones: ["+237 652 775 214", "+237 676 621 850"],
  email: "hello@uniquehospital.cm",
  social: {
    facebook: "https://facebook.com/UniqueHospital",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export const SERVICES = [
  {
    slug: "specialized-care",
    title: "Specialized Care",
    summary:
      "Compassionate, expert-led care across women's health, maternity, and consultations — anchored in international protocols.",
    description:
      "From the first prenatal visit to your child's first vaccine, our specialized-care team is built around continuity. Internationally trained physicians and nurses lead every step, supported by modern equipment and a quiet, dignified environment that puts patients at ease.",
    bullets: [
      "Obstetrics & Gynecology",
      "Maternity & Neonatology",
      "General & specialized consultations",
    ],
    included: [
      {
        title: "Obstetrics & Gynecology",
        body: "Comprehensive women's health — routine exams, family planning, fertility consultations, and gynecological care.",
      },
      {
        title: "Maternity & Neonatology",
        body: "Antenatal visits, safe deliveries 24/7, and dedicated neonatal monitoring for newborns.",
      },
      {
        title: "General & specialized consultations",
        body: "Adult and pediatric consultations led by physicians trained to international standards.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1600&q=80",
    icon: "Baby",
    accent: "from-brand-blue-500 to-brand-blue-700",
  },
  {
    slug: "surgical-expertise",
    title: "Surgical Expertise",
    summary:
      "Modern operating theatres and experienced surgeons for procedures from elective to aesthetic — with patient comfort first.",
    description:
      "Our surgical suites are built for precision and safety. Pre-operative planning, sterile technique, and post-operative recovery are coordinated by a single team — so you only ever have one care plan to follow.",
    bullets: ["General surgery", "Cosmetic & aesthetic surgery"],
    included: [
      {
        title: "General surgery",
        body: "Elective and emergency procedures performed in a modern operating theatre with experienced surgeons.",
      },
      {
        title: "Cosmetic & aesthetic surgery",
        body: "Aesthetic procedures led by certified surgeons, with private consultations and discreet aftercare.",
      },
      {
        title: "Pre & post-operative care",
        body: "Personalized recovery plans, in-house nursing, and follow-up so healing stays on track.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80",
    icon: "Stethoscope",
    accent: "from-brand-blue-600 to-brand-lime-500",
  },
  {
    slug: "diagnostic-support",
    title: "Diagnostic & Support Services",
    summary:
      "Accurate diagnostics, fast results, and continuous nursing care — every supporting service runs to the same clinical standard.",
    description:
      "Diagnostics shouldn't feel like an extra trip. Our on-site laboratory, pharmacy, and imaging are coordinated with the clinical team so you can move from consultation to result to treatment without leaving the building.",
    bullets: [
      "Modern laboratory & pharmacy",
      "Radiography & ultrasonography",
      "Nursing services & hospitalization",
    ],
    included: [
      {
        title: "Modern laboratory & pharmacy",
        body: "On-site lab with same-day results and a fully stocked pharmacy under one roof.",
      },
      {
        title: "Radiography & ultrasonography",
        body: "Digital imaging interpreted by trained radiology staff, including obstetric ultrasound.",
      },
      {
        title: "Nursing services & hospitalization",
        body: "Comfortable inpatient wards with attentive nursing care available 24/7.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1600&q=80",
    icon: "FlaskConical",
    accent: "from-brand-lime-500 to-brand-blue-500",
  },
  {
    slug: "community-health",
    title: "Community Health",
    summary:
      "Preventive care that meets the Bonasama community where it lives — dental services, vaccinations, and health education.",
    description:
      "Healthy communities are built one habit at a time. Our community-health programs bring preventive services to families across the Bonasama Health District through dental clinics, vaccination drives, and on-the-ground education.",
    bullets: ["Dental services", "Vaccination & preventive care"],
    included: [
      {
        title: "Dental services",
        body: "Routine cleanings, restorative dentistry, and preventive care for the whole family.",
      },
      {
        title: "Vaccination & preventive care",
        body: "Immunization schedules and seasonal vaccination drives for children and adults.",
      },
      {
        title: "Health education & outreach",
        body: "Community workshops on nutrition, malaria prevention, and rainy-season safety.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
    icon: "HeartHandshake",
    accent: "from-brand-lime-600 to-brand-blue-600",
  },
] as const;

export const STATS = [
  { value: "24/7", label: "Always-open emergency care" },
  { value: "US", label: "Trained, internationally guided care" },
  { value: "2022", label: "Serving Bonaberi-Douala since" },
  { value: "1", label: "Paramedical Institute on-site" },
] as const;

export const PILLARS = [
  {
    title: "State-of-the-art facilities",
    body: "Modern wards and equipment designed for comfort and precision.",
  },
  {
    title: "Local roots, global standards",
    body: "A blend of local dedication and international experience.",
  },
  {
    title: "Patient-first, every touchpoint",
    body: "We prioritize patient satisfaction and well-being from arrival to follow-up.",
  },
  {
    title: "In the heart of Bonasama",
    body: "Located in the Bonasama Health District for easy access.",
  },
] as const;

export const POSTS = [
  {
    slug: "prenatal-checklist",
    title: "Your trimester-by-trimester prenatal checklist",
    excerpt:
      "A practical guide for expecting mothers in Douala — what to track, when to visit, and what to ask.",
    category: "Maternity",
    readMinutes: 6,
    date: "2026-04-21",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "vaccination-drive-bonaberi",
    title: "Inside our community vaccination drive in Bonaberi",
    excerpt:
      "How the Unique Hospital outreach team brought preventive care to over 1,200 children this quarter.",
    category: "Community",
    readMinutes: 4,
    date: "2026-03-12",
    image:
      "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "rainy-season-health",
    title: "Staying healthy through Cameroon's rainy season",
    excerpt:
      "From malaria prevention to safe drinking water — small habits that protect your family.",
    category: "Health Tips",
    readMinutes: 5,
    date: "2026-02-02",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export type Service = (typeof SERVICES)[number];
export type Post = (typeof POSTS)[number];
export type Pillar = (typeof PILLARS)[number];
