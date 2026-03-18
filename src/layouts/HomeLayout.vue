<script setup lang="ts">
import HomeHeader from "@/components/layout/HomeHeader.vue";
import PublicFooter from "@/components/layout/PublicFooter.vue";
import bgImage from "@/assets/img/background.png";
</script>


<template>
  <div class="home-page home-page-bg min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
       :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <HomeHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <PublicFooter />
  </div>
</template>


<style scoped>
/* ── Page ──────────────────────────────────────────────── */
.home-page {
  background-size:contain;
  background-color: #ffffff;
  background-position: center top;
  background-position: 0 -100px;
  background-repeat: no-repeat;
  font-family: 'Inter', system-ui, sans-serif;
}

@media (max-width: 1366px) {
  .home-page {
    background-size: auto;
  }
}
</style>