"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "@/lib/hospital";

const ease = [0.22, 1, 0.36, 1] as const;

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function BlogCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl soft-card"
    >
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-blue-700 backdrop-blur">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <time dateTime={post.date}>
              {formatter.format(new Date(post.date))}
            </time>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink-900 group-hover:text-brand-blue-200">
            {post.title}
          </h3>
          <p className="text-ink-500">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-200">
            Read article
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
