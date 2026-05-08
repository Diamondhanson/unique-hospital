import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeUp } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { localizedAlternates, ogLocale, SITE } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  POSTS_LIST_QUERY,
  toBlogCardPost,
  type SanityListPost,
} from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates({ locale, pathname: "/blog" }),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: `/${locale}/blog`,
      locale: ogLocale(locale),
      siteName: SITE.name,
      images: [{ url: SITE.defaultOgImage, width: 1200, height: 800 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [SITE.defaultOgImage],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const sanityPosts = await client.fetch<SanityListPost[]>(POSTS_LIST_QUERY, {
    locale,
  });
  const posts = sanityPosts.map((p) =>
    toBlogCardPost(p, urlFor, t("defaultCategory")),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), path: `/${locale}` },
          { name: tNav("blog"), path: `/${locale}/blog` },
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
          <FadeUp delay={0.05}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-500">
              {t("subtitle")}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {posts.length === 0 ? (
          <p className="text-center text-ink-500">{t("emptyState")}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
