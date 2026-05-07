import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import "../../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
    metadataBase: new URL("https://uniquehospital.cm"),
    title: {
      default: t("metaTitle"),
      template: "%s · Unique Hospital",
    },
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
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
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-1 pt-3 sm:pt-4">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
