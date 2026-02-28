<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import OtpInput from './OtpInput.vue' // Путь к компоненту выше

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

// Состояния из твоего кода
const otpEmail = ref('')
const otpCode = ref('')
const otpSent = ref(false)
const loading = computed(() => authStore.loading)
const authError = computed(() => authStore.error)

async function handleSendOtp() {
  if (!otpEmail.value.includes('@')) return
  await authStore.sendOtp(otpEmail.value)
  otpSent.value = true
}

async function handleVerify() {
  const redirectPath = (route.query.redirect as string) || '/cabinet'
  await authStore.verifyOtp(otpEmail.value, otpCode.value, redirectPath)
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B012E] relative overflow-hidden font-sans">
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>

    <div class="mb-8 z-10">
      <div class="flex items-center gap-2">
         <span class="text-white text-2xl font-bold tracking-tight uppercase italic">
           <span class="text-orange-500">B</span>IRONBIT
         </span>
      </div>
    </div>

    <div class="w-full max-w-[400px] bg-white rounded-[24px] p-8 shadow-2xl z-10 mx-4">

      <div class="text-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ otpSent ? 'Verification' : 'Connect to IronBit' }}
        </h2>
        <p v-if="!otpSent" class="text-sm text-gray-500 mt-1">
          Sign In or Create Account in one click
        </p>
        <p v-else class="text-sm text-gray-500 mt-1">
          We've sent a verification code to <br/>
          <span class="font-medium text-gray-700">{{ otpEmail }}</span>
        </p>
      </div>

      <div v-if="!otpSent" class="space-y-4">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            v-model="otpEmail"
            type="email"
            placeholder="Enter your Email"
            class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
          />
        </div>

        <button
          @click="handleSendOtp"
          :disabled="loading"
          class="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {{ loading ? 'Sending...' : 'Send OTP' }}
        </button>

        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-100"></div></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-2 text-gray-400">Or</span></div>
        </div>

        <button class="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-5 h-5" alt="Google" />
          <span class="text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>

      <div v-else class="space-y-6">
        <div v-if="authError" class="text-center text-red-500 text-sm font-medium mb-2">
          {{ authError }}
        </div>

        <OtpInput
          v-model="otpCode"
          :error="!!authError"
          @complete="handleVerify"
        />

        <div class="text-center">
          <button
            @click="otpSent = false"
            class="text-indigo-600 text-sm font-medium hover:underline"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-6 w-full px-8 flex flex-wrap justify-between items-center text-gray-400 text-xs z-10">
      <div>© 2026 IronBit. All rights reserved.</div>
      <div class="flex gap-4">
        <a href="#" class="hover:text-white transition-colors">Buy & Sell Crypto</a>
        <a href="#" class="hover:text-white transition-colors">Contact Us</a>
        <a href="#" class="hover:text-white transition-colors">Terms & Conditions</a>
      </div>
      <div class="flex items-center gap-1 cursor-pointer hover:text-white">
        <span>EN</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
    </div>
  </div>
</template>