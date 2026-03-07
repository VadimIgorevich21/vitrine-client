<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import logoUrl from '@/assets/img/logo.png'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

defineProps<{
  isMobileOpen?: boolean
}>()

defineEmits(['close'])

const { t } = useI18n()
const authStore = useAuthStore()

const menuItems = [
  {
    name: 'trade_crypto',
    path: '/cabinet',
    exact: true,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 14L12 9L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    name: 'transactions',
    path: '/cabinet/orders',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 3V5M12 19V21M3 12H5M19 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    name: 'account',
    path: '/cabinet/account',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
]

const footerLinks = [
  { name: 'terms', path: '/terms' },
  { name: 'refund', path: '/refund' },
  { name: 'contact', path: '/contact' }
]

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0F1116] text-gray-400 flex flex-col transition-transform lg:translate-x-0 lg:static lg:block"
    :class="isMobileOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex flex-col h-full p-6">
      <!-- Close Button (Mobile) -->
      <button @click="$emit('close')" class="lg:hidden absolute top-6 right-6 text-gray-400 hover:text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Logo -->
      <div class="mb-10 px-2">
        <img :src="logoUrl" alt="IronBit Logo" class="h-9 w-auto" />
      </div>

      <!-- Main Menu -->
      <nav class="space-y-1 flex-1">
        <RouterLink 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-2 py-3 rounded-xl transition-all hover:text-white"
          active-class="text-white font-medium"
          :exact-active-class="item.exact ? 'text-white font-medium' : ''"
        >
          <span v-html="item.icon" class="opacity-70"></span>
          <span>{{ t(`cabinet.sidebar.${item.name}`) }}</span>
        </RouterLink>
      </nav>

      <!-- Bottom Menu -->
      <div class="space-y-4 pt-4 mt-auto">
        <!-- Language Switcher Wrapper to match menu look -->
        <div class="px-2 py-2 hover:text-white transition-colors">
          <LanguageSwitcher />
        </div>

        <!-- Logout -->
        <button 
          @click="handleLogout"
          class="flex items-center gap-3 px-2 py-2 hover:text-white transition-colors w-full text-left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-70">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('cabinet.sidebar.logout') }}</span>
        </button>

        <div class="border-t border-white/5 pt-4 space-y-3 px-4">
          <RouterLink 
            v-for="link in footerLinks" 
            :key="link.path" 
            :to="link.path"
            class="block text-xs text-gray-500 hover:text-white transition-colors"
          >
            {{ t(`cabinet.sidebar.${link.name}`) }}
          </RouterLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.router-link-active {
  color: #F6851B;
}
</style>
