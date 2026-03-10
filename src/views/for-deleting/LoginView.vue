<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="max-w-md mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {{ t('login.title') }}
    </h1>
    <p class="text-gray-600 dark:text-gray-300 mb-6">
      {{ t('login.formPlaceholder') }}
    </p>
    <RouterLink
      to="/"
      class="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {{ t('common.backToHome') }}
    </RouterLink>
  </div>
</template>
