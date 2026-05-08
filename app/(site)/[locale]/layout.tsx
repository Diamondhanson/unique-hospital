import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import "../../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ThemeProvider,
  themeBootstrapScript,
} from "@/components/theme/ThemeProvider";
import {
  HospitalJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/JsonLd";
import { localizedAlternates, ogLocale, SITE } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display-stack",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("metaTitle"),
      template: "%s · Unique Hospital",
    },
    description: t("metaDescription"),
    applicationName: SITE.name,
    keywords:
      locale === "fr"
        ? [
            "Unique Hospital",
            "hôpital Bonaberi",
            "hôpital Douala",
            "gynécologie Cameroun",
            "obstétrique Douala",
            "chirurgie Bonaberi",
            "soins 24h/24 Cameroun",
            "laboratoire médical Douala",
            "Bonasama",
          ]
        : [
            "Unique Hospital",
            "Bonaberi hospital",
            "Douala hospital",
            "OBGYN Cameroon",
            "surgery Bonaberi",
            "24/7 emergency care Cameroon",
            "medical laboratory Douala",
            "Bonasama Health District",
          ],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      url: `/${locale}`,
      siteName: SITE.name,
      locale: ogLocale(locale as Locale),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale(l as Locale)),
      images: [
        {
          url: SITE.defaultOgImage,
          width: 1200,
          height: 800,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [SITE.defaultOgImage],
    },
    alternates: localizedAlternates({
      locale: locale as Locale,
      pathname: "",
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
        >
          {themeBootstrapScript}
        </Script>
        <HospitalJsonLd locale={locale as Locale} />
        <WebSiteJsonLd locale={locale as Locale} />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <main className="flex-1 pt-3 sm:pt-4">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
