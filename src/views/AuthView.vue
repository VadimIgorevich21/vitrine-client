<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import FormError from '@/components/FormError.vue'
import { getGoogleAuthUrl } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

const mode = ref<'otp' | 'password'>('otp')
const otpEmail = ref('')
const otpCode = ref('')
const otpSent = ref(false)
const email = ref('')
const password = ref('')

const redirectPath = computed(() => (route.query.redirect as string) || '/cabinet')
const loading = computed(() => authStore.loading)
const authError = computed(() => authStore.error)

async function sendOtp() {
  if (!otpEmail.value.trim()) return
  try {
    await authStore.sendOtp(otpEmail.value)
    otpSent.value = true
  } catch {
    // error in store
  }
}

async function submitOtp() {
  if (!otpEmail.value.trim() || !otpCode.value.trim()) return
  try {
    await authStore.verifyOtp(otpEmail.value, otpCode.value, redirectPath.value)
  } catch {
    // error in store
  }
}

function switchToPassword() {
  mode.value = 'password'
  authStore.error = null
  email.value = otpEmail.value
}

function switchToOtp() {
  mode.value = 'otp'
  otpSent.value = false
  otpCode.value = ''
  authStore.error = null
  otpEmail.value = email.value
}

async function submitEmailLogin() {
  if (!email.value.trim() || !password.value) return
  try {
    await authStore.login({ email: email.value, password: password.value }, redirectPath.value)
  } catch {
    // error in store
  }
}

function goGoogle() {
  if (typeof window === 'undefined') return
  const redirectUri = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath.value)}`
  window.location.href = getGoogleAuthUrl(redirectUri)
}
</script>

<template>
  <div class="max-w-md mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {{ t('login.title') }}
    </h1>

    <!-- OTP: email → код -->
    <div v-if="mode === 'otp'" class="space-y-4 mb-4">
      <div>
        <label for="auth-otp-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ t('login.email') }}
        </label>
        <input
          id="auth-otp-email"
          v-model="otpEmail"
          type="email"
          autocomplete="email"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          :disabled="loading"
        />
      </div>
      <template v-if="!otpSent">
        <button
          type="button"
          class="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading || !otpEmail.trim()"
          @click="sendOtp"
        >
          {{ t('login.otpSendCode') }}
        </button>
      </template>
      <template v-else>
        <div>
          <label for="auth-otp-code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ t('login.otpCodePlaceholder') }}
          </label>
          <input
            id="auth-otp-code"
            v-model="otpCode"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            :disabled="loading"
          />
        </div>
        <button
          type="button"
          class="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading || !otpCode.trim()"
          @click="submitOtp"
        >
          {{ t('login.submit') }}
        </button>
      </template>
      <FormError :error="authError" />
      <button
        type="button"
        class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        @click="switchToPassword"
      >
        {{ t('login.otpSwitchToPassword') }}
      </button>
    </div>

    <!-- Вход по паролю -->
    <form
      v-if="mode === 'password'"
      class="space-y-4 mb-4"
      @submit.prevent="submitEmailLogin"
    >
      <div>
        <label for="auth-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ t('login.email') }}
        </label>
        <input
          id="auth-email"
          v-model="email"
          type="email"
          autocomplete="email"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          :disabled="loading"
        />
      </div>
      <div>
        <label for="auth-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ t('login.password') }}
        </label>
        <input
          id="auth-password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          :disabled="loading"
        />
      </div>
      <FormError :error="authError" />
      <button
        type="submit"
        class="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        :disabled="loading"
      >
        {{ t('login.submit') }}
      </button>
      <button
        type="button"
        class="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
        @click="switchToOtp"
      >
        {{ t('login.passwordSwitchToOtp') }}
      </button>
    </form>

    <!-- Разделитель -->
    <div class="relative mb-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300 dark:border-gray-600" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">или</span>
      </div>
    </div>

    <!-- Вход через Google -->
    <button
      type="button"
      class="w-full py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
      :disabled="loading"
      @click="goGoogle"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {{ t('login.loginWithGoogle') }}
    </button>

    <p class="mt-6">
      <RouterLink
        to="/"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {{ t('common.backToHome') }}
      </RouterLink>
    </p>
  </div>
</template>
