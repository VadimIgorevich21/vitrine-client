<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ExchangeForm from '@/components/orders/ExchangeForm.vue';

const { t } = useI18n()
</script>

<template>
  <div class="home-hero-container">
    <div class="default-container pt-12 pb-20">
      <div class="hero-grid">
        
        <!-- Left Side: Content -->
        <div class="hero-content-block">
          <div class="innovate-badge">
            <span class="badge-dot"></span>
            {{ t('home.hero_badge') }}
          </div>

          <h1 class="hero-title">
            {{ t('home.hero_title_p1') }} <br>
            <span>{{ t('home.hero_title_p2') }}</span>
          </h1>

          <p class="hero-subtitle">
            {{ t('home.hero_subtitle') }}
          </p>
        </div>

        <!-- Right Side: Form Block -->
        <div class="hero-form-column">
          <div class="flex items-center justify-center w-full">
            <div class="max-w-2xl w-full flex-1 p-4 lg:p-0">
              <ExchangeForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.home-hero-container {
  position: relative;
  /* overflow: hidden; */ /* Removed to prevent clipping currency dropdowns */
  z-index: 20; /* Keep hero above the rates ticker (which is z-index 10) */
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
}

.hero-form-column {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.hero-title {
  font-weight: 500;
  font-size: 64px;
  line-height: 130%;
  letter-spacing: 0;
  color: white;
  background: linear-gradient(113.64deg, #FFFFFF 40.81%, #978FE3 76.61%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  max-width: 550px;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.2px;

  background:
  linear-gradient(113.64deg, #FFFFFF 40.81%, #978FE3 76.61%),
  linear-gradient(0deg, #FFFFFF, #FFFFFF);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Badge Styles */
.innovate-badge {
  width: 240px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  text-align: center;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  color: #ffffff;
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
  width: 12px;
  height: 12px;
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
  /* overflow: hidden; */ /* Removed to allow currency dropdowns to overflow the card */
  display: flex;
  flex-direction: column;
}

.form-scroll-container {
  flex: 1;
  overflow-y: auto;
  border-radius: 1.5rem;
  padding: 1rem 0;
}

/* Custom Scrollbar */
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

:deep(.exchange-card) {
  max-width: 100% !important;
  /* Removed overrides that made the card transparent and flat */
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
