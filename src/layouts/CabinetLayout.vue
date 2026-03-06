<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import KycBanner from '@/components/common/KycBanner.vue'
import { useAuthStore } from '@/stores/authStore'
import { computed, ref } from 'vue'
import logoUrl from '@/assets/img/logo.png'

const authStore = useAuthStore()
const showKycBanner = computed(() => authStore.user?.kyc_verified !== true)

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen flex bg-[#F8F9FA] relative">
    <!-- Sidebar Overlay (Mobile) -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <Sidebar :is-mobile-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-h-screen w-full">
      <!-- Mobile Header -->
      <header class="lg:hidden bg-[#0F1116] text-white p-4 flex items-center justify-between sticky top-0 z-30">
        <img :src="logoUrl" alt="IronBit Logo" class="h-6 w-auto" />
        <button @click="toggleMobileMenu" class="p-2 text-gray-400 hover:text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </header>

      <!-- Top Padding / Banner Area -->
      <div v-if="showKycBanner" class="p-4 lg:p-6 lg:pb-0">
        <KycBanner />
      </div>

      <!-- Main Content -->
      <main class="flex-1 p-4 lg:p-10">
        <div class="max-w-6xl mx-auto">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
