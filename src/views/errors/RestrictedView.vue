<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const contactSupport = () => {
  router.push('/contacts')
}
</script>

<template>
  <div class="flex-1 flex items-center justify-center py-10 w-full">
    <div class="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 max-w-2xl w-full text-center">
      <div class="flex justify-center mb-6">
        <div class="bg-[#FFF0F0] w-16 h-16 rounded-full flex items-center justify-center">
          <!-- Siren Icon -->
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.58172 2 4 5.58172 4 10V14H3V16H21V14H20V10C20 5.58172 16.4183 2 12 2Z" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18V21" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 21H15" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 7V11" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="14" r="1" fill="#FF4D4D"/>
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-semibold mb-4 text-[#101828]">{{ t('cabinet.restricted_page.title') }}</h1>
      
      <p class="text-[#667085] mb-8 max-w-md mx-auto leading-relaxed">
        {{ t('cabinet.restricted_page.description') }}
      </p>

      <div class="flex justify-center">
        <button 
          @click="contactSupport"
          class="btn-contact-support"
        >
          {{ t('cabinet.restricted_page.contact_support') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-contact-support {
  background: #111827;
  color: white;
  padding: 12px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-contact-support:hover {
  background: #1f2937;
  transform: translateY(-2px);
}
</style>
