import en from "./en";
import ru from "./ru";
import no from "./no";

export const DEFAULT_LOCALE = "en" as const;

export const supportedLocales = ["en", "ru", "no"] as const;
export type Locale = (typeof supportedLocales)[number];

export type AppTranslations = ReturnType<typeof getTranslations>;

/**
 * Возвращает словарь для указанного языка
 */
export function getTranslations(locale: Locale) {
  switch (locale) {
    case "ru":
      return ru;
    case "no":
      return no;
    case "en":
    default:
      return en;
  }
}
