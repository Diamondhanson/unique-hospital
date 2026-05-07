import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SERVICE_DEFS } from "@/lib/hospital";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/motion/Reveal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("servicesPage");
  const tServices = useTranslations("services");
  const tCta = useTranslations("cta");

  return (
    <>
      <section className="grid-noise px-6 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
              {t("titlePre")}{" "}
              <span className="brand-gradient-text">{t("titleBrand")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-500">
              {t("subtitle")}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-16 px-6 py-16 md:space-y-24 md:py-24">
        {SERVICE_DEFS.map((s, i) => {
          const title = tServices(`${s.slug}.title`);
          const summary = tServices(`${s.slug}.summary`);
          const bullets = [
            tServices(`${s.slug}.bullet1`),
            tServices(`${s.slug}.bullet2`),
            tServices(`${s.slug}.bullet3`),
          ];
          return (
            <FadeUp key={s.slug}>
              <article
                id={s.slug}
                className={`grid scroll-mt-32 items-center gap-10 md:grid-cols-12 md:gap-14 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="md:col-span-6">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-[2rem] soft-card"
                  >
                    <Image
                      src={s.image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </Link>
                </div>
                <div className="md:col-span-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
                    {String(i + 1).padStart(2, "0")} · {t("serviceLabel")}
                  </span>
                  <h2 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
                    <Link
                      href={`/services/${s.slug}`}
                      className="hover:text-brand-blue-200"
                    >
                      {title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-ink-500">
                    {summary}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-ink-700"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-lime-500/20 text-brand-lime-300">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/services/${s.slug}`}
                      className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
                    >
                      {tCta("learnMore")} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/appointment"
                      className="dark-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
                    >
                      {tCta("bookThisService")}
                    </Link>
                  </div>
                </div>
              </article>
            </FadeUp>
          );
        })}
      </section>
    </>
  );
}
