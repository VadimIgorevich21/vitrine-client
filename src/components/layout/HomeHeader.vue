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
  <header class="public-header py-4 px-4 sm:px-6 lg:px-8">
    <div class="default-container">
      <div class="home-page-header header-container backdrop-blur-sm px-6 h-16 flex justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center">
          <img :src="logo" alt="IronBit" class="h-8 w-auto" />
        </RouterLink>

        <!-- Navigation (Center) -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="/#how-it-works" class="header-nav-link transition-colors">{{ t('header.howItWorks') }}</a>
          <a href="/#support" class="header-nav-link transition-colors">{{ t('header.contactUs') }}</a>
        </nav>

        <!-- Right Side: Lang + Sign In -->
        <div class="flex items-center gap-4">
          <LanguageSwitcher class="home-page-lang-switcher" />

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
  position: relative;
  z-index: 50;
}

.header-container {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.signin-btn {
  /* Matching the greyish button color from the design */
  /* background-color: #9BA5B7; */
  background: linear-gradient(275.09deg, #C8CCD4 2.73%, #AEB3BF 48.28%, #929AAA 95.62%);
}

.signin-btn:hover {
  filter: brightness(1.1); /* Слегка осветляем всю кнопку */
  cursor: pointer;
}

.home-page-header {
  border-radius: 16777200px;
  border-width: 1px;
}

.home-page-header::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;

  background:
    linear-gradient(
      45deg,
      rgba(0,0,0,0.85) 0%,
      rgba(200,200,200,0.6) 5%,
      rgba(200,200,200,0.6) 95%,
      rgba(0,0,0,0.85) 100%
    ),
    linear-gradient(
      45deg,
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.9) 100%
    );

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;

  pointer-events: none;
}

.home-page-header .header-nav-link {
  color: #B0B8C6;
}
.home-page-header .header-nav-link:hover {
  color: #E0E4EB;
  transition: color 0.2s;
}

.home-page-lang-switcher {
  color: #B0B8C6;
}

.home-page-lang-switcher:hover {
  color: #E0E4EB;
  transition: color 0.2s;
}

</style>
