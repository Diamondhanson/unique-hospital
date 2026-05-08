"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HOSPITAL, NAV_LINKS } from "@/lib/hospital";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type { Locale } from "@/i18n/routing";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-3xl px-4 py-3 transition-shadow duration-500 sm:px-6 ${
          scrolled ? "glass-nav shadow-soft" : "glass-nav"
        }`}
      >
        <Link href="/" aria-label={HOSPITAL.name} className="flex items-center">
          <Image
            src="/logo.png"
            alt={HOSPITAL.name}
            width={707}
            height={353}
            preload
            className="h-12 w-auto sm:h-[3.3rem]"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) =>
            link.href === "/services" ? (
              <ServicesNavItem key={link.href} label={tNav(link.key)} />
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {tNav(link.key)}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle />
          <ThemeToggle />
          <Link
            href="/appointment"
            className="brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
          >
            {tCta("book")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle compact />
          <button
            aria-label={tNav("toggleNavigation")}
            onClick={() => setOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-ink-700"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl glass-nav p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-ink-700 hover:bg-white/8 hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <ThemeToggle variant="menu" />
              </li>
              <li className="mt-2">
                <Link
                  href="/appointment"
                  onClick={() => setOpen(false)}
                  className="brand-gradient block rounded-2xl px-4 py-3 text-center text-base font-semibold text-white"
                >
                  {tCta("book")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ServicesNavItem({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <li
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <Link
        href="/services"
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/8 hover:text-white ${
          open ? "bg-white/8 text-white" : "text-ink-700"
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Link>
      <AnimatePresence>
        {open && <ServicesDropdown onItemClick={() => setOpen(false)} />}
      </AnimatePresence>
    </li>
  );
}

function LangToggle({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("lang");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      role="group"
      aria-label={t("toggle")}
      className={`relative flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 ${
        compact ? "" : ""
      }`}
    >
      <motion.span
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="brand-gradient absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full"
        style={{ left: locale === "en" ? 2 : "calc(50% + 0px)" }}
      />
      {(["en", "fr"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={active}
            className={`relative z-10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
              active ? "text-white" : "text-ink-500 hover:text-ink-700"
            }`}
          >
            {code === "en" ? "EN" : "FR"}
          </button>
        );
      })}
    </div>
  );
}
