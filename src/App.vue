<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRateStore } from '@/stores/useRateStore';
import { useConfigStore } from '@/stores/syncConfigs';

const { locale } = useI18n();
const rateStore = useRateStore();
const configStore = useConfigStore();

// Watch for language changes to refresh configs
watch(locale, async () => {
  try {
    await configStore.updateConfigs();
  } catch (err) {
    console.error('Failed to refresh configs after language change:', err);
  }
});

onMounted(() => {
  // Инициализируем глобально при старте приложения
  rateStore.fetchRates();
  rateStore.initRatesListener();
});
</script>

<template>
  <RouterView />
  <Notifications />
</template>
