<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ExchangeForm from "@/components/orders/ExchangeForm.vue";

const { t } = useI18n()
</script>

<template>
  <div class="cabinet-page-with-exchange-form flex items-center justify-center py-10 w-full">
    <div class="max-w-2xl w-full">
      <h2 class="page-title-h2 text-center mb-6">
        {{ t('cabinet.title_buy_and_sell') }}
        <span class="text-orange-gradient"> {{ t('cabinet.title2_buy_and_sell') }}</span>
      </h2>
      <ExchangeForm />
    </div>
  </div>
</template>

<style scoped>
.cabinet-page-with-exchange-form .exchange-card{
  margin-bottom: 100px;
}
</style>