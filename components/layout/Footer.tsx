import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import { HOSPITAL, NAV_LINKS } from "@/lib/hospital";
import { Link } from "@/i18n/navigation";
import { SocialLinks } from "@/components/social/SocialLinks";

export function Footer() {
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");
  const tFooter = useTranslations("footer");
  const tHospital = useTranslations("hospital");

  return (
    <footer className="mt-24 border-t border-white/10 bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            aria-label={HOSPITAL.name}
            className="inline-flex items-center"
          >
            <Image
              src="/logo.png"
              alt={HOSPITAL.name}
              width={707}
              height={353}
              className="h-[3.6rem] w-auto"
            />
          </Link>
          <p className="mt-4 max-w-md text-ink-500">
            {tFooter("bridgeText", { slogan: tHospital("slogan") })}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {HOSPITAL.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-blue-300 hover:text-white"
              >
                <Phone className="h-4 w-4" /> {phone}
              </a>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              {tFooter("connect")}
            </h4>
            <SocialLinks size="md" className="mt-3" />
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {tFooter("explore")}
          </h4>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink-700 hover:text-brand-blue-200"
                >
                  {tNav(l.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/appointment"
                className="text-ink-700 hover:text-brand-blue-200"
              >
                {tCta("book")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {tFooter("findUs")}
          </h4>
          <ul className="mt-4 space-y-3 text-ink-700">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-300" />
              <span>
                {tHospital("locationArea")}, {tHospital("locationCountry")}
                <br />
                {tHospital("locationLandmark")}
                <br />
                {tHospital("locationNeighborhood")}
                <br />
                <span className="text-ink-500">
                  {tHospital("locationDistrict")}
                </span>
              </span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-300" />
              <a
                href={`mailto:${HOSPITAL.email}`}
                className="hover:text-brand-blue-200"
              >
                {HOSPITAL.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-sm text-ink-500 sm:flex-row sm:items-center">
          <p>
            {tFooter("copyright", {
              year: new Date().getFullYear(),
              name: HOSPITAL.name,
              founder: HOSPITAL.founder,
            })}
          </p>
          <p>{tFooter("sloganShort")}</p>
        </div>
      </div>
    </footer>
  );
}
