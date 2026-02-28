import { defineStore } from 'pinia';
import { reactive, computed, watch } from 'vue';
import { useConfigStore } from '@/stores/syncConfigs';
import { useRateStore } from './useRateStore';
import { orderService } from '@/services/orderService';

export const useOrderFormStore = defineStore('orderForm', () => {
  const configStore = useConfigStore();
  const rateStore = useRateStore();

  const state = reactive({
    type: 'buy' as 'buy' | 'sell',
    from_currency: '',
    to_currency: '',
    amount_from: null as number | null,
    amount_to: null as number | null,
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
    if (!currentRate.value || state.amount_from === null || state.amount_from === 0) return true;
    return state.amount_from >= currentRate.value.min_amount;
  });

  // --- Actions: Пересчет ---
  const calculateTo = () => {
    const rate = currentRate.value;
    if (rate && state.amount_from !== null) {
      const res = state.amount_from * rate.final_rate;
      state.amount_to = Number(res.toFixed(rate.precision));
    } else {
      state.amount_to = null;
    }
  };

  const calculateFrom = () => {
    const rate = currentRate.value;
    if (rate && state.amount_to !== null && rate.final_rate > 0) {
      const res = state.amount_to / rate.final_rate;
      const precision = state.type === 'buy' ? 2 : 8;
      state.amount_from = Number(res.toFixed(precision));
    } else {
      state.amount_from = null;
    }
  };

  const submitOrder = async () => {
    return await orderService.createOrder(state);
  };

  const initDefaultValues = () => {
    const saved = localStorage.getItem('order_draft');
    if (saved) {
      Object.assign(state, JSON.parse(saved));
      localStorage.removeItem('order_draft');
    } else {
      state.from_currency = state.type === 'buy'
        ? configStore.fiatCurrencies[0] ?? ''
        : configStore.cryptoCurrencies[0] ?? '';

      const available = configStore.directions[state.from_currency] ?? [];
      state.to_currency = available[0] ?? '';
    }
    state.amount_from = null;
    state.amount_to = null;
  };

  const persist = () => localStorage.setItem('order_draft', JSON.stringify(state));

  const resetForm = () => {
    state.amount_from = null;
    state.amount_to = null;
    state.wallet_address = '';
    state.user_requisites = '';
  };

  // Следим за сменой типа (Buy/Sell)
  watch(() => state.type, () => initDefaultValues());

  // Следим за сменой валюты From
  watch(() => state.from_currency, (newVal) => {
    const available = configStore.directions[newVal] ?? [];
    if (!available.includes(state.to_currency)) {
      state.to_currency = available[0] ?? '';
    }
    calculateTo();
  });

  return {
    state,
    currentRate,
    isAmountValid,
    calculateTo,
    calculateFrom,
    initDefaultValues,
    persist,
    resetForm,
    submitOrder
  };
});