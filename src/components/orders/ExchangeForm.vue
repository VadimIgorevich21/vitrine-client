<template>
  <div class="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
    <div v-if="configStore.loading" class="h-14 bg-gray-100 dark:bg-gray-700 animate-pulse rounded-2xl mb-8"></div>

    <div v-else class="flex p-1.5 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-8">
      <button
        v-for="t in (['buy', 'sell'] as const)" :key="t"
        @click="formStore.state.type = t"
        :class="['flex-1 py-3 text-sm font-black rounded-xl transition-all duration-300',
                 formStore.state.type === t ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md' : 'text-gray-400 hover:text-gray-600']"
      >
        {{ t === 'buy' ? 'КУПИТЬ КРИПТУ' : 'ПРОДАТЬ КРИПТУ' }}
      </button>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Способ оплаты</label>
        <select v-model="formStore.state.payment_method" class="w-full p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="">Выберите метод...</option>
          <option v-for="m in currentPaymentMethods" :key="m.key" :value="m.key">
            {{ m.label }}
          </option>
        </select>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between px-1 h-4">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-widest">Вы отдаете</label>
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
          <select v-model="formStore.state.from_currency" class="bg-white dark:bg-gray-700 border shadow-sm rounded-xl px-4 py-2 font-bold text-gray-700 dark:text-white outline-none">
            <option v-for="code in availableFromList" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
        <p v-if="!formStore.isAmountValid" class="text-red-500 text-xs font-bold px-2 italic">
          Минимум: {{ formStore.currentRate?.min_amount }} {{ formStore.state.from_currency }}
        </p>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Вы получаете</label>
        <div v-if="configStore.loading" class="h-20 bg-gray-50 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
        <div v-else class="flex items-center bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-800 rounded-2xl p-2 transition-all">
          <input
            type="number"
            v-model.number="formStore.state.amount_to"
            @input="formStore.calculateFrom"
            class="flex-1 bg-transparent border-none p-2 text-2xl font-bold text-blue-600 dark:text-blue-400 outline-none no-spinner"
            placeholder="0.00"
          />
          <select v-model="formStore.state.to_currency" @change="formStore.calculateTo" class="bg-white dark:bg-gray-700 border shadow-sm rounded-xl px-4 py-2 font-bold text-gray-700 dark:text-white outline-none">
            <option v-for="code in availableToList" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
      </div>

      <div v-if="authStore.user && !configStore.loading" class="pt-6 border-t border-dashed dark:border-gray-600 space-y-4">
        <template v-if="formStore.state.type === 'buy'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select v-model="formStore.state.wallet_type" class="p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition">
              <option value="">Выберите сеть...</option>
              <option v-for="t in configStore.walletTypes" :key="t.key" :value="t.key">{{ t.label }}</option>
            </select>
            <input v-model="formStore.state.wallet_address" placeholder="Адрес вашего кошелька"
                   class="p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
        </template>

        <template v-else>
          <textarea v-model="formStore.state.user_requisites" placeholder="Реквизиты карты/счета для получения фиата"
                    class="w-full p-4 bg-gray-50 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" rows="2"></textarea>
        </template>
      </div>

      <div v-if="apiErrors" class="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium">
        <ul class="list-disc px-4">
          <li v-for="(err, field) in apiErrors" :key="field">{{ err[0] }}</li>
        </ul>
      </div>

      <button
        v-if="!configStore.loading"
        @click="handleSubmit"
        :disabled="loading || !formStore.isAmountValid || !formStore.state.amount_from"
        class="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest"
      >
        <span v-if="loading">Обработка...</span>
        <span v-else>{{ authStore.user ? 'Создать заказ' : 'Войти и обменять' }}</span>
      </button>
      <div v-else class="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
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

const formStore = useOrderFormStore();
const configStore = useConfigStore();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const loading = ref(false);
const apiErrors = ref<any>(null);

// Динамический список "Отдаю"
const availableFromList = computed(() =>
  formStore.state.type === 'buy' ? configStore.fiatCurrencies : configStore.cryptoCurrencies
);

// Динамический список "Получаю"
const availableToList = computed(() => {
  const from = formStore.state.from_currency;
  return configStore.directions[from] ?? [];
});

// Геттер методов оплаты (связываем UI с новыми геттерами стора)
const currentPaymentMethods = computed(() => {
  return formStore.state.type === 'buy'
    ? configStore.buyPaymentMethods
    : configStore.sellPaymentMethods;
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
    toast.success("Заявка успешно создана!");
    formStore.resetForm();
    router.push({ name: 'order-details', params: { id: res.data.id } });
  } catch (err: any) {
    if (err.response?.status === 422) {
      apiErrors.value = err.response.data.errors;
      toast.error("Проверьте введенные данные");
    } else {
      toast.error("Произошла ошибка при создании заказа");
    }
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // Загружаем конфиги, если их нет
  if (!configStore.mainConfigs) await configStore.getMainConfigs();
  // Инициализируем дефолты формы
  formStore.initDefaultValues();
});
</script>

<style scoped>
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner {
  -moz-appearance: textfield;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>