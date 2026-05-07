import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeUp } from "@/components/motion/Reveal";
import type { Locale } from "@/i18n/routing";
import {
  POSTS_LIST_QUERY,
  toBlogCardPost,
  type SanityListPost,
} from "@/lib/blog";

export async function HomeBlogSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const tCta = await getTranslations({ locale, namespace: "cta" });
  const tBlog = await getTranslations({ locale, namespace: "blogPage" });

  const posts = await client.fetch<SanityListPost[]>(POSTS_LIST_QUERY, {
    locale,
  });
  if (posts.length === 0) return null;

  const cards = posts.slice(0, 3).map((p) =>
    toBlogCardPost(p, urlFor, tBlog("defaultCategory")),
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between gap-6">
        <FadeUp className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            {t("blogEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t("blogTitle")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <Link
            href="/blog"
            className="dark-glass inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
          >
            {tCta("allArticles")} <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((p, i) => (
          <BlogCard key={p.slug} post={p} index={i} />
        ))}
      </div>
    </section>
  );
}
