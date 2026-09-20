import type { Dictionary, Locale } from "./types";
import en from "./en";
import ar from "./ar";

export type { Dictionary, Locale } from "./types";
export {
  locales,
  defaultLocale,
  localePath,
  switchLocalePath,
  getLocaleFromPath,
} from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale = "en"): Dictionary {
  return dictionaries[locale] ?? en;
}
