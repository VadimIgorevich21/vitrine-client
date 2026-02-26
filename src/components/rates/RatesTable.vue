<template>
  <div class="rates-container">
    <div v-if="rateStore.loading" class="loader">Загрузка актуальных курсов...</div>
    <table v-else class="min-w-full text-left">
      <thead>
      <tr>
        <th class="px-4 py-2">Направление</th>
        <th class="px-4 py-2">Курс</th>
        <th class="px-4 py-2">Минимум</th>
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
const rateStore = useRateStore();
</script>