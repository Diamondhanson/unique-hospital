import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Baby,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SERVICE_DEFS, HOSPITAL } from "@/lib/hospital";
import { Link } from "@/i18n/navigation";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
  BreadcrumbJsonLd,
  MedicalServiceJsonLd,
} from "@/components/seo/JsonLd";
import { localizedAlternates, ogLocale, SITE } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

const ICONS = {
  Baby,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
} as const;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_DEFS.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const service = SERVICE_DEFS.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  const title = t(`${slug}.title`);
  const description = t(`${slug}.summary`);
  return {
    title,
    description,
    alternates: localizedAlternates({
      locale,
      pathname: `/services/${slug}`,
    }),
    openGraph: {
      title,
      description,
      type: "article",
      url: `/${locale}/services/${slug}`,
      locale: ogLocale(locale),
      siteName: SITE.name,
      images: [{ url: service.image, width: 1200, height: 800, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = SERVICE_DEFS.find((s) => s.slug === slug);
  if (!service) notFound();
  return <Detail locale={locale} slug={slug} service={service} />;
}

function Detail({
  locale,
  slug,
  service,
}: {
  locale: Locale;
  slug: string;
  service: (typeof SERVICE_DEFS)[number];
}) {
  const tServices = useTranslations("services");
  const t = useTranslations("servicesPage");
  const tCta = useTranslations("cta");
  const tHospital = useTranslations("hospital");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const Icon = ICONS[service.icon as keyof typeof ICONS];
  const others = SERVICE_DEFS.filter((s) => s.slug !== service.slug);
  const title = tServices(`${slug}.title`);
  const summary = tServices(`${slug}.summary`);
  const description = tServices(`${slug}.description`);
  const included = [1, 2, 3].map((n) => ({
    title: tServices(`${slug}.included${n}Title` as const),
    body: tServices(`${slug}.included${n}Body` as const),
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), path: `/${locale}` },
          { name: tNav("services"), path: `/${locale}/services` },
          { name: title, path: `/${locale}/services/${slug}` },
        ]}
      />
      <MedicalServiceJsonLd
        name={title}
        description={summary}
        url={`/${locale}/services/${slug}`}
        image={service.image}
      />
      <section className="grid-noise relative overflow-hidden px-6 pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {tCta("allServices")}
            </Link>
          </FadeUp>

          <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <FadeUp delay={0.05}>
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-glow`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
                    {t("serviceLabel")}
                  </span>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
                  {title}
                </h1>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-500">
                  {summary}
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">
                  {description}
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/appointment"
                    className="brand-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
                  >
                    {tCta("bookThisService")}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${HOSPITAL.phones[0].replace(/\s/g, "")}`}
                    className="dark-glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
                  >
                    {tCta("speakToClinician")}
                  </a>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.1} className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] soft-card">
                <Image
                  src={service.image}
                  alt={title}
                  fill
                  preload
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-900/40 via-transparent to-brand-lime-500/10" />
                <div className="dark-glass absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl px-4 py-3">
                  <ShieldCheck className="h-5 w-5 text-brand-lime-500" />
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {tCommon("usStandardCare")}
                    </div>
                    <div className="text-xs text-ink-500">
                      {t("usStandardSubtitle")}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            {t("includedEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
            {t("includedTitle")}
          </h2>
        </FadeUp>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {included.map((item, i) => (
            <StaggerItem key={item.title} className="rounded-3xl soft-card p-6">
              <span
                className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br ${service.accent} text-sm font-display font-semibold text-white`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {item.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-paper text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <FadeUp>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-500">
                  {t("atUniqueHospital")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  {t("ecosystemTitle", {
                    tagline: tHospital("tagline").toLowerCase(),
                  })}
                </h3>
              </div>
              <ul className="grid gap-2">
                {[1, 2, 3].map((n) => (
                  <li
                    key={n}
                    className="flex items-center gap-2 text-sm text-ink-700"
                  >
                    <Check className="h-4 w-4 text-brand-lime-500" />
                    {t(`ecosystemBullet${n}` as const)}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <FadeUp>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
                {t("othersEyebrow")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-ink-900 md:text-3xl">
                {t("othersTitle")}
              </h3>
            </div>
            <Link
              href="/services"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white sm:inline-flex"
            >
              {tCta("allServices")} →
            </Link>
          </div>
        </FadeUp>
        <Stagger className="grid gap-4 md:grid-cols-3">
          {others.map((s) => {
            const OtherIcon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl soft-card p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white`}
                  >
                    <OtherIcon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900">
                    {tServices(`${s.slug}.title`)}
                  </h4>
                  <p className="mt-2 flex-1 text-sm text-ink-500">
                    {tServices(`${s.slug}.summary`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-200">
                    {tCta("learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </>
  );
}
