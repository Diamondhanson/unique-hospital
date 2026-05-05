import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock4,
  Sparkles,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { HOSPITAL, STATS, POSTS, PILLARS } from "@/lib/hospital";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BentoServices } from "@/components/sections/BentoServices";
import { BlogCard } from "@/components/blog/BlogCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PhilosophySection />
      <PillarsSection />
      <FamilySection />
      <BlogSection />
      <CtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden grid-noise">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 md:grid-cols-12 md:gap-12 md:pb-24 md:pt-16">
        <div className="md:col-span-7">
          <FadeUp>
            <span className="dark-glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-brand-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              {HOSPITAL.slogan} · Bonaberi-Douala
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
              Redefining{" "}
              <span className="brand-gradient-text">Healthcare Excellence</span>{" "}
              in Cameroon.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-500">
              {HOSPITAL.tagline}. We blend modern American healthcare insights
              with a deep love for the Cameroonian community — a new standard
              for medical delivery, where quality, innovation, and patient
              dignity come first.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/appointment"
                className="brand-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
          <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <StaggerItem
                key={s.label}
                className="rounded-3xl soft-card px-4 py-4"
              >
                <div className="font-display text-2xl font-semibold tracking-tight text-brand-blue-200">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-ink-500">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeUp delay={0.1} className="md:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] soft-card">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
                alt="Unique Hospital clinical team"
                fill
                preload
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="dark-glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="brand-gradient grid h-9 w-9 place-items-center rounded-xl text-white">
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      24/7 emergency care
                    </div>
                    <div className="text-xs text-ink-500">
                      {HOSPITAL.location.area}
                    </div>
                  </div>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-lime-600" />
              </div>
            </div>

            <div className="absolute -left-6 top-12 hidden rounded-2xl soft-card px-4 py-3 sm:flex sm:items-center sm:gap-3">
              <Clock4 className="h-5 w-5 text-brand-blue-300" />
              <div>
                <div className="text-sm font-semibold text-ink-900">
                  Avg wait
                </div>
                <div className="text-xs text-ink-500">under 12 minutes</div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-24 hidden rounded-2xl bg-paper border border-white/10 px-4 py-3 text-white sm:flex sm:items-center sm:gap-3">
              <Stethoscope className="h-5 w-5 text-brand-lime-500" />
              <div>
                <div className="text-sm font-semibold">US-standard care</div>
                <div className="text-xs text-white/70">guided protocols</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <FadeUp className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            What we do
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl">
            Care that meets you where you live —{" "}
            <span className="brand-gradient-text">in Bonaberi.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <Link
            href="/services"
            className="dark-glass inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
          >
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
      <BentoServices />
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-paper text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-12">
        <FadeUp className="md:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-500">
            Mission & philosophy
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Healthcare as a service of the heart.
          </h2>
        </FadeUp>
        <FadeUp delay={0.08} className="md:col-span-7">
          <p className="text-lg leading-8 text-white/80">
            We blend clinical excellence with profound compassion, ensuring
            that every patient&apos;s needs are the primary architect of their
            care. True healing happens when medicine meets humanity — our team
            operates as a single, synchronized force combining expertise,
            safety, and dedication to guide you on the swiftest path to
            recovery.
          </p>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                k: "Compassion",
                v: "Patient needs are the primary architect of their care.",
              },
              {
                k: "Synchronized",
                v: "One team, one force — expertise, safety, dedication.",
              },
              {
                k: "Swift recovery",
                v: "Medicine that meets humanity, guiding you home faster.",
              },
            ].map((p) => (
              <StaggerItem
                key={p.k}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="font-display text-lg font-semibold">{p.k}</div>
                <div className="mt-1 text-sm text-white/70">{p.v}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeUp>
      </div>
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-blue-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-[320px] w-[320px] rounded-full bg-brand-lime-500/20 blur-3xl" />
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            Why entrust your health to us
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl">
            Four reasons our patients keep{" "}
            <span className="brand-gradient-text">coming back.</span>
          </h2>
        </FadeUp>
      </div>
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <StaggerItem
            key={p.title}
            className="rounded-3xl soft-card p-6"
          >
            <span className="brand-gradient grid h-10 w-10 place-items-center rounded-2xl text-sm font-display font-semibold text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-ink-500">{p.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function FamilySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <FadeUp>
        <div className="grid gap-10 rounded-[2.5rem] soft-card overflow-hidden md:grid-cols-12">
          <div className="md:col-span-7 p-8 md:p-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-300">
              More than a patient
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
              You&apos;re family.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              Our customer-service model — brought from the U.S. by our
              founder — runs through every shift: 24/7 care, friendly nursing
              staff, and a clean, respectful environment that treats every
              patient with the dignity they deserve.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "24/7 emergency care",
                "Friendly, attentive nursing staff",
                "Clean & respectful environment",
                "Transparent communication",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-2 text-sm text-ink-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-lime-500" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5 relative min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80"
              alt="Unique Hospital nursing team"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-900/40 via-transparent to-brand-lime-500/10" />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between gap-6">
        <FadeUp className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
            From the blog
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl">
            Health tips & hospital updates
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <Link
            href="/blog"
            className="dark-glass inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {POSTS.map((p, i) => (
          <BlogCard key={p.slug} post={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <FadeUp>
        <div className="brand-gradient relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-white md:px-16 md:py-20">
          <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Need care today? We&apos;re open 24/7.
              </h3>
              <p className="mt-3 text-white/85">
                Walk in at {HOSPITAL.location.landmark} — or reserve your slot
                online and skip the queue.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand-blue-700 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
              >
                Book online <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${HOSPITAL.phones[1].replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {HOSPITAL.phones[1]}
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-24 -right-12 h-[300px] w-[300px] rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -left-12 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />
        </div>
      </FadeUp>
    </section>
  );
}
