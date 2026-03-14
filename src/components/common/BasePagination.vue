<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  total: number;
  perPage: number;
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', page: number): void;
}>();

const lastPage = computed(() => {
  return props.total > props.perPage
    ? Math.ceil(props.total / props.perPage)
    : 1;
});

const setPage = (page: number) => {
  if (page >= 1 && page <= lastPage.value) {
    emit('update:modelValue', page);
  }
};
</script>

<template>
  <nav v-if="total > perPage" class="flex items-center justify-center space-x-2 py-8">
    <!-- PREVIOUS -->
    <button 
      v-if="modelValue > 1"
      @click="setPage(modelValue - 1)" 
      class="pagination-btn arrow"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="ml-1 hidden sm:inline">Назад</span>
    </button>

    <div class="flex items-center space-x-2">
      <!-- Page 1 (if far from start) -->
      <button v-if="modelValue > 3" @click="setPage(1)" class="pagination-btn">
        1
      </button>

      <!-- Dots Left -->
      <button v-if="modelValue > 4" @click="setPage(modelValue - 3)" class="pagination-dots-btn">
        ...
      </button>

      <!-- Neighbors Left -->
      <button v-if="modelValue > 2" @click="setPage(modelValue - 2)" class="pagination-btn">
        {{ modelValue - 2 }}
      </button>
      <button v-if="modelValue > 1" @click="setPage(modelValue - 1)" class="pagination-btn">
        {{ modelValue - 1 }}
      </button>

      <!-- ACTIVE -->
      <button class="pagination-btn active">
        {{ modelValue }}
      </button>

      <!-- Neighbors Right -->
      <button v-if="modelValue < lastPage - 1" @click="setPage(modelValue + 1)" class="pagination-btn">
        {{ modelValue + 1 }}
      </button>
      <button v-if="modelValue < lastPage - 2" @click="setPage(modelValue + 2)" class="pagination-btn">
        {{ modelValue + 2 }}
      </button>

      <!-- Dots Right -->
      <button v-if="modelValue < lastPage - 3" @click="setPage(modelValue + 3)" class="pagination-dots-btn">
        ...
      </button>

      <!-- Last Page -->
      <button v-if="modelValue !== lastPage" @click="setPage(lastPage)" class="pagination-btn">
        {{ lastPage }}
      </button>
    </div>

    <!-- NEXT -->
    <button 
      v-if="modelValue !== lastPage"
      @click="setPage(modelValue + 1)" 
      class="pagination-btn arrow"
    >
      <span class="mr-1 hidden sm:inline">Вперед</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #F2F2F6;
  color: #667085;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.pagination-btn:hover:not(.active) {
  background-color: #F9FAFB;
  border-color: #D0D5DD;
  color: #101828;
}

.pagination-btn.active {
  /*
  background-color: #2563EB;
  border-color: #2563EB;
  #cdcdcd
  #a6aebe
  */
  background-color: #cdcdcd;
  border-color: #cdcdcd;
  color: white;
  cursor: default;
}

.pagination-btn.arrow {
  padding: 0 16px;
  gap: 4px;
}

.pagination-dots-btn {
  color: #98A2B3;
  font-size: 14px;
  padding: 0 8px;
  cursor: pointer;
  transition: color 0.2s;
}

.pagination-dots-btn:hover {
  color: #101828;
}
</style>
