<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
        </p>
        <RouterLink to="/privacy" class="hover:text-gray-700 dark:hover:text-gray-300">
          {{ t('privacy.title') }}
        </RouterLink>
      </div>
    </div>
  </footer>
</template>
