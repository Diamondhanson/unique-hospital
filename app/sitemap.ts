import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_SLUGS_QUERY } from "@/lib/blog";
import { SERVICE_DEFS } from "@/lib/hospital";
import { SITE, STATIC_PATHS } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export const revalidate = 3600;

type SlugRow = { slug: string };

async function safeFetchSlugs(locale: string): Promise<string[]> {
  try {
    const rows = await client.fetch<SlugRow[]>(POSTS_SLUGS_QUERY, { locale });
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    // Studio offline / no posts yet — sitemap should still build.
    return [];
  }
}

function alternateLanguages(pathWithoutLocale: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] =
      `${SITE.url}/${l}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  }
  return languages;
}

function buildEntry(
  locale: string,
  pathWithoutLocale: string,
  options: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified?: Date | string },
): MetadataRoute.Sitemap[number] {
  const tail = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  return {
    url: `${SITE.url}/${locale}${tail}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages: alternateLanguages(pathWithoutLocale) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      const isHome = path === "";
      entries.push(
        buildEntry(locale, path, {
          changeFrequency: isHome ? "weekly" : "monthly",
          priority: isHome ? 1.0 : path === "/blog" ? 0.7 : 0.8,
          lastModified: now,
        }),
      );
    }

    for (const service of SERVICE_DEFS) {
      entries.push(
        buildEntry(locale, `/services/${service.slug}`, {
          changeFrequency: "monthly",
          priority: 0.7,
          lastModified: now,
        }),
      );
    }

    const blogSlugs = await safeFetchSlugs(locale);
    for (const slug of blogSlugs) {
      entries.push(
        buildEntry(locale, `/blog/${slug}`, {
          changeFrequency: "weekly",
          priority: 0.6,
        }),
      );
    }
  }

  return entries;
}
