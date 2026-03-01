<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  locales,
  supportedLocales,
  LOCALE_STORAGE_KEY,
  type LocaleKey,
} from '@/i18n'

const { locale } = useI18n()

const isOpen = ref(false)
const dropUp = ref(false)
const langSwitcherRef = ref<HTMLElement | null>(null)

const availableLocales = computed(() =>
  supportedLocales.filter((l) => l !== locale.value)
)

function toggleDropdown() {
  if (!isOpen.value) {
    const rect = langSwitcherRef.value?.getBoundingClientRect()
    if (rect) {
      const windowHeight = window.innerHeight
      const spaceBelow = windowHeight - rect.bottom
      const menuHeight = 80
      dropUp.value = spaceBelow < menuHeight
    }
  }
  isOpen.value = !isOpen.value
}

function switchLocale(lang: LocaleKey) {
  locale.value = lang
  isOpen.value = false

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lang)
  } catch {}
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    langSwitcherRef.value &&
    !langSwitcherRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() =>
  window.addEventListener('click', handleClickOutside)
)

onUnmounted(() =>
  window.removeEventListener('click', handleClickOutside)
)
</script>

<template>
  <div class="lang-switcher" ref="langSwitcherRef">
    <!-- Кнопка -->
    <button
      class="lang-switcher__btn"
      type="button"
      @click="toggleDropdown"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path
          d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        />
      </svg>

      <span class="lang-switcher__short">
        {{ locales[locale as LocaleKey].short }}
      </span>
    </button>

    <!-- Dropdown -->
    <Transition name="fade-slide">
      <div
        v-if="isOpen"
        class="lang-switcher__dropdown"
        :class="{ 'is-drop-up': dropUp }"
      >
        <button
          v-for="lang in availableLocales"
          :key="lang"
          type="button"
          class="lang-switcher__option"
          @click="switchLocale(lang)"
        >
          <span class="lang-switcher__item">
            {{ locales[lang].flag }}
            {{ locales[lang].short }}
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-flex;
}

/* Кнопка */
.lang-switcher__btn {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 4px;
  border: none;
  background: transparent;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.lang-switcher__btn:hover {
  opacity: 0.7;
}

.lang-switcher__short {
  min-width: 20px;
  text-align: right;
}

/* Dropdown */
.lang-switcher__dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-width: 60px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  padding: 4px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.lang-switcher__dropdown:not(.is-drop-up) {
  top: 100%;
  margin-top: 4px;
}

.lang-switcher__dropdown.is-drop-up {
  bottom: 100%;
  margin-bottom: 4px;
}

/* Опция */
.lang-switcher__option {
  width: 100%;
  padding: 4px 6px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s ease;
  font-size: 13px;
  color: #374151;
}

.lang-switcher__option:hover {
  background: #f3f4f6;
}

.lang-switcher__item {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* Анимация */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.is-drop-up.fade-slide-enter-from,
.is-drop-up.fade-slide-leave-to {
  transform: translateY(-4px);
}
</style>