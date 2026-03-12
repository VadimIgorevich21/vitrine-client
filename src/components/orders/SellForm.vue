<template>
  <div class="form-wrapper">
    <!-- Payment Method -->
    <div v-if="currentPaymentMethods.length > 1" class="field-container">
      <UniversalSelect 
        v-model="formStore.state.payment_method"
        :items="currentPaymentMethods"
        itemKey="key"
        labelPath="label"
        iconPath="icon"
        :placeholder="$t('orders.exchange.selectMethod')"
      />
    </div>
    <div v-else-if="currentPaymentMethods.length === 1" class="selected-method-display">
      <div class="method-icon-container">
        <img v-if="currentPaymentMethods[0]?.icon" :src="currentPaymentMethods[0].icon.startsWith('/') ? currentPaymentMethods[0].icon : `/${currentPaymentMethods[0].icon}`" class="method-icon" />
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="fallback-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
      <span class="method-label">{{ currentPaymentMethods[0]?.label }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="method-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Give (Crypto) -->
    <div class="input-section">
      <div class="input-header">
        <label class="input-label">{{ $t('orders.exchange.youGive') }}</label>
      </div>

      <div v-if="configStore.loading" class="pulse-loader small"></div>
      <div v-else :class="['input-group', !formStore.isAmountValid ? 'error' : '']">
        <input
          type="number"
          v-model.number="formStore.state.amount_from"
          @input="formStore.calculateTo"
          class="amount-input"
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
          class="currency-select-right"
        />
      </div>
    </div>

    <!-- Get (Fiat) -->
    <div class="input-section">
      <label class="input-label">{{ $t('orders.exchange.youGet') }}</label>
      <div v-if="configStore.loading" class="pulse-loader small"></div>
      <div v-else class="input-group">
        <input
          type="number"
          v-model.number="formStore.state.amount_to"
          @input="formStore.calculateFrom"
          class="amount-input output"
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
          is-fiat
          @change="formStore.calculateTo"
          class="currency-select-right"
        />
      </div>
    </div>

    <!-- Requisites Fields (Sell only) -->
    <div v-if="authStore.user && !configStore.loading" class="requisites-section">
      <textarea v-model="formStore.state.user_requisites" :placeholder="$t('orders.exchange.userRequisites')"
                class="requisites-textarea" rows="2"></textarea>
    </div>

    <!-- Errors -->
    <div v-if="apiErrors" class="error-box">
      <ul class="error-list">
        <li v-for="(err, field) in apiErrors" :key="field">{{ err[0] }}</li>
      </ul>
    </div>

    <button
      v-if="!configStore.loading"
      @click="handleSubmit"
      :disabled="loading || !formStore.state.amount_from || formStore.state.amount_from === 0"
      :class="['primary-btn', !formStore.isAmountValid ? 'btn-error' : 'btn-active']"
      :style="(!formStore.state.amount_from || formStore.state.amount_from === 0) ? { opacity: 0.5 } : {}"
    >
      <span v-if="loading">{{ $t('orders.exchange.processing') }}</span>
      <span v-else-if="!formStore.isAmountValid">
        {{ $t('orders.exchange.minimum') }} {{ formStore.currentRate?.min_amount }} {{ formStore.state.from_currency }}
      </span>
      <span v-else>{{ authStore.user ? $t('orders.exchange.createOrderSell') : $t('orders.exchange.loginAndExchange') }}</span>
    </button>
    <div v-else class="pulse-loader btn-pulse"></div>
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
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Field & Label */
.input-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af; /* text-gray-400 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 4px;
  margin-bottom: 8px;
}

.input-section {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.field-container {
  display: flex;
  flex-direction: column;
}

/* Input Group Header */
.selected-method-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
}

:deep(.dark) .selected-method-display {
  background-color: #111827;
  border-color: #374151;
}

.method-icon-container {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

:deep(.dark) .method-icon-container {
  background-color: #1f2937;
}

.method-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.fallback-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.method-label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.method-arrow {
  width: 16px;
  height: 16px;
  margin-left: auto;
  color: #9ca3af;
}

/* Input Elements */
.input-group {
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 6px 8px;
  transition: all 0.3s ease;
  min-width: 0;
}

:deep(.dark) .input-group {
  background-color: #111827;
}

.input-group:focus-within {
  border-color: #6366f1; /* border-indigo-500 */
  background-color: white;
}

:deep(.dark) .input-group:focus-within {
  background-color: #1f2937;
}

.input-group.error {
  border-color: #6366f1;
  background-color: white;
}

:deep(.dark) .input-group.error {
  background-color: #1f2937;
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.amount-input {
  flex: 1;
  min-width: 0;
  background-color: transparent;
  border: none;
  padding: 8px;
  font-size: 24px;
  font-weight: 700;
  outline: none;
  color: #111827;
  -moz-appearance: textfield;
  appearance: textfield;
}

:deep(.dark) .amount-input {
  color: white;
}

.amount-input.output {
  color: #9ca3af;
}

:deep(.dark) .amount-input.output {
  color: #6b7280;
}

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

.currency-select-right {
  flex-shrink: 1;
  min-width: 0;
  margin-left: 8px;
}

/* Buttons */
.primary-btn {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.primary-btn:active {
  transform: scale(0.98);
}

.btn-active {
  background-image: linear-gradient(to right, #FF6B00, #FF8A00);
  color: white;
  box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
}

.btn-active:hover {
  opacity: 0.9;
}

.btn-error, .btn-inactive {
  background-image: linear-gradient(to right, #9ca3af, #6b7280);
  color: white;
  box-shadow: none;
}

.btn-inactive {
  opacity: 0.5;
}

/* Requisites Area */
.requisites-section {
  padding-top: 24px;
  border-top: 1px dashed #e5e7eb;
}

:deep(.dark) .requisites-section {
  border-color: #4b5563;
}

.requisites-textarea {
  width: 100%;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 16px;
  border: none;
  outline: none;
  color: #111827;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.dark) .requisites-textarea {
  background-color: #111827;
  color: white;
}

.requisites-textarea:focus {
  box-shadow: 0 0 0 2px #3b82f6; /* ring-2 ring-blue-500 */
}

/* Loaders & Errors */
.pulse-loader {
  background-color: #f9fafb;
  border-radius: 16px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

:deep(.dark) .pulse-loader {
  background-color: #374151;
}

.pulse-loader.small {
  height: 80px;
}

.btn-pulse {
  height: 64px;
}

.error-box {
  padding: 16px;
  background-color: #fef2f2;
  border-radius: 16px;
}

:deep(.dark) .error-box {
  background-color: rgba(127, 29, 29, 0.3);
}

.error-list {
  list-style-type: disc;
  padding-left: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #dc2626;
}

:deep(.dark) .error-list {
  color: #f87171;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

/* Responsiveness for < 500px */
@media (max-width: 500px) {
  .amount-input {
    font-size: 18px;
    padding: 6px;
  }

  .primary-btn {
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 16px;
    border-radius: 20px;
  }

  .input-label {
    font-size: 10px;
  }

  .input-group {
    padding: 4px 6px;
  }
}
</style>
