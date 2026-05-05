import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Heart, Globe2, Sparkles, Quote } from "lucide-react";
import { HOSPITAL } from "@/lib/hospital";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Established August 8, 2022 by Franklin Kehbuma (RN, BSN), Unique Hospital brings US-trained healthcare standards to Bonaberi-Douala, Cameroon.",
};

export default function AboutPage() {
  const founded = new Date(HOSPITAL.founded).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <section className="grid-noise px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <span className="dark-glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-brand-blue-200">
              <Sparkles className="h-3.5 w-3.5" /> Our story
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
              A neighborhood hospital with{" "}
              <span className="brand-gradient-text">global standards.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-500">
              {HOSPITAL.tagline}.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-12 md:gap-12 md:py-20">
        <FadeUp className="md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] soft-card">
            <Image
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80"
              alt="Unique Hospital lobby"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </FadeUp>
        <div className="md:col-span-6">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-200">
              History
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
              Established {founded}.
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              Unique Hospital is the realization of a vision by{" "}
              <span className="font-semibold">
                Mr. {HOSPITAL.founder} ({HOSPITAL.founderCredentials})
              </span>
              . {HOSPITAL.founderBio}
            </p>
            <p className="mt-4 text-lg leading-8 text-ink-500">
              Unique Hospital isn&apos;t just a medical facility; it is a
              promise of hope. By integrating modern American healthcare
              insights with a deep love for the Cameroonian community, we are
              setting a new standard for medical delivery — one where quality,
              innovation, and patient dignity come first.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <FadeUp>
          <div className="rounded-[2.5rem] soft-card p-8 md:p-12">
            <Quote className="h-8 w-8 text-brand-lime-500" />
            <p className="mt-4 font-display text-2xl leading-relaxed tracking-tight text-ink-900 md:text-3xl">
              &ldquo;Our mission is to transform healthcare into a service of
              the heart. We believe that true healing happens when medicine
              meets humanity.&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue-200">
              — Mission of Unique Hospital
            </p>
          </div>
        </FadeUp>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Heart,
              title: "Compassion-first",
              body: "Every patient's needs are the primary architect of their care.",
            },
            {
              icon: Globe2,
              title: "International standards",
              body: "Care guided by US-trained insights and modern protocols.",
            },
            {
              icon: GraduationCap,
              title: "Paramedical Institute",
              body: "Training the next generation of caregivers, on-site.",
            },
            {
              icon: Sparkles,
              title: "Always open",
              body: "24/7 care in the heart of the Bonasama Health District.",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title} className="rounded-3xl soft-card p-5">
                <span className="brand-gradient grid h-10 w-10 place-items-center rounded-2xl text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-3 font-display text-lg font-semibold text-ink-900">
                  {p.title}
                </div>
                <div className="mt-1 text-sm text-ink-500">{p.body}</div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="bg-paper text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:py-24">
          <FadeUp className="md:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime-500">
              Paramedical Institute
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Shaping the future of healthcare.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              At our Paramedical Institute, we don&apos;t just treat patients;
              we train the next generation of healthcare heroes. Our students
              benefit from hands-on clinical experience right here within the
              Unique Hospital ecosystem.
            </p>
          </FadeUp>
          <FadeUp delay={0.08} className="md:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1400&q=80"
                alt="Paramedical Institute students in training"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-900/40 via-transparent to-brand-lime-500/10" />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
