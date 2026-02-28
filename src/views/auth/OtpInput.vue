<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  error?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'complete'])

const digits = ref<string[]>(new Array(6).fill(''))
const inputs = ref<HTMLInputElement[]>([])

const handleInput = (index: number, event: Event) => {
  const val = (event.target as HTMLInputElement).value
  if (!/^\d*$/.test(val)) {
    digits.value[index] = ''
    return
  }

  const lastChar = val.slice(-1)
  digits.value[index] = lastChar

  if (lastChar && index < 5) {
    inputs.value[index + 1]?.focus()
  }

  updateValue()
}

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

const updateValue = () => {
  const fullCode = digits.value.join('')
  emit('update:modelValue', fullCode)
  if (fullCode.length === 6) emit('complete', fullCode)
}
</script>

<template>
  <div class="flex justify-between gap-2">
    <input
      v-for="(digit, i) in digits"
      :key="i"
      ref="inputs"
      v-model="digits[i]"
      type="text"
      maxlength="1"
      class="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold border rounded-lg transition-all outline-none"
      :class="[
        error
          ? 'border-red-400 bg-red-50 text-red-600'
          : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
      ]"
      @input="handleInput(i, $event)"
      @keydown="handleKeyDown(i, $event)"
    />
  </div>
</template>