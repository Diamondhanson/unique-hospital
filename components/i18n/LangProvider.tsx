"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "fr";

const DICT: Record<string, { en: string; fr: string }> = {
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.about": { en: "About", fr: "À propos" },
  "nav.services": { en: "Services", fr: "Services" },
  "nav.blog": { en: "Blog", fr: "Blog" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "cta.book": { en: "Book appointment", fr: "Prendre rendez-vous" },
  "cta.book_short": { en: "Book", fr: "Réserver" },
  "lang.toggle": { en: "Toggle language", fr: "Changer de langue" },
  "footer.find_us": { en: "Find us", fr: "Nous trouver" },
  "footer.explore": { en: "Explore", fr: "Explorer" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT | string) => string;
};

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => String(k),
});

const STORAGE_KEY = "uh-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key) => DICT[key as string]?.[lang] ?? String(key),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
