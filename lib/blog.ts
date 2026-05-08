import type { ImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
import type { BlogCardPost } from "@/components/blog/BlogCard";

export type SanityListPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImageSource;
  bodyLength?: number;
};

export type SanityFullPost = SanityListPost & {
  body?: unknown;
  mainImageAlt?: string;
};

export const POSTS_LIST_QUERY = `*[_type == "post" && defined(slug.current) && (language == $locale || (!defined(language) && $locale == "en"))] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "bodyLength": length(pt::text(body))
}`;

export const POSTS_SLUGS_QUERY = `*[_type == "post" && defined(slug.current) && (language == $locale || (!defined(language) && $locale == "en"))]{ "slug": slug.current }`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "en"))][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "mainImageAlt": mainImage.alt,
  body,
  "bodyLength": length(pt::text(body))
}`;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80";

export function toBlogCardPost(
  p: SanityListPost,
  urlFor: (s: SanityImageSource) => ImageUrlBuilder,
  defaultCategory: string,
): BlogCardPost {
  const readMinutes = Math.max(1, Math.round((p.bodyLength ?? 0) / 1000));
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    category: defaultCategory,
    readMinutes,
    date: p.publishedAt ?? new Date().toISOString(),
    image: p.mainImage
      ? urlFor(p.mainImage).width(1600).height(1000).url()
      : FALLBACK_IMAGE,
  };
}
