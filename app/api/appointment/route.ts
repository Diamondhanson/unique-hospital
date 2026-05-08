import { Resend } from "resend";
import { z } from "zod";

const phoneRegex = /^\+?[0-9\s().\-]{7,20}$/;

const SERVICE_LABELS: Record<string, { en: string; fr: string }> = {
  "specialized-care": {
    en: "Specialized care",
    fr: "Soins spécialisés",
  },
  "surgical-expertise": {
    en: "Surgical expertise",
    fr: "Expertise chirurgicale",
  },
  "diagnostic-support": {
    en: "Diagnostic support",
    fr: "Support diagnostique",
  },
  "community-health": {
    en: "Community health",
    fr: "Santé communautaire",
  },
};

const AppointmentSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  service: z.enum([
    "specialized-care",
    "surgical-expertise",
    "diagnostic-support",
    "community-health",
  ]),
  date: z.string().trim().min(1).refine((d) => !Number.isNaN(Date.parse(d))),
  time: z.string().trim().min(1).max(10),
  phone: z.string().trim().regex(phoneRegex).max(40),
  email: z.string().trim().email().max(200),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  locale: z.enum(["en", "fr"]).optional(),
});

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !inbox || !from) {
    return Response.json(
      {
        error:
          "Email is not configured. Please set RESEND_API_KEY, CONTACT_INBOX_EMAIL and RESEND_FROM_EMAIL.",
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = AppointmentSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Some fields are missing or invalid.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { fullName, service, date, time, phone, email, notes, locale } = parsed.data;
  const serviceLabel = SERVICE_LABELS[service]?.[locale ?? "en"] ?? service;
  const formattedDate = formatDate(date, locale ?? "en");

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [inbox],
      replyTo: email,
      subject: `New appointment — ${fullName} · ${serviceLabel}`,
      html: renderEmail({
        fullName,
        serviceLabel,
        date: formattedDate,
        time,
        phone,
        email,
        notes: notes || undefined,
        locale,
      }),
      text: renderEmailText({
        fullName,
        serviceLabel,
        date: formattedDate,
        time,
        phone,
        email,
        notes: notes || undefined,
        locale,
      }),
    });

    if (error) {
      return Response.json(
        { error: error.message ?? "Failed to send email." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: `Failed to send email: ${message}` }, { status: 502 });
  }
}

function formatDate(iso: string, locale: "en" | "fr") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

type EmailFields = {
  fullName: string;
  serviceLabel: string;
  date: string;
  time: string;
  phone: string;
  email: string;
  notes?: string;
  locale?: "en" | "fr";
};

function renderEmail({
  fullName,
  serviceLabel,
  date,
  time,
  phone,
  email,
  notes,
  locale,
}: EmailFields) {
  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const notesHtml = notes ? escape(notes).replace(/\n/g, "<br>") : "";

  return `<!doctype html>
<html lang="${locale === "fr" ? "fr" : "en"}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>New appointment request</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:linear-gradient(120deg,#0070d2 0%,#1aa0c9 55%,#7bc043 100%);padding:28px 32px;color:#ffffff;">
                <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Unique Hospital</div>
                <div style="font-size:22px;font-weight:600;margin-top:6px;line-height:1.3;">New appointment request</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Patient", escape(fullName))}
                  ${row("Service", escape(serviceLabel))}
                  ${row("Date", escape(date))}
                  ${row("Time", escape(time))}
                  ${row("Phone", `<a href="tel:${escape(phone)}" style="color:#0070d2;text-decoration:none;">${escape(phone)}</a>`)}
                  ${row("Email", `<a href="mailto:${escape(email)}" style="color:#0070d2;text-decoration:none;">${escape(email)}</a>`)}
                  ${locale ? row("Language", locale === "fr" ? "Français" : "English") : ""}
                </table>
              </td>
            </tr>
            ${
              notes
                ? `<tr>
              <td style="padding:8px 32px 24px 32px;">
                <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;font-weight:600;margin-bottom:8px;">Notes</div>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;font-size:15px;line-height:1.55;color:#0f172a;">${notesHtml}</div>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:0 32px 28px 32px;">
                <a href="tel:${escape(phone)}" style="display:inline-block;background:linear-gradient(120deg,#0070d2 0%,#1aa0c9 55%,#7bc043 100%);color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px;margin-right:8px;">Call ${escape(fullName.split(" ")[0])}</a>
                <a href="mailto:${escape(email)}?subject=${encodeURIComponent("Re: appointment request")}" style="display:inline-block;border:1px solid #cbd5e1;color:#0f172a;text-decoration:none;font-weight:600;font-size:14px;padding:11px 20px;border-radius:999px;">Email</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
                Sent from the appointment form on uniquehospital.com — reply directly to confirm with the patient.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
      <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;font-weight:600;">${label}</div>
      <div style="font-size:15px;color:#0f172a;margin-top:2px;">${value}</div>
    </td>
  </tr>`;
}

function renderEmailText({
  fullName,
  serviceLabel,
  date,
  time,
  phone,
  email,
  notes,
  locale,
}: EmailFields) {
  return [
    "New appointment request — Unique Hospital",
    "",
    `Patient: ${fullName}`,
    `Service: ${serviceLabel}`,
    `Date:    ${date}`,
    `Time:    ${time}`,
    `Phone:   ${phone}`,
    `Email:   ${email}`,
    locale ? `Lang:    ${locale}` : null,
    notes ? "" : null,
    notes ? "Notes:" : null,
    notes ?? null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
