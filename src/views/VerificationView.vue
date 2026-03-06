<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-center py-10">
    <div class="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-2xl w-full text-center">
      <!-- Sumsub Logo / Indicator -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#00AE98]">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-2xl font-bold text-[#1D1E2C]">sumsub</span>
        </div>
      </div>

      <h1 class="text-2xl font-semibold mb-4">"BTCBIT Sp.z.o.o." verification</h1>
      
      <p class="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        You're about to submit sensitive data to "BTCBIT Sp.z.o.o.". If you received this link from a suspicious source, please close this page and notify us immediately.
      </p>

      <button class="w-full bg-[#1D1E2C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-all mb-4">
        Continue
      </button>

      <div class="text-xs text-gray-400 flex items-center justify-center gap-1">
        <span>Powered by</span>
        <span class="font-semibold text-gray-500">sumsub</span>
      </div>
    </div>
  </div>
</template>
