<script setup lang="ts">
import PublicHeader from "@/components/layout/PublicHeader.vue";
import PublicFooter from "@/components/layout/PublicFooter.vue";
import bgImage from "@/assets/img/background-default.png";
</script>


<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
       :style="{ backgroundImage: `url(${bgImage})` }"
       style="background-repeat: no-repeat"
  >
    <PublicHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <PublicFooter />
  </div>
</template>
