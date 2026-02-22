<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const lastUpdated = '2025-02-20'
</script>

<template>
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      {{ t('privacy.title') }}
    </h1>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
      {{ t('privacy.lastUpdated', { date: lastUpdated }) }}
    </p>

    <p class="text-gray-600 dark:text-gray-300 mb-8">
      {{ t('privacy.intro') }}
    </p>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {{ t('privacy.section1Title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('privacy.section1Text') }}
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {{ t('privacy.section2Title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('privacy.section2Text') }}
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {{ t('privacy.section3Title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('privacy.section3Text') }}
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {{ t('privacy.section4Title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('privacy.section4Text') }}
      </p>
    </section>

    <p class="text-gray-600 dark:text-gray-300 mb-8">
      {{ t('privacy.contact') }}
    </p>

    <RouterLink
      to="/"
      class="inline-block text-blue-600 dark:text-blue-400 hover:underline"
    >
      {{ t('common.backToHome') }}
    </RouterLink>
  </article>
</template>
