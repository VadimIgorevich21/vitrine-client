<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import rejectedIcon from "@/assets/img/verification/rejected-icon.png";

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
        <img :src="rejectedIcon" alt="incompleteWarning" class="w-auto" />
      </div>

      <h1 class="page-title-h2 mb-4">{{ t('cabinet.restricted_page.title') }}</h1>
      
      <p class="page-content-text rejected-description-text mx-auto leading-relaxed">
        {{ t('cabinet.restricted_page.description_part_1') }}
      </p>
      <p class="page-content-text rejected-description-text mx-auto leading-relaxed">
        {{ t('cabinet.restricted_page.description_part_2') }}
      </p>
      <p class="page-content-text rejected-description-text mb-8 mx-auto leading-relaxed">
        {{ t('cabinet.restricted_page.description_part_3') }}
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

.rejected-description-text {
  max-width: 530px;
}
</style>
