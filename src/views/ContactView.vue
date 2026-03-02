<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { apiClient } from '@/services/api'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
const toast = useToast()

const form = ref({
  email: '',
  message: ''
})

const errors = ref({
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const validate = () => {
  let isValid = true
  errors.value.email = ''
  errors.value.message = ''

  if (!form.value.email) {
    errors.value.email = t('contacts.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    // Basic email regex if needed, or just required if user only asked for "not empty"
    // The user said "if data is not filled", so mostly non-empty.
  }

  if (!form.value.message) {
    errors.value.message = t('contacts.messageRequired')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  try {
    await apiClient.post('/contact-form', form.value)
    
    toast.success(t('contacts.successMessage'))
    
    // Clear form
    form.value.email = ''
    form.value.message = ''
    errors.value.email = ''
    errors.value.message = ''
  } catch (error) {
    console.error('Contact form error:', error)
    toast.error(t('contacts.errorMessage'))
  } finally {
    isSubmitting.value = false
  }
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

            <form @submit.prevent="handleSubmit" class="space-y-2">
              <div>
                <input
                  v-model="form.email"
                  type="email"
                  :placeholder="t('contacts.emailPlaceholder')"
                  :class="[
                    'w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 outline-none transition-all placeholder:text-gray-400',
                    errors.email ? 'ring-2 ring-red-500/20' : 'focus:ring-orange-500/20'
                  ]"
                />
                <div class="h-6 mt-1 ml-2">
                  <transition name="fade">
                    <span v-if="errors.email" class="text-red-500 text-xs font-medium">
                      {{ errors.email }}
                    </span>
                  </transition>
                </div>
              </div>
              <div>
                <textarea
                  v-model="form.message"
                  rows="5"
                  :placeholder="t('contacts.messagePlaceholder')"
                  :class="[
                    'w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 outline-none transition-all placeholder:text-gray-400 resize-none',
                    errors.message ? 'ring-2 ring-red-500/20' : 'focus:ring-orange-500/20'
                  ]"
                ></textarea>
                <div class="h-6 mt-1 ml-2">
                  <transition name="fade">
                    <span v-if="errors.message" class="text-red-500 text-xs font-medium">
                      {{ errors.message }}
                    </span>
                  </transition>
                </div>
              </div>
              
              <div class="pt-2">
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
