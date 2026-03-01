<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { supportedLocales, LOCALE_STORAGE_KEY } from '@/i18n'

const { locale } = useI18n()

const localeLabels: Record<string, string> = {
  en: 'EN',
  ru: 'RU',
}

const localeFlags: Record<string, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
}

const availableLocales = computed(() =>
  supportedLocales.filter((l) => l !== locale.value)
)

function switchLocale(lang: string) {
  locale.value = lang
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang)
  } catch { /* ignore */ }
}
</script>

<template>
  <div class="lang-switcher">
    <button class="lang-switcher__btn" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span>{{ localeLabels[locale] ?? locale.toUpperCase() }}</span>
      <svg class="lang-switcher__chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    <div class="lang-switcher__dropdown">
      <button
        v-for="lang in availableLocales"
        :key="lang"
        type="button"
        class="lang-switcher__option"
        @click="switchLocale(lang)"
      >
        <span class="lang-switcher__flag">{{ localeFlags[lang] }}</span>
        <span>{{ localeLabels[lang] ?? lang.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-flex;
}

.lang-switcher__btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1.5px solid rgba(55, 65, 81, 0.25);
  border-radius: 8px;
  background: rgba(55, 65, 81, 0.06);
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.lang-switcher__btn:hover {
  background: rgba(55, 65, 81, 0.12);
  border-color: rgba(55, 65, 81, 0.40);
}

.lang-switcher__chevron {
  transition: transform 0.2s;
}

.lang-switcher:hover .lang-switcher__chevron {
  transform: rotate(180deg);
}

.lang-switcher__dropdown {
  position: absolute;
  bottom: calc(100% + 6px);
  right: 0;
  min-width: 90px;
  background: #fff;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 4px;
  display: none;
  flex-direction: column;
  gap: 2px;
  z-index: 100;
}

.lang-switcher:hover .lang-switcher__dropdown {
  display: flex;
}

.lang-switcher__option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: none;
  background: none;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background 0.12s;
  text-align: left;
  width: 100%;
}

.lang-switcher__option:hover {
  background: #F3F4F6;
}

.lang-switcher__flag {
  font-size: 16px;
  line-height: 1;
}
</style>
