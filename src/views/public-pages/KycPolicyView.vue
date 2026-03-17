<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const lastUpdated = '2025-02-20'
</script>

<template>
  <div class="public-layout-content">
    <!-- Main Content -->
    <article class="default-container">
      <h1 class="page-title-h1 mb-3">{{ t('privacy.title') }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {{ t('privacy.lastUpdated', { date: lastUpdated }) }}
      </p>

      <div class="space-y-6">
        <p class="page-content-text">
          {{ t('privacy.intro') }}
        </p>
        <!-- Block 1 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section1Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section1Text') }}
          </p>
        </div>
        <!-- Block 2 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section2Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section2Text') }}
          </p>
        </div>
        <!-- Block 3 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section3Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section3Text') }}
          </p>
        </div>
        <!-- Block 4 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section4Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section4Text') }}
          </p>
        </div>

        <p class="page-content-text mb-8">
          {{ t('privacy.contact') }}
        </p>

        <RouterLink
          to="/"
          class="inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          {{ t('common.backToHome') }}
        </RouterLink>
      </div>
    </article>
  </div>
</template>
