<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
// ИМПОРТИРУЕМ ФОРМУ
import ExchangeForm from '@/components/orders/ExchangeForm.vue'

const { t } = useI18n()
const showCreateOrder = ref(false) // Переключатель для показа формы
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ t('orders.title') }}
        </h1>
        <p class="text-gray-500 mt-1">Управляйте вашими заявками и создавайте новые</p>
      </div>

      <button
        @click="showCreateOrder = !showCreateOrder"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100"
      >
        {{ showCreateOrder ? 'Закрыть форму' : 'Создать новый обмен' }}
      </button>
    </div>

    <transition name="slide">
      <div v-if="showCreateOrder" class="mb-12 bg-blue-50 dark:bg-gray-800 p-8 rounded-3xl border-2 border-blue-100 dark:border-gray-700">
        <h2 class="text-xl font-bold mb-6 text-blue-900 dark:text-white text-center">Новая заявка на обмен</h2>
        <ExchangeForm />
      </div>
    </transition>

    <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <p class="text-gray-600 dark:text-gray-300 mb-4 text-center py-10">
        {{ t('orders.inDevelopment') }}
        <br>
        тут будет таблица заказов, которую мы писали ранее...
      </p>

      <div class="text-center">
        <RouterLink to="/cabinet" class="text-blue-600 hover:underline">
          {{ t('orders.backToCabinet') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.4s ease; max-height: 1000px; overflow: hidden; }
.slide-enter-from, .slide-leave-to { opacity: 0; max-height: 0; transform: translateY(-20px); }
</style>