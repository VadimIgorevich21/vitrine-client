<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {{ t('orders.title') }}
    </h1>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {{ t('orders.inDevelopment') }}
    </p>
    <RouterLink
      to="/cabinet"
      class="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {{ t('orders.backToCabinet') }}
    </RouterLink>
  </div>
</template>
