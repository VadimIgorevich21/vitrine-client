<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useI18n } from 'vue-i18n'
import RatesTable from '@/components/rates/RatesTable.vue';
import ExchangeForm from '@/components/orders/ExchangeForm.vue';

const counterStore = useCounterStore()
const { t, locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en'
}
</script>

<template>
  <div class="home-hero-container">
    <div class="default-container px-4 pt-12 pb-24">
      <div class="hero-grid">
        
        <!-- Left Side: Content -->
        <div class="hero-content-block">
          <div class="innovate-badge">
            <span class="badge-dot"></span>
            {{ t('home.hero_badge') }}
          </div>

          <h1 class="hero-title">
            {{ t('home.hero_title_p1') }} <br>
            <span class="text-gradient">{{ t('home.hero_title_p2') }}</span>
          </h1>

          <p class="hero-subtitle">
            {{ t('home.hero_subtitle') }}
          </p>
        </div>

        <!-- Right Side: Form Block -->
        <div class="hero-form-column">
          <div class="form-wrapper-outer">
            <div class="form-scroll-container">
              <ExchangeForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Bottom section (Original contents, adjusted) -->
  <div class="default-container px-4 py-20 border-t border-white/5">
    <div class="grid grid-cols-1 gap-12">
      <section class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-[2rem] p-8 border border-white/20">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Все направления обмена</h2>
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
</template>

<style scoped>
.home-hero-container {
  position: relative;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;
}

.hero-content-block {
  max-width: 654px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
}

.hero-form-column {
  display: flex;
  justify-content: flex-end;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
}

.text-gradient {
  background: linear-gradient(135deg, #a78bfa 0%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

/* Badge Styles - Restored to original */
.innovate-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 14px;
  color: #e6e8ff;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
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
  mask:
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

/* Form Container Styles */
.form-wrapper-outer {
  width: 448px;
  height: 491px;
  background: white;
  border-radius: 2.5rem;
  padding: 1rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.form-scroll-container {
  flex: 1;
  overflow-y: auto;
  border-radius: 1.5rem;
  padding: 1rem 0;
}

/* Custom Scrollbar for the form */
.form-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.form-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.form-scroll-container::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.form-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #cbd5e0;
}

/* Remove default styles from ExchangeForm to fit better */
:deep(.max-w-xl) {
  max-width: 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding: 0 1.5rem !important;
  background: transparent !important;
}

:deep(.dark .max-w-xl) {
  background: transparent !important;
}

@media (max-width: 1100px) {
  .hero-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .hero-content-block {
    text-align: center;
    align-items: center;
  }
  .hero-form-column {
    justify-content: center;
  }
  .form-wrapper-outer {
    width: 100%;
    max-width: 448px;
  }
}
</style>