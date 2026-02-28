import { defineStore } from 'pinia';
import { reactive, computed, watch } from 'vue';
import { useConfigStore } from './syncConfigs';
import { useRateStore } from './useRateStore';
import { orderService } from '@/services/orderService';

export const useOrderFormStore = defineStore('orderForm', () => {
  const configStore = useConfigStore();
  const rateStore = useRateStore();

  const state = reactive({
    type: 'buy' as 'buy' | 'sell',
    from_currency: '',
    to_currency: '',
    amount_from: 0,
    payment_method: '',
    wallet_type: '',
    wallet_address: '',
    user_requisites: '',
    comment: ''
  });

  // --- Getters ---
  const currentRate = computed(() =>
    rateStore.getRate(state.from_currency, state.to_currency)
  );

  const isAmountValid = computed(() => {
    if (!currentRate.value || state.amount_from === 0) return true;
    return state.amount_from >= currentRate.value.min_amount;
  });

  const calculatedTotal = computed(() => {
    const rate = currentRate.value;
    if (!rate || !state.amount_from) return '0.00';
    return (state.amount_from * rate.final_rate).toFixed(rate.precision);
  });

  // --- Actions ---

  const submitOrder = async () => {
    return await orderService.createOrder(state);
  };

  const initDefaultValues = () => {
    const saved = localStorage.getItem('order_draft');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
      localStorage.removeItem('order_draft');
      return;
    }

    // Установка валюты FROM
    if (state.type === 'buy') {
      state.from_currency = configStore.fiatCurrencies[0] ?? '';
    } else {
      state.from_currency = configStore.cryptoCurrencies[0] ?? '';
    }

    selectFirstAvailableTo();
  };

  const selectFirstAvailableTo = () => {
    // Безопасное получение массива направлений
    const available: string[] = configStore.directions[state.from_currency] ?? [];

    if (available.length > 0) {
      // Если текущая to_currency не входит в список доступных для новой from_currency
      if (!available.includes(state.to_currency)) {
        state.to_currency = available[0] ?? ''; // Добавили ?? '' для TS
      }
    } else {
      state.to_currency = '';
    }
  };

  const persist = () => localStorage.setItem('order_draft', JSON.stringify(state));

  const resetForm = () => {
    state.amount_from = 0;
    state.wallet_address = '';
    state.user_requisites = '';
  };

  // Наблюдатели
  watch(() => state.type, () => initDefaultValues());
  watch(() => state.from_currency, () => selectFirstAvailableTo());

  return {
    state,
    currentRate,
    isAmountValid,
    calculatedTotal,
    initDefaultValues,
    persist,
    resetForm,
    submitOrder
  };
});