import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock4 } from "lucide-react";
import { HOSPITAL } from "@/lib/hospital";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit us in Bonaberi-Douala or call (+237) 652 775 214. Open 24/7.",
};

export default function ContactPage() {
  return (
    <>
      <section className="grid-noise px-6 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
              Visit, call, or write —{" "}
              <span className="brand-gradient-text">we&apos;re always open.</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <Stagger className="grid gap-5 md:grid-cols-3">
          <StaggerItem className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              Find us
            </h3>
            <p className="mt-2 text-ink-500">
              {HOSPITAL.location.area}
              <br />
              {HOSPITAL.location.landmark}
              <br />
              {HOSPITAL.location.neighborhood}
              <br />
              <span className="text-ink-700">
                {HOSPITAL.location.district}
              </span>
            </p>
          </StaggerItem>
          <StaggerItem className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <Phone className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              Call 24/7
            </h3>
            <ul className="mt-2 space-y-1">
              {HOSPITAL.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="font-semibold text-brand-blue-200 hover:underline"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="rounded-3xl soft-card p-6">
            <span className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <Mail className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              Email
            </h3>
            <p className="mt-2">
              <a
                href={`mailto:${HOSPITAL.email}`}
                className="font-semibold text-brand-blue-200 hover:underline"
              >
                {HOSPITAL.email}
              </a>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-500">
              <Clock4 className="h-4 w-4" /> Reply within 24h
            </p>
          </StaggerItem>
        </Stagger>

        <FadeUp className="mt-10">
          <div className="overflow-hidden rounded-[2rem] soft-card">
            <iframe
              title="Unique Hospital location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=9.66%2C4.06%2C9.72%2C4.10&layer=mapnik&marker=4.082%2C9.692"
              loading="lazy"
              className="h-[420px] w-full border-0"
            />
          </div>
        </FadeUp>
      </section>
    </>
  );
}
