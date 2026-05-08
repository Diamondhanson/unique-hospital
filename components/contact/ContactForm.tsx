"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { AlertCircle, Check, Mail, MessageSquare, Phone, Send, User } from "lucide-react";

const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale();

  const schema = z.object({
    fullName: z.string().min(2, t("errorFullName")),
    email: z.string().email(t("errorEmail")),
    phone: z
      .string()
      .optional()
      .refine(
        (v) => !v || phoneRegex.test(v),
        t("errorPhone"),
      ),
    subject: z.string().min(2, t("errorSubject")),
    message: z.string().min(10, t("errorMessage")),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!res.ok) {
        let message = t("errorGeneric");
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) message = data.error;
        } catch {
          // response wasn't JSON — keep generic message
        }
        setServerError(message);
        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setServerError(t("errorNetwork"));
    }
  };

  if (submitted) {
    return (
      <motion.div
        role="status"
        aria-live="polite"
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
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-white"
        >
          {t("sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl soft-card p-6 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("fullName")}
          error={errors.fullName?.message}
          icon={<User className="h-4 w-4" />}
        >
          <input
            type="text"
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
            className="form-input"
            {...register("fullName")}
          />
        </Field>
        <Field
          label={t("email")}
          error={errors.email?.message}
          icon={<Mail className="h-4 w-4" />}
        >
          <input
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className="form-input"
            {...register("email")}
          />
        </Field>
        <Field
          label={t("phone")}
          error={errors.phone?.message}
          icon={<Phone className="h-4 w-4" />}
          hint={t("phoneOptional")}
        >
          <input
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className="form-input"
            {...register("phone")}
          />
        </Field>
        <Field
          label={t("subject")}
          error={errors.subject?.message}
          icon={<MessageSquare className="h-4 w-4" />}
        >
          <input
            type="text"
            placeholder={t("subjectPlaceholder")}
            className="form-input"
            {...register("subject")}
          />
        </Field>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="text-sm font-semibold text-ink-700">
              {t("message")}
            </span>
            <textarea
              rows={5}
              className="form-input mt-2 resize-none"
              placeholder={t("messagePlaceholder")}
              {...register("message")}
            />
            {errors.message?.message && (
              <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
            )}
          </label>
        </div>
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

      <div className="mt-8 flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
        >
          {isSubmitting ? t("sending") : t("send")}
          <Send className="h-4 w-4" />
        </button>
      </div>

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
        .form-input::placeholder { color: var(--color-ink-500); }
        .form-input:focus {
          border-color: var(--color-brand-blue-500);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-brand-blue-500) 25%, transparent);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  icon,
  hint,
  children,
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-semibold text-ink-700">
        {icon}
        {label}
        {hint && <span className="text-xs font-normal text-ink-500">· {hint}</span>}
      </span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </label>
  );
}
