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
  <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        <RouterLink to="/" class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ t('header.site') }}
        </RouterLink>
        <nav class="flex items-center gap-4">
          <template v-if="authStore.loggedIn">
            <span class="text-sm text-gray-600 dark:text-gray-300">
              {{ displayName }}
            </span>
            <RouterLink
              to="/cabinet"
              class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ t('header.cabinet') }}
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              to="/auth"
              class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ t('header.login') }}
            </RouterLink>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>
