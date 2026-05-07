import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/motion/Reveal";
import {
  POST_BY_SLUG_QUERY,
  POSTS_SLUGS_QUERY,
  type SanityFullPost,
} from "@/lib/blog";
import { routing, type Locale } from "@/i18n/routing";

export const revalidate = 60;

type SanityImage = {
  _key?: string;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};

const portableComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 font-display text-4xl font-semibold tracking-tight text-ink-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-3xl font-semibold tracking-tight text-ink-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-ink-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink-900">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-brand-blue-500 pl-5 text-lg italic text-ink-500">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-lg leading-8 text-ink-500">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-8 text-ink-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-8 text-ink-500">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink-900">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="rounded bg-ink-50 px-1.5 py-0.5 font-mono text-sm text-ink-900">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const blank = (value as { blank?: boolean } | undefined)?.blank ?? true;
      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-brand-blue-200 underline underline-offset-4 hover:text-brand-blue-300"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as SanityImage;
      if (!img?.asset) return null;
      const src = urlFor(img).width(1600).url();
      return (
        <figure className="mt-8 overflow-hidden rounded-2xl">
          <Image
            src={src}
            alt={img.alt ?? ""}
            width={1600}
            height={1000}
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-auto w-full object-cover"
          />
          {img.caption ? (
            <figcaption className="mt-2 text-center text-sm text-ink-500">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const slugs = await client.fetch<{ slug: string }[]>(POSTS_SLUGS_QUERY, {
      locale,
    });
    for (const { slug } of slugs) params.push({ locale, slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const post = await client.fetch<SanityFullPost | null>(POST_BY_SLUG_QUERY, {
    slug,
    locale,
  });
  if (!post) return { title: t("postNotFound") };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.mainImage
      ? { images: [urlFor(post.mainImage).width(1200).height(630).url()] }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tBlog = await getTranslations({ locale, namespace: "blogPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const post = await client.fetch<SanityFullPost | null>(POST_BY_SLUG_QUERY, {
    slug,
    locale,
  });
  if (!post) notFound();

  const readMinutes = Math.max(1, Math.round((post.bodyLength ?? 0) / 1000));
  const heroSrc = post.mainImage
    ? urlFor(post.mainImage).width(2000).height(1100).url()
    : null;

  const dateFormatter = new Intl.DateTimeFormat(
    locale === "fr" ? "fr-FR" : "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-12 md:pt-16">
      <FadeUp>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-blue-200"
        >
          <ArrowLeft className="h-4 w-4" />
          {tBlog("backLink")}
        </Link>
      </FadeUp>

      <FadeUp delay={0.04}>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 md:text-5xl">
          {post.title}
        </h1>
      </FadeUp>

      <FadeUp delay={0.08}>
        <div className="mt-5 flex items-center gap-3 text-sm text-ink-500">
          {post.publishedAt ? (
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
          ) : null}
          <span className="h-1 w-1 rounded-full bg-ink-300" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />{" "}
            {tCommon("minRead", { count: readMinutes })}
          </span>
        </div>
      </FadeUp>

      {heroSrc ? (
        <FadeUp delay={0.12}>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={heroSrc}
              alt={post.mainImageAlt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        </FadeUp>
      ) : null}

      {post.excerpt ? (
        <FadeUp delay={0.16}>
          <p className="mt-8 text-xl leading-8 text-ink-500">{post.excerpt}</p>
        </FadeUp>
      ) : null}

      <div className="mt-2">
        {post.body ? (
          <PortableText
            value={post.body as never}
            components={portableComponents}
          />
        ) : null}
      </div>
    </article>
  );
}
