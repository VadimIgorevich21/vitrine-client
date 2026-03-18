<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import logo from "@/assets/img/logo.png"

const { t } = useI18n()

</script>

<template>
  <footer class="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 mt-auto">
    <div class="default-container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-y-12 mb-16">
        <!-- Column 1: Logo & Description -->
        <div class="col-span-2 md:col-span-1 space-y-6">
          <RouterLink to="/" class="flex items-center">
            <img :src="logo" alt="IronBit" class="h-8 w-auto" />
          </RouterLink>
          <p class="text-sm text-gray-400 leading-relaxed footer-description">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Column 2: Platform -->
        <div class="col-span-1">
          <h3 class="font-semibold mb-2 md:mb-6">{{ t('footer.platform') }}</h3>
          <ul class="space-y-2 md:space-y-4 text-sm text-gray-400">
            <li><a href="/#platform" class="hover:text-white transition-colors">{{ t('footer.buyCrypto') }}</a></li>
            <li><a href="/#platform" class="hover:text-white transition-colors">{{ t('footer.sellCrypto') }}</a></li>
            <li><a href="/#how-it-works" class="hover:text-white transition-colors">{{ t('footer.howItWorks') }}</a></li>
            <li><a href="/#support" class="hover:text-white transition-colors">{{ t('footer.contactUs') }}</a></li>
          </ul>
        </div>

        <!-- Column 3: Legal -->
        <div class="col-span-1">
          <h3 class="font-semibold mb-2 md:mb-6">{{ t('footer.legal') }}</h3>
          <ul class="space-y-2 md:space-y-4 text-sm text-gray-400">
            <li><RouterLink to="/terms" class="hover:text-white transition-colors">{{ t('footer.terms') }}</RouterLink></li>
            <li><RouterLink to="/privacy-policy" class="hover:text-white transition-colors">{{ t('footer.privacy') }}</RouterLink></li>
            <li><RouterLink to="/refund-policy" class="hover:text-white transition-colors">{{ t('footer.refundPolicy') }}</RouterLink></li>
            <li><RouterLink to="/risk-disclosure-policy" class="hover:text-white transition-colors">{{ t('footer.riskDisclosure') }}</RouterLink></li>
            <li><RouterLink to="/aml-and-kyc-policy" class="hover:text-white transition-colors">{{ t('footer.amlKyc') }}</RouterLink></li>
          </ul>
        </div>

        <!-- Column 4: Company Details -->
        <div class="col-span-2 md:col-span-1">
          <h3 class="font-semibold mb-2 md:mb-6">{{ t('footer.companyDetails') }}</h3>
          <div class="space-y-1 text-sm text-gray-400">
            <p>IRONBIT Sp. z o.o.</p>
            <p>KRS: 0001013919</p>
            <p>NIP: 5252939713</p>
            <p>REGON: 524214646</p>
            <p class="mt-4">{{ t('footer.address') }}</p>
            <p>{{ t('footer.city') }}</p>
            <a href="mailto:info@ironbit.io" class="text-orange-400 hover:text-orange-300 transition-colors mt-2 block font-medium">info@ironbit.io</a>
          </div>
        </div>
      </div>

      <!-- Bottom: Copyright -->
      <div class="pt-8 border-t border-gray-800 text-xs text-gray-500">
        <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-description {
  max-width: 260px;
}

@media (max-width: 768px) {
  .footer-description {
    max-width: 100%;
  }
}
</style>
