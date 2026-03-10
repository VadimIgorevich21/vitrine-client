<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { apiClient } from "@/services/api.js";
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import allpassLogo from "@/assets/img/verification/allpass.logo.desktop.svg";
import incompleteWarning from "@/assets/img/verification/incomplete-warning.png";

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
let allpassStarted = ref(false)
let kycLink = ref('')
let isLoading = ref(false)

const isPending = computed(() => authStore.user?.kyc_status === 'pending')

const startVerification = async () => {
  if (isLoading.value) return
  
  // Открываем окно сразу, чтобы браузер не заблокировал "всплывающее окно"
  // так как асинхронный запрос может длиться долго.
  const kycWindow = window.open('', '_blank')
  if (kycWindow) {
    kycWindow.document.write('Loading...') // Или заглушка
  }

  isLoading.value = true
  
  try {
    const { data } = await apiClient.post('/allpass/start')
    
    if (data.user) {
      authStore.user = data.user
      localStorage.setItem('user', JSON.stringify(data.user))
    }

    const status = authStore.user?.kyc_status

    if (status === 'rejected') {
      if (kycWindow) kycWindow.close()
      router.push('/cabinet/restricted')
      return
    }

    if (status === 'completed' || status === 'approved') {
      if (kycWindow) kycWindow.close()
      router.push('/account')
      return
    }

    kycLink.value = data.link
    
    if (kycLink.value && kycWindow) {
      kycWindow.location.href = kycLink.value
    } else if (kycWindow) {
      kycWindow.close()
    }

    allpassStarted.value = true
  } catch (error) {
    console.error('Verification start failed:', error)
    if (kycWindow) kycWindow.close()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-10 w-full">
    <!-- Default Verification Screen -->
    <div v-if="!isPending" class="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-2xl w-full text-center">
      <!-- Sumsub Logo / Indicator -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-2">
          <img :src="allpassLogo" alt="allpassLogo" class="h-8 w-auto" />
        </div>
      </div>

      <h1 class="text-2xl font-semibold mb-4 text-[#1D1E2C]">{{ t('cabinet.verification_page.title') }}</h1>
      
      <p class="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        {{ t('cabinet.verification_page.description') }}
      </p>

      <button 
        @click="startVerification"
        class="btn-kyc-black flex items-center justify-center gap-2"
        :disabled="isLoading"
        :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
      >
        <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ t('cabinet.verification_page.continue') }}</span>
      </button>

      <div class="text-xs text-gray-400 flex items-center justify-center gap-1">
        <span>{{ t('cabinet.verification_page.powered_by') }}</span>
        <span class="font-semibold text-gray-500">allpass.ai</span>
      </div>

      <div id="allpass" v-show="allpassStarted" class="mt-4"></div>
    </div>

    <!-- Verification Incomplete Screen -->
    <div v-else class="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-2xl w-full text-center">
      <div class="flex justify-center mb-6">
        <img :src="incompleteWarning" alt="incompleteWarning" class="w-auto" />
      </div>

      <h1 class="page-title-h2 mb-6">{{ t('cabinet.verification_page.pending_title') }}</h1>
      
      <p class="verification-description-text page-content-text max-w-md mx-auto leading-relaxed">
        {{ t('cabinet.verification_page.pending_description_part1') }}
      </p>
      <p class="verification-description-text page-content-text mb-8 max-w-md mx-auto leading-relaxed">
        {{ t('cabinet.verification_page.pending_description_part2') }}
      </p>

      <div class="flex justify-center">
        <button 
          @click="startVerification"
          class="btn-submit-kyc flex items-center justify-center gap-2"
          :disabled="isLoading"
          :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
        >
          <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ t('cabinet.verification_page.submit_kyc') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-kyc-black {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  background: #1D1E2C;
  color: white;
  padding: 16px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  margin-bottom: 16px;
}

.btn-kyc-black:hover:not(:disabled) {
  background: #2D2E3C;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}

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

.btn-submit-kyc:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -5px rgba(255, 122, 0, 0.5);
}

.btn-submit-kyc:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.verification-description-text {
  max-width: 500px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>