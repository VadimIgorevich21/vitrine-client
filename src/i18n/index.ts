import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import ru from '@/locales/ru'

const LOCALE_STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = 'en'

const messages = {
  en,
  ru,
}

const supportedLocales = Object.keys(messages) as string[]

const savedLocale = (): string => {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && supportedLocales.includes(stored)) return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export { LOCALE_STORAGE_KEY, supportedLocales }
