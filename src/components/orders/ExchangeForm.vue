<template>
  <div class="exchange-card">
    <!-- Tabs -->
    <div v-if="configStore.loading" class="loading-pulse-tabs mb-8"></div>
    <div v-else class="tabs-container mb-6">
      <button
        v-for="t in (['buy', 'sell'] as const)" :key="t"
        @click="formStore.state.type = t"
        :class="['tab-button', formStore.state.type === t ? 'active' : 'inactive']"
      >
        {{ t === 'buy' ? $t('orders.exchange.buyCrypto') : $t('orders.exchange.sellCrypto') }}
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
.exchange-card {
  width: 448px; /* max-w-md */
  max-width: 448px; /* max-w-md */
  margin: 0 auto;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 50px rgba(0,0,0,0.1);
  padding: 24px;
  transition: all 0.3s ease;
  gap: 24px;
  opacity: 1;
}

.tabs-container {
  display: flex;
  padding: 4px;
  background-color: #FAFAFA; /* bg-gray-50 */
  border-radius: 6px; /* rounded-2xl */
  border: 1px solid #F2F2F6;
}

.tab-button {
  flex: 1;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 6px; /* rounded-xl */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  outline: none;
}

.tab-button.active {
  background-color: white;
  color: #101828; /* text-gray-900 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.tab-button.inactive {
  background-color: transparent;
  color: rgba(106, 114, 130, 0.5);
; /* text-gray-400 */
}

.tab-button.inactive:hover {
  color: #6b7280; /* text-gray-500 */
}

.loading-pulse-tabs {
  height: 56px;
  background-color: #f9fafb;
  border-radius: 16px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

:deep(.dark) .loading-pulse-tabs {
  background-color: #374151;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

/* Responsiveness for < 500px */
@media (max-width: 500px) {
  .exchange-card {
    padding: 20px; /* Reduced padding */
    border-radius: 24px;
    margin: 0 auto;
  }

  .tab-button {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 13px;
  }
}
</style>