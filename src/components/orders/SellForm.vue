<template>
  <div class="space-y-6">
    <!-- Payment Method -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{{ $t('orders.exchange.receivingMethod') }}</label>
      <UniversalSelect 
        v-model="formStore.state.payment_method"
        :items="currentPaymentMethods"
        itemKey="key"
        labelPath="label"
        iconPath="icon"
        :placeholder="$t('orders.exchange.selectMethod')"
      />
    </div>

    <!-- Give (Crypto) -->
    <div class="space-y-2">
      <div class="flex justify-between px-1 h-4">
        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ $t('orders.exchange.youGive') }}</label>
        <div v-if="configStore.loading" class="w-24 h-3 bg-gray-100 dark:bg-gray-700 animate-pulse rounded"></div>
        <span v-else-if="formStore.currentRate" class="text-xs font-medium text-blue-500">
          1 {{ formStore.state.from_currency }} ≈ {{ formStore.currentRate.final_rate }}
        </span>
      </div>

      <div v-if="configStore.loading" class="h-20 bg-gray-50 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
      <div v-else :class="['flex items-center bg-gray-50 dark:bg-gray-900 border-2 rounded-2xl p-2 transition-all',
                    !formStore.isAmountValid ? 'border-red-200 bg-red-50' : 'border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-800']">
        <input
          type="number"
          v-model.number="formStore.state.amount_from"
          @input="formStore.calculateTo"
          class="flex-1 bg-transparent border-none p-2 text-2xl font-bold outline-none no-spinner dark:text-white"
          placeholder="0.00"
        />
        <UniversalSelect 
          v-model="formStore.state.from_currency" 
          :items="availableFromList"
          itemKey="code"
          labelPath="code"
          sublabelPath="title"
          iconPath="icon"
          rounded
          class="w-auto"
        />
      </div>
      <p v-if="!formStore.isAmountValid" class="text-red-500 text-xs font-bold px-2 italic">
        {{ $t('orders.exchange.minimum') }} {{ formStore.currentRate?.min_amount }} {{ formStore.state.from_currency }}
      </p>
    </div>

    <!-- Get (Fiat) -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{{ $t('orders.exchange.youGet') }}</label>
      <div v-if="configStore.loading" class="h-20 bg-gray-50 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
      <div v-else class="flex items-center bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-800 rounded-2xl p-2 transition-all">
        <input
          type="number"
          v-model.number="formStore.state.amount_to"
          @input="formStore.calculateFrom"
          class="flex-1 bg-transparent border-none p-2 text-2xl font-bold text-blue-600 dark:text-blue-400 outline-none no-spinner"
          placeholder="0.00"
        />
        <UniversalSelect 
          v-model="formStore.state.to_currency" 
          :items="availableToList"
          itemKey="code"
          labelPath="code"
          sublabelPath="title"
          iconPath="icon"
          rounded
          @change="formStore.calculateTo"
          class="w-auto"
        />
      </div>
    </div>

    <!-- Requisites Fields (Sell only) -->
    <div v-if="authStore.user && !configStore.loading" class="pt-6 border-t border-dashed dark:border-gray-600 space-y-4">
      <textarea v-model="formStore.state.user_requisites" :placeholder="$t('orders.exchange.userRequisites')"
                class="w-full p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" rows="2"></textarea>
    </div>

    <!-- Errors -->
    <div v-if="apiErrors" class="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium">
      <ul class="list-disc px-4">
        <li v-for="(err, field) in apiErrors" :key="field">{{ err[0] }}</li>
      </ul>
    </div>

    <!-- Submit Button -->
    <button
      v-if="!configStore.loading"
      @click="handleSubmit"
      :disabled="loading || !formStore.isAmountValid || !formStore.state.amount_from"
      class="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest"
    >
      <span v-if="loading">{{ $t('orders.exchange.processing') }}</span>
      <span v-else>{{ authStore.user ? $t('orders.exchange.createOrderSell') : $t('orders.exchange.loginAndExchange') }}</span>
    </button>
    <div v-else class="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderFormStore } from '@/stores/useOrderFormStore';
import { useConfigStore } from '@/stores/syncConfigs';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import UniversalSelect from '@/components/common/UniversalSelect.vue';

const formStore = useOrderFormStore();
const configStore = useConfigStore();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const { t } = useI18n();

const loading = ref(false);
const apiErrors = ref<any>(null);

const availableFromList = computed(() => configStore.cryptoCurrencies);
const availableToList = computed(() => {
  const from = formStore.state.from_currency;
  const codes = configStore.directions[from] ?? [];
  return configStore.fiatCurrencies.filter(c => codes.includes(c.code));
});

const currentPaymentMethods = computed(() => configStore.sellPaymentMethods);

const handleSubmit = async () => {
  if (!authStore.user) {
    formStore.persist();
    router.push({ name: 'login', query: { redirect: '/cabinet' } });
    return;
  }

  loading.value = true;
  apiErrors.value = null;

  try {
    const res = await formStore.submitOrder();
    const { action, fields } = res.payment

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = action

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = String(value)
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()

    toast.success(t("orders.exchange.orderCreated"));
    formStore.resetForm();
    router.push({ name: 'order-details', params: { id: res.data.id } });
  } catch (err: any) {
    if (err.response?.status === 422) {
      apiErrors.value = err.response.data.errors;
      toast.error(t("orders.exchange.checkInput"));
    } else {
      toast.error(t("orders.exchange.errorCreatingOrder"));
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  formStore.state.type = 'sell';
  formStore.initDefaultValues();
});
</script>

<style scoped>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.no-spinner {
  -moz-appearance: textfield;
  appearance: textfield;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
