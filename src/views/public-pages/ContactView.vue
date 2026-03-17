<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { apiClient } from '@/services/api.ts'
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
const wasAttempted = ref(false)
const touched = ref({
  email: false,
  message: false
})

const validate = () => {
  errors.value.email = ''
  errors.value.message = ''

  // If both fields are empty, don't show any errors
  if (!form.value.email && !form.value.message && !wasAttempted.value) {
    return false
  }

  let isValid = true

  if (!form.value.email) {
    errors.value.email = t('contacts.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = t('contacts.emailInvalid')
    isValid = false
  }

  if (!form.value.message) {
    errors.value.message = t('contacts.messageRequired')
    isValid = false
  }

  return isValid
}

// Reactively validate if the user already tried to submit or touched the field
watch([() => form.value.email, () => form.value.message], () => {
  if (wasAttempted.value || touched.value.email || touched.value.message) {
    validate()
  }
})

const isFormInvalid = computed(() => {
  if (!form.value.email || !form.value.message) return true
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) return true
  return false
})

const handleSubmit = async () => {
  wasAttempted.value = true
  touched.value.email = true
  touched.value.message = true
  
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
    wasAttempted.value = false
    touched.value.email = false
    touched.value.message = false
  } catch (error) {
    console.error('Contact form error:', error)
    toast.error(t('contacts.errorMessage'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="public-layout-content">
    <div class="default-container">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">
        <!-- Left Side: Content -->
        <div class="flex-1 max-w-[555px]">
          <h1 class="page-title-h1 mb-4">
            {{ t('contacts.title1') }}
          </h1>
          <div class="mb-10">
            <span class="page-subtitle-gradient">{{ t('contacts.title2') }}</span>
          </div>
          <p class="page-content-text mb-10 max-w-[555px]">
            {{ t('contacts.description') }}
          </p>
          <a
            href="mailto:info@ironbit.io"
            class="page-orange-link font-20px transition-colors"
          >
            {{ t('contacts.email') }}
          </a>
        </div>

        <!-- Right Side: Form Card -->
        <div class="w-full max-w-[500px]">
          <div class="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
            <h2 class="page-title-h2 text-2xl font-bold text-gray-900 mb-4">
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
                    errors.email && (touched.email || wasAttempted) ? 'ring-2 ring-red-500/20' : 'focus:ring-orange-500/20'
                  ]"
                  @blur="touched.email = true; validate()"
                />
                <div class="h-6 mt-1 ml-2">
                  <transition name="fade">
                    <span v-if="errors.email && (touched.email || wasAttempted)" class="text-red-500 text-xs font-medium">
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
                    errors.message && (touched.message || wasAttempted) ? 'ring-2 ring-red-500/20' : 'focus:ring-orange-500/20'
                  ]"
                  @blur="touched.message = true; validate()"
                ></textarea>
                <div class="h-6 mt-1 ml-2">
                  <!-- Error message removed as per user request (button is disabled instead) -->
                </div>
              </div>
              
              <div class="pt-2">
                <BaseButton 
                  type="submit" 
                  :disabled="isFormInvalid"
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
