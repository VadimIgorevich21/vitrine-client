<script setup lang="ts">
defineProps<{
  loading?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    class="base-btn"
  >
    <span v-if="loading" class="spinner" />
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #f97316 0%, #ea580c 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: opacity 0.15s;
}

.base-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>