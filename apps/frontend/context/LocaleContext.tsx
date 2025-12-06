"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/locales/i18n";
import { getTranslations, type AppTranslations } from "@/locales/i18n";

type LocaleContextType = {
  locale: Locale;
  t: AppTranslations;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved) setLocaleState(saved);
  }, []);

  const setLocale = (loc: Locale) => {
    localStorage.setItem("locale", loc);
    setLocaleState(loc);
  };

  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
