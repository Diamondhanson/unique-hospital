import Image from "next/image";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock4,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { HOSPITAL, STATS, PILLARS } from "@/lib/hospital";
import { Link } from "@/i18n/navigation";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BentoServices } from "@/components/sections/BentoServices";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HomeBlogSection } from "@/components/sections/HomeBlogSection";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ServicesSection />
      <PhilosophySection />
      <PillarsSection />
      <FamilySection />
      <HomeBlogSection locale={locale} />
      <CtaSection />
    </>
  );
}

function Hero() {
  const t = useTranslations("home");
  const tHospital = useTranslations("hospital");
  const tStats = useTranslations("stats");
  const tCommon = useTranslations("common");

  return (
    <section className="relative overflow-hidden grid-noise">
      <HeroBackdrop />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 md:grid-cols-12 md:gap-12 md:pb-24 md:pt-16">
        <div className="md:col-span-7">
          <FadeUp delay={0.05}>
            <h1 className="brand-gradient-text font-display text-5xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {HOSPITAL.name}
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-3xl md:text-4xl">
              {t("heroTitlePre")}{" "}
              <span className="brand-gradient-text">{t("heroTitleBrand")}</span>{" "}
              {t("heroTitlePost")}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-500">
              {t("heroSubtitle", { tagline: tHospital("tagline") })}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/appointment"
                className="brand-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
              >
                {t("bookCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
          <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <StaggerItem
                key={s.key}
                className="rounded-3xl soft-card px-4 py-4"
              >
                <div className="font-display text-2xl font-semibold tracking-tight text-brand-blue-200">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-ink-500">{tStats(s.key)}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeUp delay={0.1} className="md:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] soft-card">
              <Image
                src="/images/doctor-portrait.jpg"
                alt="Unique Hospital clinician"
                fill
                preload
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="dark-glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="brand-gradient grid h-9 w-9 place-items-center rounded-xl text-white">
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {tCommon("twentyFourSeven")}
                    </div>
                    <div className="text-xs text-ink-500">
                      {tHospital("locationArea")}
                    </div>
                  </div>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-lime-600" />
              </div>
            </div>

            <div className="absolute -left-6 top-12 hidden rounded-2xl soft-card px-4 py-3 sm:flex sm:items-center sm:gap-3">
              <Clock4 className="h-5 w-5 text-brand-blue-300" />
              <div>
                <div className="text-sm font-semibold text-ink-900">
                  {tCommon("averageWait")}
                </div>
                <div className="text-xs text-ink-500">
                  {tCommon("averageWaitValue")}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-24 hidden rounded-2xl bg-paper border border-white/10 px-4 py-3 text-foreground sm:flex sm:items-center sm:gap-3">
              <Stethoscope className="h-5 w-5 text-brand-lime-500" />
              <div>
                <div className="text-sm font-semibold">
                  {tCommon("usStandardCare")}
                </div>
                <div className="text-xs text-ink-500">
                  {tCommon("guidedProtocols")}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ServicesSection() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <FadeUp className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            {t("servicesEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t("servicesTitlePre")}{" "}
            <span className="brand-gradient-text">
              {t("servicesTitleBrand")}
            </span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <Link
            href="/services"
            className="dark-glass inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
          >
            {tCta("exploreAllServices")} <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
      <BentoServices />
    </section>
  );
}

function PhilosophySection() {
  const t = useTranslations("home");
  return (
    <section className="relative overflow-hidden bg-paper text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-12">
        <FadeUp className="md:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-500">
            {t("philosophyEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {t("philosophyTitle")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.08} className="md:col-span-7">
          <p className="text-lg leading-8 text-ink-700">
            {t("philosophyBody")}
          </p>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <StaggerItem
                key={n}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="font-display text-lg font-semibold">
                  {t(`philosophyPillar${n}Title` as const)}
                </div>
                <div className="mt-1 text-sm text-ink-500">
                  {t(`philosophyPillar${n}Body` as const)}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeUp>
      </div>
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-blue-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-[320px] w-[320px] rounded-full bg-brand-lime-500/20 blur-3xl" />
    </section>
  );
}

function PillarsSection() {
  const t = useTranslations("home");
  const tPillars = useTranslations("pillars");
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            {t("pillarsEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t("pillarsTitlePre")}{" "}
            <span className="brand-gradient-text">
              {t("pillarsTitleBrand")}
            </span>
          </h2>
        </FadeUp>
      </div>
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((key, i) => (
          <StaggerItem key={key} className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-10 w-10 place-items-center rounded-2xl text-sm font-display font-semibold text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900">
              {tPillars(`${key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              {tPillars(`${key}.body`)}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function FamilySection() {
  const t = useTranslations("home");
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <FadeUp>
        <div className="grid gap-10 rounded-[2.5rem] soft-card overflow-hidden md:grid-cols-12">
          <div className="md:col-span-7 p-8 md:p-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-300">
              {t("familyEyebrow")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
              {t("familyTitle")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              {t("familyBody")}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <li
                  key={n}
                  className="flex items-center gap-2 text-sm text-ink-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-lime-500" />
                  {t(`familyBullet${n}` as const)}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5 relative min-h-[280px]">
            <Image
              src="/images/nurse-portrait.jpg"
              alt="Unique Hospital nurse"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-900/40 via-transparent to-brand-lime-500/10" />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");
  const tHospital = useTranslations("hospital");
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <FadeUp>
        <div className="brand-gradient relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-white md:px-16 md:py-20">
          <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {t("ctaTitle")}
              </h3>
              <p className="mt-3 text-white/85">
                {t("ctaSubtitle", {
                  landmark: tHospital("locationLandmark"),
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand-blue-700 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
              >
                {tCta("bookOnline")} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${HOSPITAL.phones[0].replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {HOSPITAL.phones[0]}
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-24 -right-12 h-[300px] w-[300px] rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -left-12 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />
        </div>
      </FadeUp>
    </section>
  );
}
