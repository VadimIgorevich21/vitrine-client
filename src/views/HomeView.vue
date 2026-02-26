<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useI18n } from 'vue-i18n'
import RatesTable from '@/components/rates/RatesTable.vue';
import RateTicker from '@/components/rates/RateTicker.vue';

const counterStore = useCounterStore()
const { t, locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {{ t('home.welcome') }}
      </h1>

      <div class="space-y-6">
        <div>
          <div>---------</div>
          <div class="flex gap-4 mb-8">
            <RateTicker from="BTC" to="USD" />
            <RateTicker from="ETH" to="USD" />
          </div>

          <section class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl mb-4">Все направления обмена</h2>
            <RatesTable />
          </section>
          <div>---------</div>
        </div>
        <div class="text-center">
          <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {{ t('home.counter') }}
          </h2>
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {{ counterStore.count }}
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button
            @click="counterStore.decrement"
            class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            {{ t('home.decrement') }}
          </button>
          <button
            @click="counterStore.increment"
            class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            {{ t('home.increment') }}
          </button>
        </div>

        <div class="text-center">
          <button
            @click="toggleLocale"
            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            {{ locale === 'en' ? 'Русский' : 'English' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
