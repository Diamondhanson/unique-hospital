"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
} from "lucide-react";
import { SERVICES } from "@/lib/hospital";

const ICONS = {
  Baby,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicesDropdown({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25, ease }}
      className="absolute left-1/2 top-full z-40 w-[min(640px,90vw)] -translate-x-1/2 pt-3"
      role="menu"
    >
      <div className="glass-nav rounded-3xl p-3 shadow-soft">
        <div className="flex items-center justify-between px-3 pb-3 pt-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue-200">
              Our domains of care
            </div>
            <div className="mt-0.5 text-sm text-ink-500">
              Four service families, one standard.
            </div>
          </div>
          <Link
            href="/services"
            onClick={onItemClick}
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:text-white sm:inline-flex"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={onItemClick}
                role="menuitem"
                className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-white/5"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-glow`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 font-display text-sm font-semibold tracking-tight text-ink-900 group-hover:text-white">
                    {s.title}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-500">
                    {s.bullets.join(" · ")}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
