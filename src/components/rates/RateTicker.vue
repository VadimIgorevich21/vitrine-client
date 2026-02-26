<template>
  <div class="ticker-item" v-if="currentRate">
    <span class="font-bold">{{ from }}:</span>
    {{ currentRate.final_rate.toFixed(2) }} {{ to }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRateStore } from '@/stores/useRateStore';

const props = defineProps<{
  from: string;
  to: string;
}>();

const rateStore = useRateStore();
const currentRate = computed(() => rateStore.getRate(props.from, props.to));
</script>