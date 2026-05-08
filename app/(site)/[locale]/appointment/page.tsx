import type { Metadata } from "next";
import { ShieldCheck, Clock4, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HOSPITAL } from "@/lib/hospital";
import { BookingForm } from "@/components/booking/BookingForm";
import { FadeUp } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { localizedAlternates, ogLocale, SITE } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointmentPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates({ locale, pathname: "/appointment" }),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: `/${locale}/appointment`,
      locale: ogLocale(locale),
      siteName: SITE.name,
      images: [{ url: "/images/doctor-portrait.jpg", width: 1200, height: 800 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/images/doctor-portrait.jpg"],
    },
  };
}

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AppointmentContent locale={locale} />;
}

function AppointmentContent({ locale }: { locale: Locale }) {
  const t = useTranslations("appointmentPage");
  const tHospital = useTranslations("hospital");
  const tNav = useTranslations("nav");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), path: `/${locale}` },
          { name: t("eyebrow"), path: `/${locale}/appointment` },
        ]}
      />
    <section className="grid-noise px-6 pb-20 pt-12 md:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
              {t("eyebrow")}
            </span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-5xl">
              {t("titlePre")}{" "}
              <span className="brand-gradient-text">{t("titleBrand")}</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-500">
              {t("subtitle")}
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <ul className="mt-8 space-y-3">
              <li className="flex items-start gap-3 rounded-2xl soft-card p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-300" />
                <div>
                  <div className="font-semibold text-ink-900">
                    {t("card1Title")}
                  </div>
                  <div className="text-sm text-ink-500">{t("card1Body")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl soft-card p-4">
                <Clock4 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-300" />
                <div>
                  <div className="font-semibold text-ink-900">
                    {t("card2Title")}
                  </div>
                  <div className="text-sm text-ink-500">
                    {tHospital("locationLandmark")}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl soft-card p-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-300" />
                <div>
                  <div className="font-semibold text-ink-900">
                    {t("card3Title")}
                  </div>
                  <div className="text-sm">
                    {HOSPITAL.phones.map((p, i) => (
                      <span key={p}>
                        <a
                          href={`tel:${p.replace(/\s/g, "")}`}
                          className="font-semibold text-brand-blue-200 hover:underline"
                        >
                          {p}
                        </a>
                        {i < HOSPITAL.phones.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </FadeUp>
        </div>

        <div className="md:col-span-7">
          <FadeUp>
            <BookingForm />
          </FadeUp>
        </div>
      </div>
    </section>
    </>
  );
}
