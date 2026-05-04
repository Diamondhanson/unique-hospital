"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
} from "lucide-react";
import { SERVICES } from "@/lib/hospital";

const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  service: z.enum(SERVICES.map((s) => s.slug) as [string, ...string[]], {
    message: "Choose a service",
  }),
  date: z
    .string()
    .min(1, "Pick a date")
    .refine((d) => !Number.isNaN(Date.parse(d)), "Invalid date"),
  time: z.string().min(1, "Pick a time"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  { id: "who", label: "About you", icon: User, fields: ["fullName"] as const },
  {
    id: "what",
    label: "Service",
    icon: Stethoscope,
    fields: ["service"] as const,
  },
  {
    id: "when",
    label: "Date & time",
    icon: CalendarDays,
    fields: ["date", "time"] as const,
  },
  {
    id: "contact",
    label: "Contact",
    icon: Phone,
    fields: ["phone", "email"] as const,
  },
];

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      service: undefined,
      date: "",
      time: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const next = async () => {
    const ok = await trigger(STEPS[step].fields as unknown as (keyof FormValues)[]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="rounded-3xl soft-card p-8 text-center md:p-12"
      >
        <span className="brand-gradient mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
          Appointment received.
        </h3>
        <p className="mt-2 text-ink-500">
          Our team will confirm by phone within the hour. For urgent care, call
          us 24/7.
        </p>
      </motion.div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl soft-card p-6 md:p-10"
    >
      <Stepper current={step} />

      <div className="mt-8 min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={STEPS[step].id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-5"
          >
            {step === 0 && (
              <Field
                label="Full name"
                error={errors.fullName?.message}
                icon={<User className="h-4 w-4" />}
              >
                <input
                  type="text"
                  placeholder="e.g. Marie Ngono"
                  className="form-input"
                  {...register("fullName")}
                />
              </Field>
            )}

            {step === 1 && (
              <Controller
                control={control}
                name="service"
                render={({ field }) => (
                  <fieldset>
                    <legend className="text-sm font-semibold text-ink-700">
                      Choose a service
                    </legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((s) => {
                        const active = field.value === s.slug;
                        return (
                          <button
                            type="button"
                            key={s.slug}
                            onClick={() => field.onChange(s.slug)}
                            className={`text-left rounded-2xl border p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              active
                                ? "border-brand-blue-500 bg-brand-blue-500/15 ring-2 ring-brand-blue-500/30"
                                : "border-white/10 bg-white/5 hover:border-brand-blue-300/60"
                            }`}
                          >
                            <div className="font-display text-base font-semibold text-ink-900">
                              {s.title}
                            </div>
                            <div className="mt-1 text-sm text-ink-500">
                              {s.summary}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.service?.message && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.service.message}
                      </p>
                    )}
                  </fieldset>
                )}
              />
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Preferred date"
                  error={errors.date?.message}
                  icon={<CalendarDays className="h-4 w-4" />}
                >
                  <input
                    type="date"
                    min={today}
                    className="form-input"
                    {...register("date")}
                  />
                </Field>
                <Controller
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <fieldset>
                      <legend className="text-sm font-semibold text-ink-700">
                        Preferred time
                      </legend>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((t) => {
                          const active = field.value === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => field.onChange(t)}
                              className={`rounded-xl border px-2 py-2 text-sm font-semibold transition-colors ${
                                active
                                  ? "border-brand-blue-500 bg-brand-blue-500/15 text-brand-blue-200"
                                  : "border-white/10 bg-white/5 text-ink-700 hover:border-brand-blue-300/60"
                              }`}
                            >
                              <Clock className="mr-1 inline h-3.5 w-3.5" />
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      {errors.time?.message && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.time.message}
                        </p>
                      )}
                    </fieldset>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Phone"
                  error={errors.phone?.message}
                  icon={<Phone className="h-4 w-4" />}
                >
                  <input
                    type="tel"
                    placeholder="+237 6xx xxx xxx"
                    className="form-input"
                    {...register("phone")}
                  />
                </Field>
                <Field
                  label="Email"
                  error={errors.email?.message}
                  icon={<Mail className="h-4 w-4" />}
                >
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="form-input"
                    {...register("email")}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-ink-700">
                    Notes for the clinical team (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="form-input mt-2 resize-none"
                    placeholder="Any symptoms, history, or preferences"
                    {...register("notes")}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="dark-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
          >
            {isSubmitting ? "Submitting…" : "Confirm appointment"}
            <Check className="h-4 w-4" />
          </button>
        )}
      </div>

      <SummaryHints values={watch()} />

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid color-mix(in oklab, white 12%, transparent);
          background: color-mix(in oklab, white 4%, transparent);
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: var(--color-ink-900);
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input::placeholder {
          color: var(--color-ink-500);
        }
        .form-input:focus {
          border-color: var(--color-brand-blue-500);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-brand-blue-500) 25%, transparent);
        }
        .form-input::-webkit-calendar-picker-indicator {
          filter: invert(0.8);
          opacity: 0.7;
        }
      `}</style>
    </form>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-colors duration-500 ${
                done
                  ? "bg-brand-lime-500 text-white"
                  : active
                    ? "brand-gradient text-white shadow-glow"
                    : "bg-white/8 text-brand-blue-200"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </span>
            <span
              className={`hidden text-sm font-semibold sm:inline ${
                active ? "text-ink-900" : "text-ink-500"
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="hidden h-px w-8 bg-ink-300/60 sm:inline-block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  error,
  icon,
  children,
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-semibold text-ink-700">
        {icon}
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </label>
  );
}

function SummaryHints({ values }: { values: Partial<FormValues> }) {
  if (!values.service && !values.date) return null;
  const svc = SERVICES.find((s) => s.slug === values.service);
  return (
    <p className="mt-6 text-xs text-ink-500">
      {svc ? `Service: ${svc.title}` : ""}
      {svc && values.date ? " · " : ""}
      {values.date ? `Date: ${values.date}` : ""}
      {values.time ? ` at ${values.time}` : ""}
    </p>
  );
}
