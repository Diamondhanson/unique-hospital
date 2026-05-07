export const HOSPITAL = {
  name: "Unique Hospital",
  founded: "2022-08-08",
  founder: "Franklin Kehbuma",
  founderCredentials: "RN, BSN",
  phones: ["+237 652 775 214", "+237 676 621 850"],
  email: "hello@uniquehospital.cm",
  social: {
    facebook: "https://facebook.com/UniqueHospital",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

export const SERVICE_DEFS = [
  {
    slug: "specialized-care",
    icon: "Baby",
    accent: "from-brand-blue-500 to-brand-blue-700",
    image:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "surgical-expertise",
    icon: "Stethoscope",
    accent: "from-brand-blue-600 to-brand-lime-500",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "diagnostic-support",
    icon: "FlaskConical",
    accent: "from-brand-lime-500 to-brand-blue-500",
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "community-health",
    icon: "HeartHandshake",
    accent: "from-brand-lime-600 to-brand-blue-600",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export const STATS = [
  { value: "24/7", key: "alwaysOpen" },
  { value: "US", key: "trainedCare" },
  { value: "2022", key: "servingSince" },
  { value: "1", key: "paramedical" },
] as const;

export const PILLARS = [
  "facilities",
  "global",
  "patientFirst",
  "bonasama",
] as const;

export type ServiceDef = (typeof SERVICE_DEFS)[number];
export type ServiceSlug = ServiceDef["slug"];
