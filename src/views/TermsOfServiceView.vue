<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Main Content -->
    <article class="default-container px-6 py-20">
      <h1 class="text-5xl font-bold text-gray-900 mb-12">{{ t('terms.title') }}</h1>

      <div class="space-y-12">
        <!-- Block 1 -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t('terms.blockTitle') }}</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-3">{{ t('terms.subheading1') }}</h3>
              <p class="text-gray-500 leading-relaxed text-sm">
                {{ t('terms.text1') }}
              </p>
            </div>

            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-3">{{ t('terms.subheading2') }}</h3>
              <div class="space-y-4 text-gray-500 leading-relaxed text-sm">
                <p>
                  {{ t('terms.text2') }}
                </p>
              </div>
            </div>
            
            <a href="#" class="inline-block text-orange-400 font-medium hover:text-orange-500 transition-colors text-sm">{{ t('terms.link') }}</a>
          </div>
        </section>
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
