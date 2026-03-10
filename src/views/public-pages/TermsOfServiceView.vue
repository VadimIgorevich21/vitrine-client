<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <!-- Main Content -->
    <article class="default-container">
      <h1 class="page-title-h1 mb-10">{{ t('terms.title') }}</h1>

      <div class="space-y-12">
        <!-- Block 1 -->
          <h2 class="page-title-h2 mb-6">{{ t('terms.blockTitle') }}</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="page-title-h3 mb-3">{{ t('terms.subheading1') }}</h3>
              <p class="page-content-text">
                {{ t('terms.text1') }}
              </p>
            </div>

            <div>
              <h3 class="page-title-h3 mb-3">{{ t('terms.subheading2') }}</h3>
              <div class="space-y-4">
                <p class="page-content-text">
                  {{ t('terms.text2') }}
                </p>
                <p class="page-content-text">
                  {{ t('terms.text2') }}
                </p>
              </div>
            </div>
            
            <a href="#" class="page-orange-link font-14px transition-colors">{{ t('terms.link') }}</a>
          </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* Typography and spacing to match the design */
h1 {
  letter-spacing: -0.02em;
}

section {
  max-width: 800px;
}
</style>
