<template>
  <div class="exchange-card">
    <!-- Tabs -->
    <div v-if="configStore.loading" class="loading-pulse-tabs mb-8"></div>
    <div v-else-if="formStore.step === 123" class="tabs-container mb-6">
      <button
        v-for="t in (['buy'] as const)" :key="t"
        @click="t === 'buy' ? (formStore.state.type = t) : null"
        :class="['tab-button', formStore.state.type === t ? 'active' : 'inactive', { 'disabled': t === 'sell' }]"
        :disabled="t === 'sell'"
      >
        {{ t === 'buy' ? $t('orders.exchange.buyCrypto') : $t('orders.exchange.sellCrypto') }}
      </button>
    </div>
    <div v-else-if="formStore.step === 1" class="buy-header">
        <h2 class="buy-title">Buy {{ formStore.state.to_currency }}</h2>
        <div class="buy-header-spacer"></div>
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
  /* width: 100%;
  height: 497px;
  */
  max-width: 448px; /* max-w-md */
  width: 448px; /* max-w-md */
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

.tab-button.inactive:hover:not(.disabled) {
  color: #6b7280; /* text-gray-500 */
}

.tab-button.disabled {
  cursor: not-allowed;
  opacity: 0.5;
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
    width: 100%;
    max-width: 100%;
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

/* Step 2 Elements */
.buy-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
  justify-content: center;
}


.buy-title {
  font-size: 24px;
  font-weight: 500;
  color: #101828;
  line-height: 150%;
  margin-left: 40px;
}

.buy-header-spacer {
  width: 40px;
  height: 40px;
}
</style>