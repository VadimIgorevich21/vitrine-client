import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import pusher from '@/services/pusher';
import { apiClient } from "@/services/api.ts";
// Импортируем типы
import type { CurrencyRate, RatesUpdatedPayload } from '@/types/rate';

export const useRateStore = defineStore('rates', () => {
  const rates = ref<CurrencyRate[]>([]);
  const loading = ref<boolean>(false);
  const isSubscribed = ref<boolean>(false);
  const lastUpdated = ref<number>(Date.now());

  // Геттер: возвращает null, если не нашел (защита от ошибок в шаблоне)
  const getRate = computed(() => {
    return (from: string, to: string) =>
      rates.value.find(r => r.from === from && r.to === to) || null;
  });

  // Загрузка начальных данных
  async function fetchRates() {
    loading.value = true;
    try {
      const { data } = await apiClient.get<{ data: CurrencyRate[] }>('/rates');
      rates.value = data.data;
      // console.log('✅ [RatesStore] Начальные курсы загружены');
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
    } finally {
      loading.value = false;
    }
  }

  function initRatesListener() {
    if (isSubscribed.value) return;

    const channel = pusher.subscribe('rates-channel');

    // Трюк для отладки: если событие не ловится по имени, это покажет ВСЕ события в консоли
    // channel.bind_global((eventName: string, data: any) => {
    //   console.log(`🔍 [Pusher Debug] Событие: ${eventName}`, data);
    // });

    // Основной слушатель
    channel.bind('rates.updated', (data: RatesUpdatedPayload) => {
      // console.log('⚡ [Pusher] Курсы обновлены!', data.rates);
      rates.value = data.rates;
      lastUpdated.value = Date.now();
    });

    isSubscribed.value = true;
    // console.log('📡 [Pusher] Слушатель инициализирован на канале: rates-channel');
  }

  return {
    rates,
    loading,
    fetchRates,
    initRatesListener,
    getRate,
    lastUpdated
  };
});