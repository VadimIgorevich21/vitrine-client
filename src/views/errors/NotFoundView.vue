<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        404 - Not Found
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <router-link
        to="/"
        class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors inline-block"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>
