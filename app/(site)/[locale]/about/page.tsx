import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Heart, Globe2, Sparkles, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HOSPITAL } from "@/lib/hospital";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent locale={locale} />;
}

function AboutContent({ locale }: { locale: Locale }) {
  const t = useTranslations("about");
  const tHospital = useTranslations("hospital");

  const founded = new Date(HOSPITAL.founded).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  return (
    <>
      <section className="grid-noise px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <span className="dark-glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-brand-blue-200">
              <Sparkles className="h-3.5 w-3.5" /> {t("badge")}
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
              {t("titlePre")}{" "}
              <span className="brand-gradient-text">{t("titleBrand")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-500">
              {t("subtitle", { tagline: tHospital("tagline") })}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-12 md:gap-12 md:py-20">
        <FadeUp className="md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] soft-card">
            <Image
              src="/images/lobby.jpg"
              alt="Unique Hospital reception"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </FadeUp>
        <div className="md:col-span-6">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
              {t("historyEyebrow")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
              {t("historyTitle", { date: founded })}
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              {t("historyBodyPre")}{" "}
              <span className="font-semibold">
                {t("historyFounderName", {
                  founder: HOSPITAL.founder,
                  credentials: HOSPITAL.founderCredentials,
                })}
              </span>
              .{" "}
              {t("historyBodyPost", { founderBio: tHospital("founderBio") })}
            </p>
            <p className="mt-4 text-lg leading-8 text-ink-500">
              {t("historyBody2")}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <FadeUp>
          <div className="rounded-[2.5rem] soft-card p-8 md:p-12">
            <Quote className="h-8 w-8 text-brand-lime-500" />
            <p className="mt-4 font-display text-2xl leading-relaxed tracking-tight text-ink-900 md:text-3xl">
              &ldquo;{t("missionQuote")}&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue-200">
              {t("missionAttrib")}
            </p>
          </div>
        </FadeUp>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, n: 1 as const },
            { icon: Globe2, n: 2 as const },
            { icon: GraduationCap, n: 3 as const },
            { icon: Sparkles, n: 4 as const },
          ].map(({ icon: Icon, n }) => (
            <StaggerItem
              key={n}
              className="rounded-3xl soft-card p-5"
            >
              <span className="brand-gradient grid h-10 w-10 place-items-center rounded-2xl text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-3 font-display text-lg font-semibold text-ink-900">
                {t(`value${n}Title` as const)}
              </div>
              <div className="mt-1 text-sm text-ink-500">
                {t(`value${n}Body` as const)}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-paper text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:py-24">
          <FadeUp className="md:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-500">
              {t("instituteEyebrow")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {t("instituteTitle")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              {t("instituteBody")}
            </p>
          </FadeUp>
          <FadeUp delay={0.08} className="md:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/images/paramedical-training.jpg"
                alt="Paramedical Institute students in training"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-900/40 via-transparent to-brand-lime-500/10" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
