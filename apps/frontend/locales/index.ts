import en from "./en/index";
import ru from "./ru/index";
import no from "./no/index";

export type Locale = "en" | "ru" | "no";
export type AppTranslations = typeof en;

export const DEFAULT_LOCALE: Locale = "en";

const translations: Record<Locale, AppTranslations> = {
  en,
  ru,
  no,
};

export function getTranslations(
  locale: Locale = DEFAULT_LOCALE,
): AppTranslations {
  return translations[locale] ?? translations[DEFAULT_LOCALE];
}
