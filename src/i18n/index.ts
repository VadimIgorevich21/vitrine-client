import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import pl from '@/locales/pl'

export const LOCALE_STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = 'en'

export const locales = {
  en: {
    label: 'English',
    short: 'EN',
    flag: '/img/flags/GB.svg',
    messages: en,
  },
  pl: {
    label: 'Polski',
    short: 'PL',
    flag: '/img/flags/PL.svg',
    messages: pl,
  },
} as const

export type LocaleKey = keyof typeof locales
export const supportedLocales = Object.keys(locales) as LocaleKey[]

const savedLocale = (): LocaleKey => {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && supportedLocales.includes(stored as LocaleKey)) {
      return stored as LocaleKey
    }
  } catch { }
  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: Object.fromEntries(
    Object.entries(locales).map(([key, value]) => [
      key,
      value.messages,
    ])
  ),
})