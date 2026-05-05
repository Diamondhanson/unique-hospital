"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Baby, Stethoscope, FlaskConical, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/hospital";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const ICONS = {
  Baby,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
} as const;

export function BentoServices() {
  return (
    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {SERVICES.map((s) => {
        const Icon = ICONS[s.icon as keyof typeof ICONS];
        return (
          <StaggerItem
            key={s.slug}
            className="group relative flex flex-col overflow-hidden rounded-bento soft-card"
          >
            <Link href={`/services/${s.slug}`} className="block h-full">
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-56">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/15 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${s.accent}`} />
                  {s.bullets[0]}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-glow`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                      {s.title}
                    </h3>
                  </div>
                  <motion.span
                    whileHover={{ rotate: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink-700 group-hover:border-brand-blue-300 group-hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </div>
                <p className="text-ink-500">{s.summary}</p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-brand-blue-300/20 bg-brand-blue-500/15 px-3 py-1 text-xs font-medium text-brand-blue-200"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
