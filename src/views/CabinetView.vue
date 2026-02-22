<script setup lang="ts">
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
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {{ t('cabinet.title') }}
    </h1>
    <p class="text-gray-600 dark:text-gray-300">
      {{ t('cabinet.welcome', { name: displayName }) }}
    </p>
  </div>
</template>
