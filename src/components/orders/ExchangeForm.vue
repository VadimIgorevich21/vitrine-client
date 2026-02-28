<template>
  <div class="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100">
    <div class="flex p-1.5 bg-gray-100 rounded-2xl mb-8">
      <button
        v-for="t in (['buy', 'sell'] as const)" :key="t"
        @click="formStore.state.type = t"
        :class="['flex-1 py-3 text-sm font-black rounded-xl transition-all duration-300',
                 formStore.state.type === t ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400 hover:text-gray-600']"
      >
        {{ t === 'buy' ? 'КУПИТЬ КРИПТУ' : 'ПРОДАТЬ КРИПТУ' }}
      </button>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <div class="flex justify-between px-1">
          <label class="text-xs font-bold text-gray-400 uppercase tracking-widest">Вы отдаете</label>
          <span v-if="formStore.currentRate" class="text-xs font-medium text-blue-500">
            1 {{ formStore.state.from_currency }} ≈ {{ formStore.currentRate.final_rate }}
          </span>
        </div>
        <div :class="['flex items-center bg-gray-50 border-2 rounded-2xl p-2 transition-all',
                      !formStore.isAmountValid ? 'border-red-200 bg-red-50' : 'border-transparent focus-within:border-blue-500 focus-within:bg-white']">
          <input type="number" v-model.number="formStore.state.amount_from"
                 class="flex-1 bg-transparent border-none p-2 text-2xl font-bold outline-none" placeholder="0.00" />
          <select v-model="formStore.state.from_currency" class="bg-white border shadow-sm rounded-xl px-4 py-2 font-bold text-gray-700 outline-none">
            <option v-for="code in availableFromList" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
        <p v-if="!formStore.isAmountValid" class="text-red-500 text-xs font-bold px-2 italic">
          Минимум: {{ formStore.currentRate?.min_amount }} {{ formStore.state.from_currency }}
        </p>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Вы получаете (ориентировочно)</label>
        <div class="flex items-center bg-gray-50 border-2 border-transparent rounded-2xl p-2 transition-all">
          <input type="text" :value="formStore.calculatedTotal" disabled
                 class="flex-1 bg-transparent border-none p-2 text-2xl font-bold text-blue-600 outline-none" />
          <select v-model="formStore.state.to_currency" class="bg-white border shadow-sm rounded-xl px-4 py-2 font-bold text-gray-700 outline-none">
            <option v-for="code in availableToList" :key="code" :value="code">{{ code }}</option>
          </select>
        </div>
      </div>

      <div v-if="authStore.user" class="pt-6 border-t border-dashed space-y-4">
        <template v-if="formStore.state.type === 'buy'">
          <select v-model="formStore.state.wallet_type" class="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="">Выберите сеть...</option>
            <option v-for="t in configStore.walletTypes" :key="t.key" :value="t.key">{{ t.label }}</option>
          </select>
          <input v-model="formStore.state.wallet_address" placeholder="Адрес вашего кошелька"
                 class="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" />
        </template>

        <template v-else>
          <select v-model="formStore.state.payment_method" class="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="">Выберите банк...</option>
            <option v-for="m in configStore.paymentMethods" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
          <textarea v-model="formStore.state.user_requisites" placeholder="Реквизиты карты/счета"
                    class="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" rows="2"></textarea>
        </template>
      </div>

      <div v-if="apiErrors" class="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
        <ul class="list-disc px-4">
          <li v-for="(err, field) in apiErrors" :key="field">{{ err[0] }}</li>
        </ul>
      </div>

      <button
        @click="handleSubmit"
        :disabled="loading || !formStore.isAmountValid || formStore.state.amount_from <= 0"
        class="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest"
      >
        <span v-if="loading">Обработка...</span>
        <span v-else>{{ authStore.user ? 'Создать заказ' : 'Войти и обменять' }}</span>
      </button>
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

const loading = ref(false);
const apiErrors = ref<any>(null);

const availableFromList = computed(() =>
  formStore.state.type === 'buy' ? configStore.fiatCurrencies : configStore.cryptoCurrencies
);

const availableToList = computed(() => {
  const from = formStore.state.from_currency;
  return configStore.directions[from] ?? [];
});

const toast = useToast();
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
    // 1. Показываем успех
    toast.success("Заявка успешно создана! Перенаправляем на страницу оплаты...", {
      timeout: 2000
    });
    formStore.resetForm();
    // setTimeout(() => {
    //   router.push({ name: 'order-details', params: { id: res.data.id } });
    // }, 1500);
    router.push({ name: 'order-details', params: { id: res.data.id } }); // Изменено на res.data.id в зависимости от ответа API
  } catch (err: any) {
    if (err.response?.status === 422) {
      apiErrors.value = err.response.data.errors;
      toast.error("Ошибка валидации. Проверьте введенные данные.");
    } else {
      toast.error("Произошла ошибка при создании заказа. Попробуйте позже.");
    }
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (!configStore.mainConfigs) {
    await configStore.getMainConfigs();
  }
  formStore.initDefaultValues();
});
</script>