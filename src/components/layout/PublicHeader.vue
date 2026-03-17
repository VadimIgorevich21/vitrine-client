<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import logo from "@/assets/img/logo.png";

const { t } = useI18n()
const authStore = useAuthStore()
</script>

<template>
  <header class="public-header default-wrapper">
    <div class="default-container">
      <div class="header-container bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-[100px] px-6 h-16 flex justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center">
          <img :src="logo" alt="IronBit" class="logo-img" />
        </RouterLink>

        <!-- Navigation (Center) -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="/#how-it-works" class="header-nav-link transition-colors">{{ t('header.howItWorks') }}</a>
          <a href="/#support" class="header-nav-link transition-colors">{{ t('header.contactUs') }}</a>
        </nav>

        <!-- Right Side: Lang + Sign In -->
        <div class="flex items-center gap-4">
          <LanguageSwitcher class="public-pages-lang-switcher" />

          <template v-if="authStore.loggedIn">
            <RouterLink
              to="/cabinet"
              class="signin-btn text-white px-6 py-2 rounded-[100px] text-sm font-medium transition-colors"
            >
              {{ t('cabinet.title') }}
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              to="/auth"
              class="signin-btn text-white px-6 py-2 rounded-[100px] text-sm font-medium transition-colors"
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
.public-header {
  margin-top: 30px;
}

.logo-img {
  height: 2rem;  /* h-8 */
  width: auto;   /* w-auto */
}

.header-container {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.signin-btn {
  /* Matching the greyish button color from the design */
  //background-color: #9BA5B7;
  background: linear-gradient(275.09deg, #C8CCD4 2.73%, #AEB3BF 48.28%, #929AAA 95.62%);
}

.signin-btn:hover {
  filter: brightness(1.1); /* Слегка осветляем всю кнопку */
  cursor: pointer;
}

.header-nav-link {
  color: #929AAA;
}
.header-nav-link:hover {
  color: #7A8290;
  transition: color 0.2s;
}

.public-pages-lang-switcher {
  color: #929AAA;
}

.public-pages-lang-switcher:hover {
  color: #7A8290;
  transition: color 0.2s;
}

@media screen and (max-width: 400px) {
  .public-header {
    padding: 5px;
  }

  .logo-img {
    max-width: 80px;
    height: auto;
  }
}
</style>
