<template>
  <div class="rates-container">
    <h2 class="title">Курсы Обмена (WhiteBIT Live)</h2>
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
        :class="{ 'row-flash': item.isUpdating }"
      >
        <td class="direction">
          <strong>{{ item.from_currency.toUpperCase() }}</strong>
          <span class="arrow">→</span>
          <strong>{{ item.to_currency.toUpperCase() }}</strong>
        </td>
        <td class="market">{{ item.marketRate }}</td>
        <td class="unit-price">
          {{ item.mainUnitRate }}
          <span class="unit-curr">{{ (item.from_currency === item.main_currency ? item.to_currency : item.from_currency).toUpperCase() }}</span>
        </td>
        <td class="final" :class="{ 'text-flash': item.isUpdating }">
          {{ item.rate }} <span class="final-curr">{{ item.to_currency.toUpperCase() }}</span>
        </td>
        <td>
          <span
            class="badge"
            :class="item.rate_adjustment_percent >= 0 ? 'badge-pos' : 'badge-neg'"
          >
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
  // TRX (использует TRX_USDC)
  { main_currency: 'trx', from_currency: 'trx', to_currency: 'usd', rate_adjustment_percent: -0.3, precision: 4 },
  { main_currency: 'trx', from_currency: 'usd', to_currency: 'trx', rate_adjustment_percent: 0.4, precision: 8 },
  // USDC (использует USDC_USDT для пары к USD)
  { main_currency: 'usdc', from_currency: 'usdc', to_currency: 'usd', rate_adjustment_percent: -0.15, precision: 4 },
  { main_currency: 'usdc', from_currency: 'usd', to_currency: 'usdc', rate_adjustment_percent: 0.25, precision: 4 },
  // ETH
  { main_currency: 'eth', from_currency: 'eth', to_currency: 'usd', rate_adjustment_percent: -0.15, precision: 2 },
  { main_currency: 'eth', from_currency: 'usd', to_currency: 'eth', rate_adjustment_percent: 0.25, precision: 8 }
];

const { clientRates } = useWhiteBitRates(backendConfigs);
</script>

<style scoped>
.rates-container { padding: 20px; max-width: 1000px; margin: auto; font-family: sans-serif; }
.rates-table { width: 100%; border-collapse: collapse; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden; }
th { background: #f4f7f6; padding: 12px; text-align: left; color: #666; font-size: 13px; }
td { padding: 15px 12px; border-bottom: 1px solid #eee; transition: background-color 0.3s ease; }

/* Эффект подмигивания строки */
.row-flash {
  background-color: rgba(39, 174, 96, 0.08);
}

.text-flash {
  color: #27ae60 !important;
  font-weight: 800;
}

.arrow { color: #bbb; margin: 0 10px; }
.market { font-family: monospace; color: #999; }
.unit-price { font-weight: bold; color: #2c3e50; }
.unit-curr { font-size: 0.7em; color: #7f8c8d; }

.final { font-family: monospace; font-weight: bold; color: #27ae60; font-size: 1.1em; transition: color 0.3s; }
.final-curr { font-size: 0.6em; color: #7f8c8d; }

/* Бейджи наценки */
.badge { padding: 3px 7px; border-radius: 4px; font-size: 11px; font-weight: bold; }
.badge-pos { background: #e8f5e9; color: #2e7d32; }
.badge-neg { background: #ffebee; color: #c62828; }
</style>