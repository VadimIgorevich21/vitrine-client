<script setup lang="ts">
import { onMounted } from 'vue';
import { useRateStore } from '@/stores/useRateStore';

const rateStore = useRateStore();

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
