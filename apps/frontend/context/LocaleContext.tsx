"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import i18n from "@/locales/i18n";

type Locale = "en" | "ru" | "no";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (lng: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const LOCALE_STORAGE_KEY = "locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // инициализация из localStorage / i18n
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    const initial = stored || (i18n.language as Locale) || "en";

    setLocaleState(initial);
    i18n.changeLanguage(initial);
  }, []);

  const setLocale = (lng: Locale) => {
    setLocaleState(lng);
    i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, lng);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
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
