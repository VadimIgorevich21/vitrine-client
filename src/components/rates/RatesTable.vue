<template>
  <div class="rates-container">
    <div v-if="rateStore.loading" class="loader">{{ t('home.ratesTable.loading') }}</div>
    <table v-else class="min-w-full text-left">
      <thead>
      <tr>
        <th class="px-4 py-2">{{ t('home.ratesTable.direction') }}</th>
        <th class="px-4 py-2">{{ t('home.ratesTable.rate') }}</th>
        <th class="px-4 py-2">{{ t('home.ratesTable.minimum') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="rate in rateStore.rates" :key="`${rate.from}-${rate.to}`" class="border-t">
        <td class="px-4 py-2 font-medium">{{ rate.from }} → {{ rate.to }}</td>
        <td class="px-4 py-2 text-green-600">
          {{ rate.final_rate.toFixed(rate.precision) }}
        </td>
        <td class="px-4 py-2 text-gray-500">
          {{ rate.min_amount }} {{ rate.from }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRateStore } from '@/stores/useRateStore';
import { useI18n } from 'vue-i18n';

const rateStore = useRateStore();
const { t } = useI18n();
</script>