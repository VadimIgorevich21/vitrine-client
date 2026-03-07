<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goToVerification = () => {
  router.push('/cabinet/verification')
}
</script>

<template>
  <div 
    class="bg-[#F6851B] text-white px-6 py-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer hover:bg-opacity-95 transition-all shadow-sm group"
    @click="goToVerification"
  >
    <div class="flex items-center gap-4">
      <div class="bg-white/20 p-2 rounded-xl">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 16V17C18 18.1046 17.1046 19 16 19H8C6.89543 19 6 18.1046 6 17V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="font-medium text-base sm:text-lg">
        {{ t('cabinet.kyc_banner') }}
      </span>
    </div>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform group-hover:translate-x-1">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>
