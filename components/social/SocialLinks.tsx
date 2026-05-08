import { Mail } from "lucide-react";
import { HOSPITAL } from "@/lib/hospital";

type Size = "sm" | "md";

const sizing: Record<Size, { wrap: string; icon: string }> = {
  sm: { wrap: "h-9 w-9", icon: "h-4 w-4" },
  md: { wrap: "h-10 w-10", icon: "h-[18px] w-[18px]" },
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.05 4.91A10 10 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.92 9.92 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02ZM12.04 20.15h-.01a8.21 8.21 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.27-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function SocialLinks({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  const { wrap, icon } = sizing[size];
  const base = `grid ${wrap} place-items-center rounded-full border border-white/10 bg-white/5 text-ink-700 transition-colors hover:text-white`;
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      <li>
        <a
          href={HOSPITAL.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={`${base} hover:border-brand-blue-300 hover:bg-brand-blue-500/15 hover:text-brand-blue-200`}
        >
          <FacebookIcon className={icon} />
        </a>
      </li>
      <li>
        <a
          href={HOSPITAL.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className={`${base} hover:border-brand-lime-500 hover:bg-brand-lime-500/15 hover:text-brand-lime-500`}
        >
          <WhatsAppIcon className={icon} />
        </a>
      </li>
      <li>
        <a
          href={`mailto:${HOSPITAL.email}`}
          aria-label="Email"
          className={`${base} hover:border-brand-blue-300 hover:bg-brand-blue-500/15 hover:text-brand-blue-200`}
        >
          <Mail className={icon} />
        </a>
      </li>
    </ul>
  );
}
