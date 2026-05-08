export const HOSPITAL = {
  name: "Unique Hospital",
  founded: "2022-08-08",
  founder: "Franklin Kehbuma",
  founderCredentials: "RN, BSN",
  phones: ["+237 652 775 214", "+237 676 621 850"],
  email: "uniquehospitalbonaberi@gmail.com",
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
    image: "/images/service-specialized-care.jpg",
  },
  {
    slug: "surgical-expertise",
    icon: "Stethoscope",
    accent: "from-brand-blue-600 to-brand-lime-500",
    image: "/images/service-surgical.jpg",
  },
  {
    slug: "diagnostic-support",
    icon: "FlaskConical",
    accent: "from-brand-lime-500 to-brand-blue-500",
    image: "/images/service-diagnostic.jpg",
  },
  {
    slug: "community-health",
    icon: "HeartHandshake",
    accent: "from-brand-lime-600 to-brand-blue-600",
    image: "/images/service-community.jpg",
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
