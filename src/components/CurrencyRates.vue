<template>
  <div class="rates-container">
    <h2 class="title">Мониторинг курсов</h2>
    <table class="rates-table">
      <thead>
      <tr>
        <th>Направление</th>
        <th>Рынок (WhiteBIT)</th>
        <th>Курс за 1 ед. крипты</th>
        <th>Итоговый курс</th>
        <th>Настройка</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in clientRates" :key="idx">
        <td class="direction">
          <span class="symbol">{{ item.from_currency.toUpperCase() }}</span>
          <span class="arrow">→</span>
          <span class="symbol">{{ item.to_currency.toUpperCase() }}</span>
        </td>
        <td class="market">{{ item.marketRate }}</td>
        <td class="unit-price">
          {{ item.mainUnitRate }}
          <span class="unit-curr">
               {{ item.mainUnitRate !== '—' ? (item.from_currency === item.main_currency ? item.to_currency : item.from_currency).toUpperCase() : '' }}
             </span>
        </td>
        <td class="final">
          {{ item.rate }}
        </td>
        <td class="info">
          <span class="badge">+{{ item.rate_adjustment_percent }}%</span>
          <span class="prec">prec: {{ item.precision }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useWhiteBitRates } from '../composables/useWhiteBitRates';

// Имитация данных с бэкенда с полем precision
const backendConfigs = [
  // BTC (точность 2 для фиата, 8 для крипты)
  { main_currency: 'btc', from_currency: 'btc', to_currency: 'eur', rate_adjustment_percent: 0.1, precision: 2 },
  { main_currency: 'btc', from_currency: 'eur', to_currency: 'btc', rate_adjustment_percent: 0.2, precision: 8 },
  { main_currency: 'btc', from_currency: 'btc', to_currency: 'usd', rate_adjustment_percent: 0.1, precision: 2 },
  { main_currency: 'btc', from_currency: 'usd', to_currency: 'btc', rate_adjustment_percent: 0.2, precision: 8 },

  // TRX (точность 6, чтобы видеть разницу в центах)
  { main_currency: 'trx', from_currency: 'trx', to_currency: 'usd', rate_adjustment_percent: 0.3, precision: 6 },
  { main_currency: 'trx', from_currency: 'usd', to_currency: 'trx', rate_adjustment_percent: 0.4, precision: 8 },

  // USDC
  { main_currency: 'usdc', from_currency: 'usdc', to_currency: 'usd', rate_adjustment_percent: 0.15, precision: 4 },
  { main_currency: 'usdc', from_currency: 'usd', to_currency: 'usdc', rate_adjustment_percent: 0.25, precision: 4 }
];

const { clientRates } = useWhiteBitRates(backendConfigs);
</script>

<style scoped>
.rates-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: sans-serif;
}

.title {
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
}

.rates-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

th {
  background: #edf2f7;
  padding: 12px;
  text-align: left;
  font-size: 0.75rem;
  color: #4a5568;
  text-transform: uppercase;
}

td {
  padding: 16px 12px;
  border-bottom: 1px solid #f7fafc;
}

.symbol {
  font-weight: bold;
}

.arrow {
  margin: 0 8px;
  color: #cbd5e0;
}

.market {
  font-family: monospace;
  color: #a0aec0;
  font-size: 0.85rem;
}

.unit-price {
  font-weight: 600;
  background: #fffaf0;
}

.unit-curr {
  font-size: 0.7rem;
  color: #718096;
}

.final {
  font-family: monospace;
  font-weight: bold;
  color: #38a169;
  font-size: 1.1rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge {
  font-size: 0.7rem;
  background: #e6fffa;
  color: #2c7a7b;
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
}

.prec {
  font-size: 0.65rem;
  color: #cbd5e0;
}
</style>