<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { saveTokenFromCallback } from '@/services/authService.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const error = ref<string | null>(null)

onMounted(async () => {
  const token = route.query.token as string | undefined
  const tokenType = (route.query.token_type as string) ?? 'Bearer'

  if (!token?.trim()) {
    error.value = t('login.callbackError')
    return
  }

  if (tokenType.toLowerCase() === 'bearer') {
    saveTokenFromCallback(token)
  } else {
    saveTokenFromCallback(token)
  }

  try {
    await authStore.getAuthUser()
    const redirect = (route.query.redirect as string) || '/cabinet'
    await router.replace(redirect)
  } catch {
    error.value = t('login.callbackError')
  }
})
</script>

<template>
  <div class="max-w-md mx-auto px-4 py-12 text-center">
    <p v-if="error" class="text-red-600 dark:text-red-400 mb-4">
      {{ error }}
    </p>
    <p v-else class="text-gray-600 dark:text-gray-300">
      {{ t('login.callbackProcessing') }}
    </p>
  </div>
</template>
