import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock4, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HOSPITAL } from "@/lib/hospital";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/social/SocialLinks";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { localizedAlternates, ogLocale, SITE } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates({ locale, pathname: "/contact" }),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: `/${locale}/contact`,
      locale: ogLocale(locale),
      siteName: SITE.name,
      images: [{ url: "/images/about-reception.jpg", width: 1200, height: 800 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/images/about-reception.jpg"],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent locale={locale} />;
}

function ContactContent({ locale }: { locale: Locale }) {
  const t = useTranslations("contactPage");
  const tHospital = useTranslations("hospital");
  const tNav = useTranslations("nav");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), path: `/${locale}` },
          { name: tNav("contact"), path: `/${locale}/contact` },
        ]}
      />
      <section className="grid-noise px-6 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
              {t("titlePre")}{" "}
              <span className="brand-gradient-text">{t("titleBrand")}</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <Stagger className="grid gap-5 md:grid-cols-3">
          <StaggerItem className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              {t("findUs")}
            </h3>
            <p className="mt-2 text-ink-500">
              {tHospital("locationArea")}
              <br />
              {tHospital("locationLandmark")}
              <br />
              {tHospital("locationNeighborhood")}
              <br />
              <span className="text-ink-700">
                {tHospital("locationDistrict")}
              </span>
            </p>
          </StaggerItem>
          <StaggerItem className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <Phone className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              {t("call247")}
            </h3>
            <ul className="mt-2 space-y-1">
              {HOSPITAL.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="font-semibold text-brand-blue-200 hover:underline"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <Mail className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              {t("email")}
            </h3>
            <p className="mt-2">
              <a
                href={`mailto:${HOSPITAL.email}`}
                className="font-semibold text-brand-blue-200 hover:underline"
              >
                {HOSPITAL.email}
              </a>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-500">
              <Clock4 className="h-4 w-4" /> {t("replyWithin")}
            </p>
          </StaggerItem>
        </Stagger>

        <FadeUp className="mt-6">
          <div className="rounded-3xl soft-card flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex items-start gap-4">
              <span className="brand-gradient grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                  {t("quickConnect")}
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  {t("quickConnectBody")}
                </p>
              </div>
            </div>
            <SocialLinks size="md" />
          </div>
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="grid gap-2 text-center md:gap-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              {t("formTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-ink-500">{t("formSubtitle")}</p>
          </div>
        </FadeUp>

        <FadeUp className="mt-8">
          <ContactForm />
        </FadeUp>

        <FadeUp className="mt-12">
          <div className="overflow-hidden rounded-[2rem] soft-card">
            <iframe
              title={t("mapTitle")}
              src="https://www.openstreetmap.org/export/embed.html?bbox=9.66%2C4.06%2C9.72%2C4.10&layer=mapnik&marker=4.082%2C9.692"
              loading="lazy"
              className="h-[420px] w-full border-0"
            />
          </div>
        </FadeUp>
      </section>
    </>
  );
}
