<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore.ts'
import { computed } from 'vue'
// import KycWidget from "@/components/kyc/KycWidget.vue";
import KycComponent from "@/components/kyc/KycComponent.vue";
import ExchangeForm from "@/components/orders/ExchangeForm.vue";

const { t } = useI18n()
const authStore = useAuthStore()

const displayName = computed(() => {
  const u = authStore.user
  if (!u) return ''
  return (u.name as string) || (u.email as string) || t('header.userDefault')
})
</script>

<template>
  <div class="cabinet-page-with-exchange-form flex items-center justify-center py-10 w-full">
    <div class="max-w-2xl w-full">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {{ t('cabinet.title') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('cabinet.welcome', { name: displayName }) }}
      </p>
      <ExchangeForm />
    </div>
  </div>
</template>

<style scoped>
.cabinet-page-with-exchange-form .exchange-card{
  margin-bottom: 100px;
}
</style>