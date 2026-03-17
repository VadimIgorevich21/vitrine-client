<template>
  <div class="ticker-wrapper">
    <div class="ticker-content" :style="{ animationDuration: animationDuration }">
      <div v-for="(item, index) in displayItems" :key="`${item.main}-${item.from}-${index}`" class="ticker-item">
        <span class="ticker-pair">{{ item.main }}/{{ item.from }}</span>
        <span class="ticker-value">{{ formatPrice(item.rate.unit_price, item.from) }}</span>
        <span class="ticker-change" :class="item.change >= 0 ? 'up' : 'down'">
          {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
        </span>
      </div>
      <!-- Duplicate for seamless loop -->
      <div v-for="(item, index) in displayItems" :key="`${item.main}-${item.from}-dup-${index}`" class="ticker-item" aria-hidden="true">
        <span class="ticker-pair">{{ item.main }}/{{ item.from }}</span>
        <span class="ticker-value">{{ formatPrice(item.rate.unit_price, item.from) }}</span>
        <span class="ticker-change" :class="item.change >= 0 ? 'up' : 'down'">
          {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRateStore } from '@/stores/useRateStore';

const rateStore = useRateStore();

// Requested sequences
const sequence1 = [
  { main: 'BTC', from: 'USD', change: 0.2 },
  { main: 'ETH', from: 'USD', change: 0.8 },
  { main: 'TRX', from: 'USD', change: -0.5 },
  { main: 'USDC', from: 'USD', change: 0.01 },
  { main: 'BTC', from: 'EUR', change: 0.1 },
  { main: 'ETH', from: 'EUR', change: 0.6 },
  { main: 'TRX', from: 'EUR', change: -0.3 },
  { main: 'USDC', from: 'EUR', change: 0.0 },
];

// Placeholder sequence (alternative)
/*
const sequence2 = [
  { from: 'BTC', to: 'USD', change: 2.4 },
  { from: 'BTC', to: 'EUR', change: 2.1 },
  { from: 'ETH', to: 'USD', change: 1.8 },
  { from: 'ETH', to: 'EUR', change: 1.5 },
  { from: 'TRX', to: 'USD', change: -0.5 },
  { from: 'TRX', to: 'EUR', change: -0.3 },
  { from: 'USDC', to: 'USD', change: 0.1 },
  { from: 'USDC', to: 'EUR', change: 0.0 },
];
*/


const activeSequence = sequence1;

interface DisplayItem {
  main: string;
  from: string;
  change: number;
  rate: any; // Using any for simplicity as it comes from CurrencyRate
}

const displayItems = computed<DisplayItem[]>(() => {
  return activeSequence
    .map(pair => {
      const rate = rateStore.rates.find(r => r.main === pair.main && r.from === pair.from);
      return rate ? { ...pair, rate } : null;
    })
    .filter((item): item is DisplayItem => item !== null);
});

const animationDuration = computed(() => {
  return `${displayItems.value.length * 8}s`;
});

const formatPrice = (value: number, currency: string) => {
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  // Use a fixed precision for fiat prices in the ticker, e.g., 2 decimal places
  const formattedValue = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency === 'USD' || currency === 'EUR' ? `${symbol}${formattedValue}` : `${formattedValue} ${symbol}`;
};
</script>

<style scoped>
.ticker-wrapper {
  width: 100%;
  overflow: hidden;
  background-color: white; /* Explicitly set background color */
  //border-top: 1px solid #f1f5f9;
  //border-bottom: 1px solid #f1f5f9;
  padding: 16px 0;
  position: relative;
  z-index: 10;
}

:deep(.dark) .ticker-wrapper {
  background: #0f172a;
  border-color: rgba(255, 255, 255, 0.05);
}

.ticker-content {
  display: flex;
  white-space: nowrap;
  width: max-content;
  animation: marquee linear infinite;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 40px;
}

.ticker-pair {
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
}

.ticker-value {
  color: #0f172a;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

:deep(.dark) .ticker-value {
  color: #f8fafc;
}

.ticker-change {
  font-size: 14px;
  font-weight: 600;
}

.up {
  color: #10b981;
}

.down {
  color: #ef4444;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Hover to pause */
.ticker-wrapper:hover .ticker-content {
  animation-play-state: paused;
}
</style>
