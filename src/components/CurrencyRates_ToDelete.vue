<template>
  <div class="rates-container">
    <div class="header">
      <h2 class="title">Мониторинг Курсов (WhiteBIT Live)</h2>
      <div class="live-indicator">LIVE</div>
    </div>

    <table class="rates-table">
      <thead>
      <tr>
        <th>Направление</th>
        <th>Рынок</th>
        <th>Цена за 1 ед. крипты</th>
        <th>К получению</th>
        <th>Наценка</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, idx) in clientRates"
        :key="idx"
        :class="{ 'row-active': item.isUpdating }"
      >
        <td class="direction">
          <span class="symbol">{{ item.from_currency.toUpperCase() }}</span>
          <span class="arrow">→</span>
          <span class="symbol">{{ item.to_currency.toUpperCase() }}</span>
        </td>
        <td class="market-col">{{ item.marketRate }}</td>
        <td class="unit-price" :class="{ 'pulse-green': item.isUpdating }">
          {{ item.mainUnitRate }}
          <span class="unit-label">{{ (item.from_currency === item.main_currency ? item.to_currency : item.from_currency).toUpperCase() }}</span>
        </td>
        <td class="final-rate">
          {{ item.rate }}
          <span class="final-label">{{ item.to_currency.toUpperCase() }}</span>
        </td>
        <td>
            <span class="badge" :class="item.rate_adjustment_percent >= 0 ? 'badge-plus' : 'badge-minus'">
              {{ item.rate_adjustment_percent > 0 ? '+' : '' }}{{ item.rate_adjustment_percent }}%
            </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useWhiteBitRates } from '../composables/useWhiteBitRates';

const backendConfigs = [
  // BTC
  { main_currency: 'btc', from_currency: 'btc', to_currency: 'eur', rate_adjustment_percent: -0.1, precision: 2 },
  { main_currency: 'btc', from_currency: 'eur', to_currency: 'btc', rate_adjustment_percent: 0.2, precision: 8 },
  { main_currency: 'btc', from_currency: 'btc', to_currency: 'usd', rate_adjustment_percent: -0.1, precision: 2 },
  { main_currency: 'btc', from_currency: 'usd', to_currency: 'btc', rate_adjustment_percent: 0.2, precision: 8 },
  // ETH
  { main_currency: 'eth', from_currency: 'eth', to_currency: 'eur', rate_adjustment_percent: -0.1, precision: 2 },
  { main_currency: 'eth', from_currency: 'eur', to_currency: 'eth', rate_adjustment_percent: 0.2, precision: 8 },
  { main_currency: 'eth', from_currency: 'eth', to_currency: 'usd', rate_adjustment_percent: -0.1, precision: 2 },
  { main_currency: 'eth', from_currency: 'usd', to_currency: 'eth', rate_adjustment_percent: 0.2, precision: 8 },
  // TRX
  { main_currency: 'trx', from_currency: 'trx', to_currency: 'eur', rate_adjustment_percent: -0.3, precision: 4 },
  { main_currency: 'trx', from_currency: 'eur', to_currency: 'trx', rate_adjustment_percent: 0.4, precision: 8 },
  { main_currency: 'trx', from_currency: 'trx', to_currency: 'usd', rate_adjustment_percent: -0.3, precision: 4 },
  { main_currency: 'trx', from_currency: 'usd', to_currency: 'trx', rate_adjustment_percent: 0.4, precision: 8 },
  // USDC
  { main_currency: 'usdc', from_currency: 'usdc', to_currency: 'eur', rate_adjustment_percent: -0.05, precision: 4 },
  { main_currency: 'usdc', from_currency: 'eur', to_currency: 'usdc', rate_adjustment_percent: 0.1, precision: 4 },
  { main_currency: 'usdc', from_currency: 'usdc', to_currency: 'usd', rate_adjustment_percent: -0.05, precision: 4 },
  { main_currency: 'usdc', from_currency: 'usd', to_currency: 'usdc', rate_adjustment_percent: 0.1, precision: 4 }
];

const { clientRates } = useWhiteBitRates(backendConfigs);
</script>

<style scoped>
.rates-container { padding: 40px; max-width: 1200px; margin: auto; font-family: 'Inter', sans-serif; background: #f9fafb; border-radius: 16px; }
.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.title { color: #111827; font-size: 24px; font-weight: 700; }
.live-indicator { background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 900; animation: blink 2s infinite; }

.rates-table { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
th { padding: 12px 16px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
td { padding: 16px; background: white; border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; transition: all 0.3s ease; }
td:first-child { border-left: 1px solid #f3f4f6; border-radius: 12px 0 0 12px; }
td:last-child { border-right: 1px solid #f3f4f6; border-radius: 0 12px 12px 0; }

/* Эффекты обновления */
.row-active td { background-color: #f0fdf4; }
.pulse-green { color: #10b981 !important; transform: scale(1.02); }

.symbol { font-weight: 700; color: #111827; }
.arrow { color: #d1d5db; margin: 0 8px; }
.market-col { font-family: monospace; color: #9ca3af; font-size: 13px; }
.unit-price { font-weight: 600; color: #374151; }
.unit-label { font-size: 10px; color: #9ca3af; margin-left: 2px; }
.final-rate { font-family: monospace; font-weight: 700; color: #10b981; font-size: 1.1rem; }
.final-label { font-size: 11px; color: #9ca3af; font-weight: 400; }

.badge { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; }
.badge-plus { background: #ecfdf5; color: #059669; }
.badge-minus { background: #fef2f2; color: #dc2626; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
</style>