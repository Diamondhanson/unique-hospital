"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
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
import { SERVICE_DEFS } from "@/lib/hospital";

const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

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

const STEP_DEFS = [
  { id: "who", icon: User, fields: ["fullName"] as const },
  { id: "what", icon: Stethoscope, fields: ["service"] as const },
  { id: "when", icon: CalendarDays, fields: ["date", "time"] as const },
  { id: "contact", icon: Phone, fields: ["phone", "email"] as const },
];

export function BookingForm() {
  const t = useTranslations("booking");
  const tCta = useTranslations("cta");
  const tServices = useTranslations("services");
  const locale = useLocale();

  const schema = z.object({
    fullName: z.string().min(2, t("errorFullName")),
    service: z.enum(SERVICE_DEFS.map((s) => s.slug) as [string, ...string[]], {
      message: t("errorService"),
    }),
    date: z
      .string()
      .min(1, t("errorDate"))
      .refine((d) => !Number.isNaN(Date.parse(d)), t("errorDateInvalid")),
    time: z.string().min(1, t("errorTime")),
    phone: z.string().regex(phoneRegex, t("errorPhone")),
    email: z.string().email(t("errorEmail")),
    notes: z.string().max(500).optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const STEPS = [
    { ...STEP_DEFS[0], label: t("stepWho") },
    { ...STEP_DEFS[1], label: t("stepWhat") },
    { ...STEP_DEFS[2], label: t("stepWhen") },
    { ...STEP_DEFS[3], label: t("stepContact") },
  ];

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
    const ok = await trigger(
      STEPS[step].fields as unknown as (keyof FormValues)[],
    );
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!res.ok) {
        let msg = t("errorGeneric");
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) msg = data.error;
        } catch {
          // response wasn't JSON — keep generic message
        }
        setServerError(msg);
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError(t("errorNetwork"));
    }
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
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-ink-500">{t("successBody")}</p>
      </motion.div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl soft-card p-6 md:p-10"
    >
      <Stepper current={step} steps={STEPS} />

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
                label={t("fullName")}
                error={errors.fullName?.message}
                icon={<User className="h-4 w-4" />}
              >
                <input
                  type="text"
                  placeholder={t("fullNamePlaceholder")}
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
                      {t("chooseService")}
                    </legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {SERVICE_DEFS.map((s) => {
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
                              {tServices(`${s.slug}.title`)}
                            </div>
                            <div className="mt-1 text-sm text-ink-500">
                              {tServices(`${s.slug}.summary`)}
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
                  label={t("preferredDate")}
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
                        {t("preferredTime")}
                      </legend>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const active = field.value === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => field.onChange(slot)}
                              className={`rounded-xl border px-2 py-2 text-sm font-semibold transition-colors ${
                                active
                                  ? "border-brand-blue-500 bg-brand-blue-500/15 text-brand-blue-200"
                                  : "border-white/10 bg-white/5 text-ink-700 hover:border-brand-blue-300/60"
                              }`}
                            >
                              <Clock className="mr-1 inline h-3.5 w-3.5" />
                              {slot}
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
                  label={t("phone")}
                  error={errors.phone?.message}
                  icon={<Phone className="h-4 w-4" />}
                >
                  <input
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    className="form-input"
                    {...register("phone")}
                  />
                </Field>
                <Field
                  label={t("emailLabel")}
                  error={errors.email?.message}
                  icon={<Mail className="h-4 w-4" />}
                >
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="form-input"
                    {...register("email")}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-ink-700">
                    {t("notes")}
                  </label>
                  <textarea
                    rows={3}
                    className="form-input mt-2 resize-none"
                    placeholder={t("notesPlaceholder")}
                    {...register("notes")}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {serverError && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <div className="font-semibold">{t("errorTitle")}</div>
            <div className="mt-0.5 text-red-600/90">{serverError}</div>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="dark-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> {tCta("back")}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            {tCta("continue")} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
          >
            {isSubmitting ? tCta("submitting") : tCta("confirmAppointment")}
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

function Stepper({
  current,
  steps,
}: {
  current: number;
  steps: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => {
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
              {done ? (
                <Check className="h-4 w-4" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
            </span>
            <span
              className={`hidden text-sm font-semibold sm:inline ${
                active ? "text-ink-900" : "text-ink-500"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
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

function SummaryHints({ values }: { values: Record<string, unknown> }) {
  const t = useTranslations("booking");
  const tServices = useTranslations("services");
  const service = typeof values.service === "string" ? values.service : "";
  const date = typeof values.date === "string" ? values.date : "";
  const time = typeof values.time === "string" ? values.time : "";

  if (!service && !date) return null;
  const svc = SERVICE_DEFS.find((s) => s.slug === service);

  return (
    <p className="mt-6 text-xs text-ink-500">
      {svc ? t("summaryService", { title: tServices(`${svc.slug}.title`) }) : ""}
      {svc && date ? " · " : ""}
      {date ? t("summaryDate", { date }) : ""}
      {time ? t("summaryAt", { time }) : ""}
    </p>
  );
}
