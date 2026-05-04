import type { Metadata } from "next";
import { POSTS } from "@/lib/hospital";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeUp } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Blog & News",
  description:
    "Health tips, hospital updates, and stories from the Bonasama community.",
};

export default function BlogPage() {
  return (
    <>
      <section className="grid-noise px-6 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
              Stories from{" "}
              <span className="brand-gradient-text">our community.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-500">
              Practical health tips, hospital updates, and behind-the-scenes
              looks at how we deliver care.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
