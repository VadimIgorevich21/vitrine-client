<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import logoUrl from '@/assets/img/logo-sidebar.png'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import logo from "@/assets/img/logo.png";
import { RouterLink } from "vue-router";

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
    icon: `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1953 8.19543C10.4557 7.93508 10.8777 7.93508 11.138 8.19543L13.8047 10.8621C14.065 11.1224 14.065 11.5445 13.8047 11.8048L11.138 14.4715C10.8777 14.7318 10.4557 14.7318 10.1953 14.4715C9.93496 14.2111 9.93496 13.7891 10.1953 13.5288L11.724 12.0001H2.66667C2.29848 12.0001 2 11.7016 2 11.3334C2 10.9653 2.29848 10.6668 2.66667 10.6668H11.724L10.1953 9.13813C9.93496 8.87778 9.93496 8.45577 10.1953 8.19543ZM4.86198 1.52876C5.12233 1.26841 5.54434 1.26841 5.80469 1.52876C6.06504 1.78911 6.06504 2.21112 5.80469 2.47147L4.27604 4.00011H13.3333C13.7015 4.00011 14 4.29859 14 4.66678C14 5.03497 13.7015 5.33345 13.3333 5.33345H4.27604L5.80469 6.86209C6.06504 7.12244 6.06504 7.54445 5.80469 6.86209C6.06504 7.12244 6.06504 7.54445 5.80469 7.8048C5.54434 8.06515 5.12233 8.06515 4.86198 7.8048L2.19531 5.13813C1.93496 4.87778 1.93496 4.45577 2.19531 4.19543L4.86198 1.52876Z" fill="currentColor"/>
    </svg>`
  },
  {
    name: 'transactions',
    path: '/cabinet/orders',
    icon: `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.00016 1.33301C9.3187 1.33301 10.6076 1.72416 11.7039 2.45671C12.8002 3.18923 13.6551 4.23012 14.1597 5.44824C14.6643 6.66642 14.7958 8.00725 14.5386 9.30046C14.2813 10.5936 13.6467 11.7816 12.7144 12.7139C11.7821 13.6462 10.5941 14.2808 9.30094 14.5381C8.00774 14.7953 6.6669 14.6638 5.44873 14.1592C4.23061 13.6546 3.18972 12.7997 2.45719 11.7035C1.72465 10.6071 1.3335 9.31822 1.3335 7.99967C1.3335 7.63148 1.63197 7.33301 2.00016 7.33301C2.36835 7.33301 2.66683 7.63148 2.66683 7.99967C2.66683 9.05451 2.97988 10.0855 3.56592 10.9626C4.15193 11.8396 4.98467 12.5231 5.95915 12.9268C6.93364 13.3304 8.00601 13.4365 9.04053 13.2308C10.0751 13.025 11.0258 12.517 11.7716 11.7712C12.5175 11.0253 13.0255 10.0746 13.2313 9.04004C13.437 8.00552 13.3309 6.93315 12.9272 5.95866C12.5236 4.98418 11.8401 4.15144 10.9631 3.56543C10.0864 2.97964 9.05585 2.6666 8.00147 2.66634C6.49657 2.67231 5.05221 3.25967 3.97021 4.30566L3.60954 4.66634H5.3335C5.70169 4.66634 6.00016 4.96482 6.00016 5.33301C6.00016 5.7012 5.70169 5.99967 5.3335 5.99967H2.00016C1.63197 5.99967 1.3335 5.7012 1.3335 5.33301V1.99967C1.3335 1.63148 1.63197 1.33301 2.00016 1.33301C2.36835 1.33301 2.66683 1.63148 2.66683 1.99967V3.72363L3.03532 3.35514L3.29769 3.11296C4.59511 1.97436 6.26366 1.33955 7.99756 1.33301H8.00016ZM7.3335 4.66634C7.3335 4.29815 7.63197 3.99967 8.00016 3.99967C8.36835 3.99967 8.66683 4.29815 8.66683 4.66634V7.58757L10.965 8.73665C11.2943 8.90131 11.4278 9.30187 11.2632 9.63119C11.0985 9.9605 10.698 10.094 10.3687 9.92936L7.70199 8.59603C7.47613 8.4831 7.3335 8.25219 7.3335 7.99967V4.66634Z" fill="currentColor"/>
    </svg>`
  },
  {
    name: 'account',
    path: '/account',
    icon: `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_532_2046)">
        <path d="M9.99984 6.6665C9.99984 5.56193 9.10441 4.6665 7.99984 4.6665C6.89527 4.6665 5.99984 5.56193 5.99984 6.6665C5.99984 7.77107 6.89527 8.6665 7.99984 8.6665C9.10441 8.6665 9.99984 7.77107 9.99984 6.6665ZM7.99984 9.99984C7.11578 9.99984 6.26819 10.3513 5.64307 10.9764C5.09716 11.5223 4.75942 12.2378 4.68278 12.9992C5.63304 13.6309 6.77319 13.9998 7.99984 13.9998C9.22629 13.9998 10.3661 13.6308 11.3162 12.9992C11.2396 12.2378 10.9025 11.5223 10.3566 10.9764C9.73149 10.3513 8.88389 9.99984 7.99984 9.99984ZM15.3332 7.99984C15.3332 12.0499 12.0499 15.3332 7.99984 15.3332C3.94975 15.3332 0.666504 12.0499 0.666504 7.99984C0.666504 3.94975 3.94975 0.666504 7.99984 0.666504C12.0499 0.666504 15.3332 3.94975 15.3332 7.99984ZM11.3332 6.6665C11.3332 7.68081 10.8793 8.58834 10.1646 9.19971C10.5791 9.4168 10.963 9.69604 11.3 10.033C11.8527 10.5858 12.2517 11.2634 12.4712 11.9992C13.4213 10.9377 13.9998 9.53658 13.9998 7.99984C13.9998 4.68613 11.3135 1.99984 7.99984 1.99984C4.68613 1.99984 1.99984 4.68613 1.99984 7.99984C1.99984 9.53642 2.57789 10.9377 3.52783 11.9992C3.74735 11.2634 4.1469 10.5859 4.69971 10.033C5.03657 9.69618 5.4201 10.5859 4.69971 10.033C5.03657 9.69618 5.4201 9.41676 5.83447 9.19971C5.11993 8.58834 4.6665 7.68063 4.6665 6.6665C4.6665 4.82555 6.15889 3.33317 7.99984 3.33317C9.84079 3.33317 11.3332 4.82555 11.3332 6.6665Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_532_2046">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>`
  }
]

