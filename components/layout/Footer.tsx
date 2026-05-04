"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, HeartPulse } from "lucide-react";
import { HOSPITAL, NAV_LINKS } from "@/lib/hospital";
import { useLang } from "@/components/i18n/LangProvider";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-24 border-t border-white/10 bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="brand-gradient grid h-9 w-9 place-items-center rounded-2xl text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-ink-900">
              {HOSPITAL.name}
            </span>
          </Link>
          <p className="mt-4 max-w-md text-ink-500">
            Bridging international healthcare standards with local accessibility
            in Douala, Cameroon. {HOSPITAL.slogan}.
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
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {t("footer.explore")}
          </h4>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink-700 hover:text-brand-blue-200"
                >
                  {t(l.labelKey)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/appointment"
                className="text-ink-700 hover:text-brand-blue-200"
              >
                {t("cta.book")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {t("footer.find_us")}
          </h4>
          <ul className="mt-4 space-y-3 text-ink-700">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-300" />
              <span>
                {HOSPITAL.location.area}, {HOSPITAL.location.country}
                <br />
                {HOSPITAL.location.landmark}
                <br />
                {HOSPITAL.location.neighborhood}
                <br />
                <span className="text-ink-500">
                  {HOSPITAL.location.district}
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
            © {new Date().getFullYear()} {HOSPITAL.name}. Founded by{" "}
            {HOSPITAL.founder}.
          </p>
          <p>Service of the Heart · Bonaberi-Douala</p>
        </div>
      </div>
    </footer>
  );
}
