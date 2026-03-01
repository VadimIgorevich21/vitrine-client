<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import logo from "@/assets/img/logo.png";

const { t } = useI18n()
const authStore = useAuthStore()

const displayName = computed(() => {
  const u = authStore.user
  if (!u) return ''
  return (u.name as string) || (u.email as string) || t('header.userDefault')
})
</script>

<template>
  <header class="py-4 px-4 sm:px-6 lg:px-8">
    <div class="default-container">
      <div class="header-container bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-[100px] px-6 h-16 flex justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center">
          <img :src="logo" alt="IronBit" class="h-8 w-auto" />
        </RouterLink>

        <!-- Navigation (Center) -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#" class="hover:text-blue-600 transition-colors">{{ t('header.howItWorks') }}</a>
          <a href="#" class="hover:text-blue-600 transition-colors">{{ t('header.contactUs') }}</a>
        </nav>

        <!-- Right Side: Lang + Sign In -->
        <div class="flex items-center gap-4">
          <LanguageSwitcher />

          <template v-if="authStore.loggedIn">
            <RouterLink
              to="/cabinet"
              class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
            >
              {{ displayName }}
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              to="/auth"
              class="signin-btn bg-[#9BA5B7] hover:bg-[#8A94A6] text-white px-6 py-2 rounded-[100px] text-sm font-medium transition-colors"
            >
              {{ t('header.login') }}
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.signin-btn {
  /* Matching the greyish button color from the design */
  background-color: #9BA5B7;
}

.signin-btn:hover {
  background-color: #8A94A6;
}
</style>
