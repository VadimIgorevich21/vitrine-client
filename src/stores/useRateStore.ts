import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import pusher from '@/services/pusher';
import { apiClient } from "@/services/api.ts";

// Типизация данных
export interface CurrencyRate {
  main: string;
  from: string;
  to: string;
  market_rate: number;
  adj: number;
  unit_price: number;
  final_rate: number;
  precision: number;
  min_amount: number;
  min_commission: number;
  updated_at: string;
}

export const useRateStore = defineStore('rates', () => {
  const rates = ref<CurrencyRate[]>([]);
  const loading = ref<boolean>(false);
  const isSubscribed = ref<boolean>(false);

  // Геттер для поиска конкретной пары
  const getRate = computed(() => {
    return (from: string, to: string) =>
      rates.value.find(r => r.from === from && r.to === to);
  });

  // Загрузка начальных данных
  async function fetchRates() {
    loading.value = true;
    try {
      const { data } = await apiClient.get<{ data: CurrencyRate[] }>('/rates');
      rates.value = data.data;
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
    } finally {
      loading.value = false;
    }
  }

  // Подписка на обновления (вызываем один раз в App.vue)
  function initRatesListener() {
    if (isSubscribed.value) return;

    const channel = pusher.subscribe('rates-channel');

    channel.bind('rates.updated', (data: { rates: CurrencyRate[] }) => {
      console.log('Курсы обновлены через Pusher');
      rates.value = data.rates;
    });

    isSubscribed.value = true;
  }

  return {
    rates,
    loading,
    fetchRates,
    initRatesListener,
    getRate
  };
});