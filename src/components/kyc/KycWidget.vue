<template>
  <div>

    <button
      v-if="!started"
      :disabled="kyc.loading"
      @click="handleStart"
    >
      Start KYC
    </button>

    <div v-if="kyc.error" class="error">
      {{ kyc.error }}
    </div>

    <div id="allpass-container"></div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useKycStore } from '@/stores/kycStore'
import { useAllpass } from '@/composables/useAllpass'

const kyc = useKycStore()
const { start } = useAllpass()

const started = ref(false)

const handleStart = async () => {

  const token = await kyc.startVerification()

  if (!token) return

  started.value = true

  await start({
    token,
    container: '#allpass-container',
    onComplete: () => {

      // 🔥 Лучше не reload — лучше обновить state
      window.location.reload()
    }
  })
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>