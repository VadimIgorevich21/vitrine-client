<template>
  <div class="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
    <!-- Tabs -->
    <div v-if="configStore.loading" class="h-14 bg-gray-100 dark:bg-gray-700 animate-pulse rounded-2xl mb-8"></div>
    <div v-else class="flex p-1.5 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-8">
      <button
        v-for="t in (['buy', 'sell'] as const)" :key="t"
        @click="formStore.state.type = t"
        :class="['flex-1 py-3 text-sm font-black rounded-xl transition-all duration-300',
                 formStore.state.type === t ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md' : 'text-gray-400 hover:text-gray-600']"
      >
        {{ t === 'buy' ? 'КУПИТЬ КРИПТУ' : 'ПРОДАТЬ КРИПТУ' }}
      </button>
    </div>

    <!-- Forms -->
    <BuyForm v-if="formStore.state.type === 'buy'" />
    <SellForm v-else-if="formStore.state.type === 'sell'" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrderFormStore } from '@/stores/useOrderFormStore';
import { useConfigStore } from '@/stores/syncConfigs';
import BuyForm from './BuyForm.vue';
import SellForm from './SellForm.vue';

const formStore = useOrderFormStore();
const configStore = useConfigStore();

onMounted(async () => {
  // Загружаем конфиги, если их нет
  if (!configStore.mainConfigs) await configStore.getMainConfigs();
  // Инициализируем дефолты формы
  formStore.initDefaultValues();
});
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>