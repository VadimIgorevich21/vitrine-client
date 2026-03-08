<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiClient } from "@/services/api.js";
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'

const { t } = useI18n()
const authStore = useAuthStore()
let allpassStarted = ref(false)
let kycLink = ref('')

const isPending = computed(() => authStore.user?.kyc_status === 'pending')

const startVerification = async () => {
  // запрос к твоему backend
  const { data } = await apiClient.post('/allpass/start')
  kycLink.value = data.link
  
  if (kycLink.value) {
    window.open(kycLink.value, '_blank')
  }

  allpassStarted.value = true
}
</script>

<template>
  <div class="flex items-center justify-center py-10 w-full">
    <!-- Default Verification Screen -->
    <div v-if="!isPending" class="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-2xl w-full text-center">
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

      <h1 class="text-2xl font-semibold mb-4 text-[#1D1E2C]">{{ t('cabinet.verification_page.title') }}</h1>
      
      <p class="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        {{ t('cabinet.verification_page.description') }}
      </p>

      <button 
        @click="startVerification"
        class="w-full bg-[#1D1E2C] text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-all mb-4 cursor-pointer"
      >
        {{ t('cabinet.verification_page.continue') }}
      </button>

      <div class="text-xs text-gray-400 flex items-center justify-center gap-1">
        <span>{{ t('cabinet.verification_page.powered_by') }}</span>
        <span class="font-semibold text-gray-500">sumsub</span>
      </div>

      <div id="allpass" v-show="allpassStarted" class="mt-4"></div>
    </div>

    <!-- Verification Incomplete Screen -->
    <div v-else class="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-2xl w-full text-center">
      <div class="flex justify-center mb-6">
        <div class="bg-[#FFF4E5] w-16 h-16 rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 11V16M16 21H16.01M5.33333 26.6667H26.6667C28.8467 26.6667 30.2067 24.3333 29.1167 22.4667L18.45 4.46667C17.36 2.6 14.64 2.6 13.55 4.46667L2.88333 22.4667C1.79333 24.3333 3.15333 26.6667 5.33333 26.6667Z" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-semibold mb-4 text-[#101828]">{{ t('cabinet.verification_page.pending_title') }}</h1>
      
      <p class="text-[#667085] mb-8 max-w-md mx-auto leading-relaxed">
        {{ t('cabinet.verification_page.pending_description') }}
      </p>

      <div class="flex justify-center">
        <button 
          @click="startVerification"
          class="btn-submit-kyc"
        >
          {{ t('cabinet.verification_page.submit_kyc') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-submit-kyc {
  background: linear-gradient(135deg, #FF4D00 0%, #FF8A00 100%);
  color: white;
  padding: 16px 48px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s;
  box-shadow: 0 10px 20px -5px rgba(255, 122, 0, 0.4);
  cursor: pointer;
}

.btn-submit-kyc:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -5px rgba(255, 122, 0, 0.5);
}
</style>