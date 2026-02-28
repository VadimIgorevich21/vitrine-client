// stores/useConfigStore.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import configService from "@/services/configService";
import type { Configs } from "@/types/config";

export const useConfigStore = defineStore("config", () => {
  // --- State ---
  const mainConfigs = ref<Configs | null>(null);
  const loading = ref<boolean>(false);

  // --- Actions ---
  const getMainConfigs = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await configService.getConfigs();
      const configs = response.data.data;

      localStorage.setItem("configs", JSON.stringify(configs));
      mainConfigs.value = configs;
    } catch (err) {
      console.error("Error loading configs:", err);
      // Если API упало, пробуем достать из кэша
      const cached = localStorage.getItem("configs");
      if (cached) mainConfigs.value = JSON.parse(cached);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateConfigs = async (): Promise<void> => {
    try {
      const response = await configService.getConfigs();
      const configs = response.data.data;
      localStorage.setItem("configs", JSON.stringify(configs));
      mainConfigs.value = configs;
    } catch (err) {
      console.error("Error updating configs:", err);
    }
  };

  // --- Getters (Добавленное для формы обмена) ---

  // Список фиатных валют для таба "Покупка" (from)
  const fiatCurrencies = computed(() => mainConfigs.value?.fiat_currencies ?? []);

  // Список криптовалют для таба "Продажа" (from)
  const cryptoCurrencies = computed(() => mainConfigs.value?.crypto_currencies ?? []);

  // Карта направлений: какая валюта на какие меняется
  const directions = computed(() => mainConfigs.value?.exchange_rules?.directions ?? {});

  // Список методов оплаты (для выплаты пользователю или приема средств)
  const paymentMethods = computed(() => mainConfigs.value?.payment_methods ?? []);

  // Список сетей/типов кошельков (ERC20, TRC20 и т.д.)
  const walletTypes = computed(() => mainConfigs.value?.wallet_types ?? []);

  // Вспомогательные геттеры для уведомлений
  const notifications = computed(() => mainConfigs.value?.notifications ?? []);

  const maintenanceNotification = computed(() => {
    const notification = mainConfigs.value?.maintenanceNotification;
    if (!notification) return null;
    if (typeof notification.content === "string") {
      return { ...notification, content: JSON.parse(notification.content) };
    }
    return notification;
  });

  return {
    mainConfigs,
    loading,

    // Новые геттеры
    fiatCurrencies,
    cryptoCurrencies,
    directions,
    paymentMethods,
    walletTypes,

    getMainConfigs,
    updateConfigs,
    notifications,
    maintenanceNotification,
  };
});