const footerLinks = [
  { name: 'terms', path: '/terms' },
  { name: 'refund', path: '/refund' },
  { name: 'contact', path: '/contacts' }
]

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <aside 
    class="fixed cabinet-sidebar inset-y-0 left-0 z-50 w-[280px] bg-[#0F1116] text-gray-400 flex flex-col transition-transform lg:translate-x-0 lg:static lg:block"
    :class="isMobileOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex flex-col h-full p-6">
      <!-- Close Button (Mobile) -->
      <button @click="$emit('close')" class="lg:hidden absolute top-8 right-6 text-gray-400 hover:text-white transition-colors duration-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Logo -->
      <div class="sidebar-logo mt-6 mb-10">
        <RouterLink to="/" class="flex items-center">
          <img :src="logoUrl" alt="IronBit Logo" />
        </RouterLink>
      </div>

      <!-- Main Menu -->
      <nav class="space-y-1 flex-1">
        <RouterLink 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          custom
          v-slot="{ isActive, isExactActive, navigate, href }"
        >
          <a 
            :href="href"
            @click="navigate"
            class="flex items-center gap-3 py-3 rounded-xl transition-all hover:text-white group"
            :class="(item.exact ? isExactActive : isActive) ? 'text-white font-medium' : ''"
          >
            <span v-html="item.icon" :class="(item.exact ? isExactActive : isActive) ? 'text-[#F6851B]' : 'opacity-70 group-hover:opacity-100'"></span>
            <span>{{ t(`cabinet.sidebar.${item.name}`) }}</span>
          </a>
        </RouterLink>
      </nav>

      <!-- Bottom Menu -->
      <div class="space-y-4 pt-4 mt-auto">
        <!-- Language Switcher Wrapper to match menu look -->
        <div class="hover:text-white transition-colors">
          <LanguageSwitcher class="sidebar-language-switcher" />
        </div>

        <!-- Logout -->
        <button 
          @click="handleLogout"
          class="flex cursor-pointer items-center mb-6 gap-3 py-2 hover:text-white transition-colors w-full text-left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-70">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('cabinet.sidebar.logout') }}</span>
        </button>

        <div class="border-t border-white/5 pt-6 space-y-3">
          <RouterLink 
            v-for="link in footerLinks" 
            :key="link.path" 
            :to="link.path"
            class="cabinet-footer-link block text-xs text-gray-500 hover:text-white transition-colors"
          >
            {{ t(`cabinet.sidebar.${link.name}`) }}
          </RouterLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<style>
.cabinet-sidebar {
  color: #B0B8C6;
}

.cabinet-footer-link {
  color: #B0B8C6;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0;
}

.cabinet-footer-link:hover {
  color: #ffffff;
}

.router-link-active {
  color: #F6851B;
}

.sidebar-language-switcher .lang-switcher__btn svg {
  margin-right: 10px;
}

.sidebar-logo {
  padding-left: 14px;
}
</style>
