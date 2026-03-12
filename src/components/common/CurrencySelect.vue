<template>
  <div class="relative inline-block text-left w-full" ref="container">
    <!-- Selected Item Button -->
    <div 
      @click="isOpen = !isOpen"
      class="flex items-center justify-between bg-white dark:bg-gray-800 border shadow-sm rounded-xl px-4 py-2 font-bold text-gray-700 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
    >
      <div class="flex items-center">
        <img v-if="selectedCurrency?.icon" :src="getIconPath(selectedCurrency.icon)" class="w-5 h-5 rounded-full mr-2 object-cover" />
        <span>{{ modelValue || 'Select' }}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 transition-transform" :class="{'rotate-180': isOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isOpen" 
        class="absolute z-50 mt-2 w-full min-w-[280px] right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <!-- Search -->
        <div class="p-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              ref="searchInput"
              type="text"
              placeholder="Поиск валюты..."
              class="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-900 border-2 border-[#FFD200] rounded-xl outline-none text-sm font-medium dark:text-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- List -->
        <div class="max-h-64 overflow-y-auto custom-scrollbar">
          <div 
            v-for="currency in filteredCurrencies" 
            :key="currency.code"
            @click="selectCurrency(currency)"
            class="flex items-center px-4 py-3 cursor-pointer transition-colors"
            :class="[
              modelValue === currency.code ? 'bg-gray-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            ]"
          >
            <div class="w-8 h-8 flex items-center justify-center mr-3 bg-gray-50 dark:bg-gray-900 rounded-full overflow-hidden">
               <img v-if="currency.icon" :src="getIconPath(currency.icon)" class="w-6 h-6 object-contain" />
               <span v-else class="text-xs font-bold text-gray-400">{{ currency.code.substring(0, 1) }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-black text-gray-900 dark:text-white">{{ currency.code }}</span>
              <span class="text-gray-400 font-medium">{{ currency.title }}</span>
            </div>
            <div v-if="modelValue === currency.code" class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div v-if="filteredCurrencies.length === 0" class="px-4 py-8 text-center text-gray-400 text-sm">
            Ничего не найдено
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import type { Currency } from '@/types/config';

const props = defineProps<{
  modelValue: string;
  currencies: Currency[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const container = ref<HTMLElement | null>(null);

const selectedCurrency = computed(() => {
  return props.currencies.find(c => c.code === props.modelValue);
});

const filteredCurrencies = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return props.currencies;
  return props.currencies.filter(c => 
    c.code.toLowerCase().includes(query) || 
    c.title.toLowerCase().includes(query)
  );
});

const selectCurrency = (currency: Currency) => {
  emit('update:modelValue', currency.code);
  isOpen.value = false;
  searchQuery.value = '';
};

const getIconPath = (path: string) => {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
};

const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4a5568;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
