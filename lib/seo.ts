import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE = {
  url: "https://uniquehospital.cm",
  name: "Unique Hospital",
  defaultLocale: routing.defaultLocale as Locale,
  locales: routing.locales as readonly Locale[],
  defaultOgImage: "/images/doctor-portrait.jpg",
} as const;

export const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/blog",
  "/contact",
  "/appointment",
] as const;

function joinPath(locale: Locale, path: string) {
  const trimmed = path === "/" ? "" : path;
  return `/${locale}${trimmed}`;
}

/**
 * Build canonical + hreflang `alternates` for a localized page. Pass a
 * `pathname` *without* the locale prefix (e.g. `/about`, `/services/surgical-expertise`,
 * or `""` for the home page).
 */
export function localizedAlternates({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = joinPath(l, pathname);
  }
  // Search engines fall back to x-default when no other locale matches.
  languages["x-default"] = joinPath(SITE.defaultLocale, pathname);
  return {
    canonical: joinPath(locale, pathname),
    languages,
  };
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogLocale(locale: Locale) {
  return locale === "fr" ? "fr_FR" : "en_US";
}
