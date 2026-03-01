<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Ошибка: строка, массив сообщений или объект Laravel-style { message?, errors?: { [field]: string[] } } */
    error: string | string[] | Record<string, unknown> | null
    /** Не показывать отступ сверху (для размещения под инпутом без лишнего margin) */
    noMargin?: boolean
  }>(),
  { noMargin: false }
)

const text = computed(() => {
  const e = props.error
  if (e == null) return ''
  if (typeof e === 'string') return e
  if (Array.isArray(e)) return e[0] ? String(e[0]) : ''
  if (typeof e === 'object') {
    if ('message' in e && typeof (e as { message: unknown }).message === 'string') {
      return (e as { message: string }).message
    }
    if ('errors' in e && typeof (e as { errors: unknown }).errors === 'object') {
      const errors = (e as { errors: Record<string, string[]> }).errors
      const firstKey = Object.keys(errors)[0]
      const arr = firstKey ? errors[firstKey] : null
      return Array.isArray(arr) && arr[0] ? String(arr[0]) : ''
    }
    // Прямой объект вида { otp: ["msg"] }
    const firstKey = Object.keys(e)[0]
    const val = firstKey ? (e as Record<string, unknown>)[firstKey] : null
    if (Array.isArray(val) && val[0]) return String(val[0])
  }
  return ''
})
</script>

<template>
  <Transition name="form-error">
    <div
      v-if="text"
      role="alert"
      class="form-error"
      :class="{ 'form-error--no-margin': noMargin }"
    >
      {{ text }}
    </div>
  </Transition>
</template>

<style scoped>
.form-error {
  /* font-size: 0.8125rem; */
  color: #EC4899;
}

.dark .form-error {
  color: #f87171;
}

.form-error--no-margin {
  margin-top: 0;
}

.form-error-enter-active,
.form-error-leave-active {
  transition: opacity 0.2s ease;
}

.form-error-enter-from,
.form-error-leave-to {
  opacity: 0;
}
</style>
