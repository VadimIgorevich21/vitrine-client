// stores/useConfigStore.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import configService from "@/services/configService";
import type { Configs } from "@/types/config";

export const useConfigStore = defineStore("config", () => {
  // state
  const mainConfigs = ref<Configs | null>(null);
  const exchangeRates = ref<Configs["exchange_rates"]>([]);
  const loading = ref<boolean>(false);

  // actions
  const getMainConfigs = async (): Promise<void> => {
    loading.value = true;

    try {
      let configs: Configs;

      // При жёсткой перезагрузке store пустой — всегда запрашиваем свежие конфиги с API.
      // При навигации внутри SPA используем кэш, чтобы не дергать API на каждый переход.
      const isColdStart = mainConfigs.value === null;
      const cached = !isColdStart ? localStorage.getItem("configs") : null;

      if (!cached) {
        const response = await configService.getConfigs();
        configs = response.data.data;
        localStorage.setItem("configs", JSON.stringify(configs));
      } else {
        configs = JSON.parse(cached) as Configs;
      }

      mainConfigs.value = configs;
      exchangeRates.value = configs?.exchange_rates ?? [];
    } catch (err) {
      console.error("Error loading configs:", err);
      mainConfigs.value = null;
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
      exchangeRates.value = configs?.exchange_rates ?? [];
    } catch (err) {
      console.error("Error updating configs:", err);
      mainConfigs.value = null;
    }
  };

  const setNotifications = (notifications: any[]): void => {
    if (!mainConfigs.value) return;
    mainConfigs.value.notifications = notifications ?? [];
  };

  const setUnreadNotificationsCount = (count: number | null): void => {
    if (!mainConfigs.value) return;
    mainConfigs.value.unreadNotificationsCount = count ?? null;
  };

  // getters
  const notifications = computed(
      () => mainConfigs.value?.notifications ?? []
  );

  const maintenanceNotification = computed(() => {
    const notification = mainConfigs.value?.maintenanceNotification;
    if (!notification) return null;

    if (typeof notification.content === "string") {
      return {
        ...notification,
        content: JSON.parse(notification.content),
      };
    }

    return notification;
  });

  return {
    mainConfigs,
    exchangeRates,
    loading,

    getMainConfigs,
    updateConfigs,
    setNotifications,
    setUnreadNotificationsCount,

    notifications,
    maintenanceNotification,
  };
});