<template>
  <div class="space-y-6">
    <div v-if="step === 1" class="space-y-6">
      <!-- Payment Method Selector -->
      <div v-if="currentPaymentMethods.length > 1" class="space-y-2">
        <UniversalSelect 
          v-model="formStore.state.payment_method"
          :items="currentPaymentMethods"
          itemKey="key"
          labelPath="label"
          iconPath="icon"
          :placeholder="$t('orders.exchange.selectMethod')"
          class="!border-none !shadow-none !p-0"
        />
      </div>
      <div v-else-if="currentPaymentMethods.length === 1" class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl">
        <div class="w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <img v-if="currentPaymentMethods[0]?.icon" :src="currentPaymentMethods[0].icon.startsWith('/') ? currentPaymentMethods[0].icon : `/${currentPaymentMethods[0].icon}`" class="w-4 h-4 object-contain" />
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <span class="text-sm font-medium text-gray-500">{{ currentPaymentMethods[0]?.label }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Give (Fiat) -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{{ $t('orders.exchange.youGive') }}</label>
        <div v-if="configStore.loading" class="h-20 bg-gray-50 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
        <div v-else :class="['flex items-center bg-gray-50 dark:bg-gray-900 border-2 rounded-2xl px-2 py-1 transition-all',
                      !formStore.isAmountValid ? 'border-indigo-500 bg-white dark:bg-gray-800' : 'border-transparent focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-gray-800']">
          <input
            type="number"
            v-model.number="formStore.state.amount_from"
            @input="formStore.calculateTo"
            class="flex-1 min-w-0 bg-transparent border-none p-2 text-xl md:text-2xl font-bold outline-none no-spinner dark:text-white"
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
            borderless
            class="shrink-0 ml-2"
          />
        </div>
      </div>

      <!-- Get (Crypto) -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{{ $t('orders.exchange.youGet') }}</label>
        <div v-if="configStore.loading" class="h-20 bg-gray-50 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
        <div v-else class="flex items-center bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-gray-800 rounded-2xl px-2 py-1 transition-all">
          <input
            type="number"
            v-model.number="formStore.state.amount_to"
            @input="formStore.calculateFrom"
            class="flex-1 min-w-0 bg-transparent border-none p-2 text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-500 outline-none no-spinner"
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
            borderless
            @change="formStore.calculateTo"
            class="shrink-0 ml-2"
          />
        </div>
      </div>

      <!-- Rate and Fee Info -->
      <div class="flex justify-between items-center px-1">
        <div v-if="formStore.currentRate" class="flex items-center space-x-2">
          <div class="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin-slow"></div>
          <span class="text-xs font-semibold text-gray-400">
            1 {{ formStore.state.to_currency }} ≈ {{ formStore.currentRate.final_rate }} {{ formStore.state.from_currency }}
          </span>
        </div>
        <div class="text-xs font-semibold text-gray-400">
          Fee: 25 {{ formStore.state.from_currency }} (0.5%)
        </div>
      </div>

      <!-- Continue Button / Minimum Error -->
      <button
        v-if="!configStore.loading"
        @click="step = 2"
        :disabled="loading || !formStore.state.amount_from || formStore.state.amount_from === 0"
        :class="['w-full py-5 font-bold rounded-[24px] shadow-lg transition-all active:scale-[0.98] text-lg cursor-pointer',
                 !formStore.isAmountValid 
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' 
                  : 'bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white hover:opacity-90 shadow-[0_10px_30px_rgba(255,107,0,0.3)]',
                 (!formStore.state.amount_from || formStore.state.amount_from === 0) ? 'opacity-50' : '']"
      >
        <span v-if="!formStore.isAmountValid">
          {{ $t('orders.exchange.minimum') }} {{ formStore.currentRate?.min_amount }} {{ formStore.state.from_currency }}
        </span>
        <span v-else>Continue</span>
      </button>
      <div v-else class="h-16 bg-gray-50 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
    </div>

    <div v-if="step === 2" class="space-y-6">
      <!-- Step 2 Content will be defined next -->
      <div class="flex items-center justify-between">
        <button @click="step = 1" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Buy {{ formStore.state.to_currency }}</h2>
        <div class="w-10 h-10"></div>
      </div>

      <!-- Summary -->
      <div class="space-y-4 py-6">
        <div class="flex justify-between items-center text-gray-500 dark:text-gray-400">
          <span class="font-medium">You Pay</span>
          <div class="flex items-center space-x-2">
            <span class="text-lg font-bold text-gray-900 dark:text-white">{{ formStore.state.amount_from?.toLocaleString() }}</span>
            <div class="flex items-center bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-lg">
               <img v-if="selectedFromCurrencyIcon" :src="selectedFromCurrencyIcon" class="w-4 h-4 mr-1 rounded-full" />
               <span class="text-xs font-black">{{ formStore.state.from_currency }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center text-gray-500 dark:text-gray-400">
          <span class="font-medium">You Get</span>
          <div class="flex items-center space-x-2">
            <span class="text-lg font-bold text-gray-900 dark:text-white">{{ formStore.state.amount_to }}</span>
            <div class="flex items-center bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-lg">
               <img v-if="selectedToCurrencyIcon" :src="selectedToCurrencyIcon" class="w-4 h-4 mr-1 rounded-full" />
               <span class="text-xs font-black">{{ formStore.state.to_currency }}</span>
            </div>
          </div>
        </div>

        <!-- Exchange Info Step 2 -->
        <div class="flex justify-between items-center px-1 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div v-if="formStore.currentRate" class="flex items-center space-x-2">
            <div class="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin-slow"></div>
            <span class="text-[10px] font-semibold text-gray-400">
              1 {{ formStore.state.to_currency }} ≈ {{ formStore.currentRate.final_rate }} {{ formStore.state.from_currency }}
            </span>
          </div>
          <div class="text-[10px] font-semibold text-gray-400">
            Fee: 25 {{ formStore.state.from_currency }} (0.5%)
          </div>
        </div>
      </div>

      <!-- Wallet Fields -->
      <div class="space-y-4 pt-4 border-t border-dashed dark:border-gray-700">
        <div class="space-y-2">
           <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Network</label>
           <UniversalSelect 
             v-model="formStore.state.wallet_type" 
             :items="configStore.walletTypes"
             itemKey="key"
             labelPath="label"
             :placeholder="$t('orders.exchange.selectNetwork')"
           />
        </div>
        <div class="space-y-2">
           <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Receiving wallet</label>
           <input v-model="formStore.state.wallet_address" placeholder="Enter wallet address"
                  class="w-full p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500 transition" />
        </div>
      </div>

      <!-- Final Submit Button -->
      <button
        @click="handleSubmit"
        :disabled="loading || !formStore.state.wallet_type || !formStore.state.wallet_address"
        :class="['w-full py-5 font-bold rounded-[24px] shadow-lg transition-all active:scale-[0.98] text-lg cursor-pointer',
                 (!formStore.state.wallet_type || !formStore.state.wallet_address)
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-none opacity-50' 
                  : 'bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white hover:opacity-90 shadow-[0_10px_30px_rgba(255,107,0,0.3)]']"
      >
        <span v-if="loading">{{ $t('orders.exchange.processing') }}</span>
        <span v-else-if="!formStore.state.wallet_type || !formStore.state.wallet_address">Please provide Receiving Wallet</span>
        <span v-else>{{ $t('orders.exchange.createOrder') }}</span>
      </button>
    </div>

    <!-- Errors -->
    <div v-if="apiErrors" class="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium">
      <ul class="list-disc px-4">
        <li v-for="(err, field) in apiErrors" :key="field">{{ err[0] }}</li>
      </ul>
    </div>
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

const step = ref(1);
const loading = ref(false);
const apiErrors = ref<any>(null);

const availableFromList = computed(() => configStore.fiatCurrencies);
const availableToList = computed(() => {
  const from = formStore.state.from_currency;
  const codes = configStore.directions[from] ?? [];
  return configStore.cryptoCurrencies.filter(c => codes.includes(c.code));
});

const currentPaymentMethods = computed(() => configStore.buyPaymentMethods);

const selectedFromItem = computed(() => configStore.fiatCurrencies.find(c => c.code === formStore.state.from_currency));
const selectedToItem = computed(() => configStore.cryptoCurrencies.find(c => c.code === formStore.state.to_currency));

const selectedFromCurrencyIcon = computed(() => {
  const icon = selectedFromItem.value?.icon;
  if (!icon) return null;
  return icon.startsWith('/') ? icon : `/${icon}`;
});

const selectedToCurrencyIcon = computed(() => {
  const icon = selectedToItem.value?.icon;
  if (!icon) return null;
  return icon.startsWith('/') ? icon : `/${icon}`;
});

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
  formStore.state.type = 'buy';
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

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
