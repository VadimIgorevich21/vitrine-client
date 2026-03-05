<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useI18n } from 'vue-i18n'
import RatesTable from '@/components/rates/RatesTable.vue';
import RateTicker from '@/components/rates/RateTicker.vue';
// ИМПОРТИРУЕМ ФОРМУ
import ExchangeForm from '@/components/orders/ExchangeForm.vue';

const counterStore = useCounterStore()
const { t, locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en'
}
</script>

<template>
  <div class="min-h-screen py-12 px-4">
    <div class="innovate-badge">
      <span class="badge-dot"></span>
      Innovate Trading Platform
    </div>
  </div>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      <div class="space-y-8">
        <div>
          <h1 class="text-4xl font-black text-gray-900 dark:text-white mb-4">
            {{ t('home.welcome') }}
          </h1>
          <p class="text-gray-500 text-lg">Надежный обмен криптовалют по лучшему курсу в реальном времени.</p>
        </div>

        <div class="flex gap-4">
          <RateTicker from="BTC" to="USD" />
          <RateTicker from="ETH" to="USD" />
        </div>

        <section class="bg-white dark:bg-gray-800 shadow-sm rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 class="text-xl font-bold mb-4 dark:text-white">Все направления</h2>
          <RatesTable />
        </section>
      </div>

      <div class="sticky top-8">
        <ExchangeForm />
      </div>

    </div>

    <div class="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm text-center">
      <h2 class="text-xl font-semibold mb-4 dark:text-white">{{ t('home.counter') }}</h2>
      <div class="text-4xl font-bold text-blue-600 mb-6">{{ counterStore.count }}</div>
      <div class="flex gap-2 justify-center">
        <button @click="counterStore.decrement" class="p-3 bg-red-100 text-red-600 rounded-xl">-</button>
        <button @click="counterStore.increment" class="p-3 bg-green-100 text-green-600 rounded-xl">+</button>
        <button @click="toggleLocale" class="p-3 bg-gray-100 rounded-xl text-xs">{{ locale.toUpperCase() }}</button>
      </div>
    </div>
  </div>
</template>

<style>
.innovate-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 14px;
  color: #e6e8ff;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
}

.innovate-badge::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;

  background:
    linear-gradient(
      45deg,
      rgba(0,0,0,0.85) 0%,
      rgba(200,200,200,0.6) 10%,
      rgba(200,200,200,0.6) 90%,
      rgba(0,0,0,0.85) 100%
    ),
    linear-gradient(
      45deg,
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.9) 100%
    );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;

  pointer-events: none;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #ff7a00;
  border-radius: 50%;
}

/*
.innovate-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 6px 16px;
  border-radius: 999px;

  font-size: 14px;
  color: #e6e8ff;

  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);

  box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
}

.innovate-badge::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;

  background:
    linear-gradient(
      45deg,
      rgba(0,0,0,0.85) 0%,
      rgba(0,0,0,0.5) 5%,
      rgba(200,200,200,0.6) 10%,
      rgba(200,200,200,0.6) 90%,
      rgba(0,0,0,0.5) 95%,
      rgba(0,0,0,0.85) 100%
    ),
    linear-gradient(
      45deg,
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.9) 100%
    );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;

  pointer-events: none;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #ff7a00;
  border-radius: 50%;
}

*/
</style>