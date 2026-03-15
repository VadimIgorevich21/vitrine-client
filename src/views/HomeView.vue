<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useI18n } from 'vue-i18n'
import RatesTable from '@/components/rates/RatesTable.vue';
import RatesTicker from '@/components/rates/RatesTicker.vue';
import InstantRegistration from '@/components/home/InstantRegistration.vue';
import SimpleProcess from '@/components/home/SimpleProcess.vue';
import SupportContact from '@/components/home/SupportContact.vue';
import HomeHero from '@/components/home/HomeHero.vue';

const counterStore = useCounterStore()
const { t, locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en'
}
</script>

<template>
  <HomeHero />
  <RatesTicker />
  <InstantRegistration />
  <SimpleProcess />
  <!-- Bottom section (Original contents, adjusted) -->
  <div class="!hidden default-container px-4 py-20 border-t border-white/5">
    <div class="grid grid-cols-1 gap-12">
      <section class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-[2rem] p-8 border border-white/20">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">{{ t('home.allExchangeDirections') }}</h2>
        <RatesTable />
      </section>
    </div>

    <!-- Stats/Counter (Keeping for now) -->
    <div class="max-w-md mx-auto mt-20 p-8 bg-white/5 dark:bg-gray-800/50 backdrop-blur-md rounded-3xl shadow-sm border border-white/10 text-center">
      <h2 class="text-xl font-semibold mb-4 dark:text-white">{{ t('home.counter') }}</h2>
      <div class="text-4xl font-bold text-blue-500 mb-6">{{ counterStore.count }}</div>
      <div class="flex gap-2 justify-center">
        <button @click="counterStore.decrement" class="p-3 bg-red-100/10 text-red-500 rounded-xl hover:bg-red-100/20 transition">-</button>
        <button @click="counterStore.increment" class="p-3 bg-green-100/10 text-green-500 rounded-xl hover:bg-green-100/20 transition">+</button>
        <button @click="toggleLocale" class="p-3 bg-gray-100/10 rounded-xl text-xs text-gray-400 hover:bg-gray-100/20 transition">{{ locale.toUpperCase() }}</button>
      </div>
    </div>
  </div>
  <SupportContact />
</template>

<style scoped>
/* Common styles if any */
</style>