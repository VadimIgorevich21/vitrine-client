import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '@/services/api'

export const useKycStore = defineStore('kyc', () => {

  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const startVerification = async (): Promise<string | null> => {
    loading.value = true
    error.value = null

    try {
      const { data } = await apiClient.post('/allpass/start')
      token.value = data.token
      return data.token
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'KYC start failed'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    token,
    loading,
    error,
    startVerification
  }
})