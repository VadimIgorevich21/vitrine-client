<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const { t } = useI18n()
const authStore = useAuthStore()

const displayName = computed(() => {
  const u = authStore.user
  if (!u) return ''
  return (u.name as string) || (u.email as string) || t('header.userDefault')
})
</script>

<template>
  <header class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        <RouterLink
          to="/cabinet"
          class="text-lg font-semibold text-gray-900 dark:text-white"
        >
          {{ t('header.cabinet') }}
        </RouterLink>
        <nav class="flex items-center gap-4">
          <span class="text-sm text-gray-600 dark:text-gray-300">
            {{ displayName }}
          </span>
          <RouterLink
            to="/"
            class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {{ t('common.backToHome') }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>
