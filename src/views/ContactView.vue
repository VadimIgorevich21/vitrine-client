<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()

const form = ref({
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Mock submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert('Message sent (Mock)')
  form.value.email = ''
  form.value.message = ''
  isSubmitting.value = false
}
</script>

<template>
  <div class="bg-white min-h-[600px] py-20 px-4 sm:px-6 lg:px-8">
    <div class="default-container">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">
        <!-- Left Side: Content -->
        <div class="flex-1 max-w-xl">
          <h1 class="text-[56px] leading-[1.1] font-bold text-gray-900 mb-4 tracking-tight">
            {{ t('contacts.title1') }}<br />
            <span class="text-[#9BA5B7] font-normal">{{ t('contacts.title2') }}</span>
          </h1>
          <p class="text-gray-500 text-lg leading-relaxed mb-10 max-w-[480px]">
            {{ t('contacts.description') }}
          </p>
          <a
            href="mailto:info@ironbit.io"
            class="text-[20px] font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            {{ t('contacts.email') }}
          </a>
        </div>

        <!-- Right Side: Form Card -->
        <div class="w-full max-w-[500px]">
          <div class="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              {{ t('contacts.formTitle') }}
            </h2>
            <p class="text-sm text-gray-400 leading-relaxed mb-8">
              {{ t('contacts.formSubtext') }}
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  :placeholder="t('contacts.emailPlaceholder')"
                  class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <div>
                <textarea
                  v-model="form.message"
                  required
                  rows="5"
                  :placeholder="t('contacts.messagePlaceholder')"
                  class="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>
              
              <div class="pt-4">
                <BaseButton 
                  type="submit" 
                  :loading="isSubmitting"
                >
                  {{ t('contacts.sendButton') }}
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  letter-spacing: -0.01em;
}
/* Optional: background grid pattern if needed, but the user didn't explicitly ask for it, 
   though it is visible in the design. For now focusing on layout and content. */
</style>
