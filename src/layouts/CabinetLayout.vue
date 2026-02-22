<script setup lang="ts">
import CabinetHeader from '@/components/layout/CabinetHeader.vue'
import CabinetFooter from '@/components/layout/CabinetFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <CabinetHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <CabinetFooter />
  </div>
</template>
