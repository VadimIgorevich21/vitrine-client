<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { orderService } from '@/services/orderService';
import { apiClient } from '@/services/api';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const toast = useToast();

const loading = ref(true);
const processing = ref(false);
const order = ref<any>(null);

// Form Fields
const cardholder = ref('');
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const agreed = ref(false);

// UI States
const showTooltip = ref(false);
const showCvvHelp = ref(false);
const errors = ref<Record<string, string>>({});
const payError = ref('');

// Fetch order details
const fetchOrderDetails = async () => {
  const orderId = route.params.id as string;
  loading.value = true;
  try {
    if (history.state && history.state.order && String(history.state.order.id) === orderId) {
      order.value = history.state.order;
    } else {
      const res = await orderService.getOrder(orderId);
      order.value = res.data;
    }
  } catch (err: any) {
    console.error('Failed to load order:', err);
    toast.error(t('actions.errorOccurred'));
    router.push('/cabinet');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrderDetails();
});

// Computed values for displays
const fiatAmount = ref(0);
const fiatCurrency = ref('EUR');
const cryptoAmount = ref(0);
const cryptoCurrency = ref('BTC');

// Watch and parse order updates
onMounted(() => {
  // Sync values on mount if already loaded
  updateCachedValues();
});

const updateCachedValues = () => {
  if (order.value) {
    fiatAmount.value = order.value.fiat_amount_info?.amount ?? 0;
    fiatCurrency.value = order.value.fiat_amount_info?.currency_code ?? 'EUR';
    cryptoAmount.value = order.value.crypto_amount_info?.amount ?? 0;
    cryptoCurrency.value = order.value.crypto_amount_info?.currency_code ?? 'BTC';
  }
};

// Format values
const formattedTotal = computed(() => {
  const formatted = Number(fiatAmount.value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${fiatCurrency.value}`;
});

const cardBrand = computed(() => {
  const num = cardNumber.value.replace(/\D/g, '');
  if (num.startsWith('4')) return 'visa';
  if (/^5[1-5]/.test(num) || /^222[1-9]|^22[3-9]|^2[3-6]|^27[0-1]|^2720/.test(num)) return 'mastercard';
  return '';
});

// Formatting Handlers
const handleCardholderInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/[^A-Za-z\s]/g, '');
  cardholder.value = val.toUpperCase();
  if (errors.value.cardholder) errors.value.cardholder = '';
};

const handleCardNumberInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/\D/g, '');
  if (val.length > 16) val = val.substring(0, 16);
  
  const matches = val.match(/.{1,4}/g);
  cardNumber.value = matches ? matches.join(' ') : val;
  if (errors.value.cardNumber) errors.value.cardNumber = '';
};

const handleExpiryInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/\D/g, '');
  if (val.length > 4) val = val.substring(0, 4);

  if (val.length > 2) {
    expiryDate.value = val.substring(0, 2) + ' / ' + val.substring(2);
  } else {
    expiryDate.value = val;
  }
  if (errors.value.expiryDate) errors.value.expiryDate = '';
};

const handleCvvInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/\D/g, '');
  if (val.length > 3) val = val.substring(0, 3);
  cvv.value = val;
  if (errors.value.cvv) errors.value.cvv = '';
};

// Validation
const validateForm = () => {
  const errs: Record<string, string> = {};
  
  if (!cardholder.value.trim()) {
    errs.cardholder = t('orders.securePayment.validation.required');
  } else if (cardholder.value.trim().split(' ').length < 2) {
    errs.cardholder = t('orders.securePayment.validation.cardholderName');
  }

  const cleanCard = cardNumber.value.replace(/\D/g, '');
  if (!cleanCard) {
    errs.cardNumber = t('orders.securePayment.validation.required');
  } else if (cleanCard.length < 16) {
    errs.cardNumber = t('orders.securePayment.validation.card16Digits');
  }

  if (!expiryDate.value) {
    errs.expiryDate = t('orders.securePayment.validation.required');
  } else {
    const parts = expiryDate.value.split('/');
    if (parts.length !== 2) {
      errs.expiryDate = t('orders.securePayment.validation.invalid');
    } else {
      const monthStr = (parts[0] || '').trim();
      const yearStr = (parts[1] || '').trim();
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;

      if (isNaN(month) || month < 1 || month > 12) {
        errs.expiryDate = t('orders.securePayment.validation.invalidMonth');
      } else if (isNaN(year) || year < currentYear || (year === currentYear && month < currentMonth)) {
        errs.expiryDate = t('orders.securePayment.validation.expiredCard');
      }
    }
  }

  if (!cvv.value) {
    errs.cvv = t('orders.securePayment.validation.required');
  } else if (cvv.value.length < 3) {
    errs.cvv = t('orders.securePayment.validation.cvv3Digits');
  }

  errors.value = errs;
  return Object.keys(errs).length === 0;
};

// Form Submission
const handlePayClick = async () => {
  if (!agreed.value) {
    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
    }, 4000);
    return;
  }

  if (!validateForm() || !order.value) {
    return;
  }

  processing.value = true;
  payError.value = '';

  try {
    const cleanCard = cardNumber.value.replace(/\D/g, '');
    const expiryParts = expiryDate.value.split('/');
    const expmonth = (expiryParts[0] || '').trim();
    const expyear = '20' + (expiryParts[1] || '').trim();

    const payload = {
      PAN: cleanCard,
      expmonth,
      expyear,
      cardholder: cardholder.value.trim(),
      securecode: cvv.value,
    };

    const response = await apiClient.post(`/orders/${order.value.id}/pay-card`, payload);
    const result = response.data;

    // Check if 3DS is required
    if (result.status === '3DS' || result.url || result.acsUrl || result.PaReq) {
      toast.info(t('orders.securePayment.redirecting3ds'));
      
      const acsUrl = result.url || result.acsUrl;
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = acsUrl;

      const fields = {
        PaReq: result.PaReq,
        MD: result.MD,
        TermUrl: result.TermUrl || result.termUrl || window.location.origin + '/third-party-payment-callback',
      };

      Object.entries(fields).forEach(([key, value]) => {
        if (value) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);
      form.submit();
    } else if (result.status === 'OK' || result.status === 'success' || !result.errorcode) {
      router.push('/cabinet/orders');
    } else {
      payError.value = result.errortext || t('orders.securePayment.paymentDeclined');
      toast.error(payError.value);
    }
  } catch (err: any) {
    console.error('Payment execution failed:', err);
    if (err.response?.data?.errors) {
      const serverErrs = err.response.data.errors;
      const mappedErrs: Record<string, string> = {};
      
      if (serverErrs.PAN) mappedErrs.cardNumber = serverErrs.PAN[0];
      if (serverErrs.cardholder) mappedErrs.cardholder = serverErrs.cardholder[0];
      if (serverErrs.expmonth || serverErrs.expyear) mappedErrs.expiryDate = (serverErrs.expmonth?.[0] || serverErrs.expyear?.[0]);
      if (serverErrs.securecode) mappedErrs.cvv = serverErrs.securecode[0];

      errors.value = mappedErrs;
    } else {
      payError.value = err.response?.data?.message || t('orders.securePayment.transactionFailed');
      toast.error(payError.value);
    }
  } finally {
    processing.value = false;
  }
};

const goBack = () => {
  router.push('/cabinet');
};

// Keep variables in sync when order loads
const orderDataWatcher = () => {
  updateCachedValues();
};
</script>

<template>
  <div class="cabinet-page-with-exchange-form flex items-center justify-center py-10 w-full">
    <div class="max-w-2xl w-full flex flex-col items-center">
      
      <!-- Loading Order Details State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="loader-spinner mb-4"></div>
        <p class="text-gray-500 text-sm">{{ t('orders.securePayment.loadingOrderDetails') }}</p>
      </div>

      <!-- Payment Main Card -->
      <div v-else-if="order" class="exchange-card" @vue:mounted="orderDataWatcher">
        
        <!-- Step Header -->
        <div class="step-header mb-6">
          <button @click="goBack" class="back-btn" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="back-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="step-title">{{ t('orders.securePayment.title') }}</h2>
          <div class="header-spacer"></div>
        </div>

        <!-- Purchase Details Block -->
        <div class="summary-section mb-6">
          <h3 class="summary-details-title mb-2">{{ t('orders.securePayment.purchaseDetails') }}</h3>
          
          <div class="summary-total-title mb-3">
            {{ t('orders.securePayment.total') }} {{ formattedTotal }}
          </div>

          <div>
            <div class="details-row">
              <div class="details-line">
                <span class="details-label">{{ t('orders.securePayment.description') }}</span>
                <span class="details-value">{{ t('orders.securePayment.cryptoPurchase', { amount: cryptoAmount, currency: cryptoCurrency }) }}</span>
              </div>
              <div class="details-line">
                <span class="details-label">{{ t('orders.securePayment.merchant') }}</span>
                <span class="details-value">BTC Bit</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-[#F2F2F6] mb-6"></div>

        <!-- Card input form -->
        <form @submit.prevent="handlePayClick" class="fields-section">
          <h3 class="summary-details-title mb-4">{{ t('orders.securePayment.creditDebitCard') }}</h3>

          <!-- Cardholder Input -->
          <div class="field-container mb-4">
            <label class="input-label">
              {{ t('orders.securePayment.cardholderName') }}
            </label>
            <input
              type="text"
              v-model="cardholder"
              @input="handleCardholderInput"
              :placeholder="t('orders.securePayment.cardholderPlaceholder')"
              class="card-input"
              :class="{ 'error': errors.cardholder }"
            />
            <span v-if="errors.cardholder" class="error-msg">
              {{ errors.cardholder }}
            </span>
          </div>

          <!-- Card Number Input -->
          <div class="field-container mb-4">
            <div class="flex justify-between items-center mb-2">
              <label class="input-label mb-0">
                {{ t('orders.securePayment.cardNumber') }}
              </label>
              
              <!-- Cards Logos -->
              <div class="flex items-center gap-1.5">
                <img 
                  src="/img/payment-methods/visa_logo.png" 
                  alt="Visa" 
                  style="width: 31px; height: 10px; display: block;"
                  class="object-contain opacity-80 transition-opacity" 
                  :class="{ 'opacity-100 scale-105 filter drop-shadow-sm': cardBrand === 'visa' || !cardBrand, 'opacity-30': cardBrand && cardBrand !== 'visa' }"
                />
                <img 
                  src="/img/payment-methods/mc_logo.png" 
                  alt="Mastercard" 
                  style="width: 29px; height: 16px; display: block;"
                  class="object-contain opacity-80 transition-opacity" 
                  :class="{ 'opacity-100 scale-105 filter drop-shadow-sm': cardBrand === 'mastercard' || !cardBrand, 'opacity-30': cardBrand && cardBrand !== 'mastercard' }"
                />
              </div>
            </div>
            <input
              type="text"
              v-model="cardNumber"
              @input="handleCardNumberInput"
              placeholder="0000 0000 0000 0000"
              class="card-input tracking-wider"
              :class="{ 'error': errors.cardNumber }"
            />
            <span v-if="errors.cardNumber" class="error-msg">
              {{ errors.cardNumber }}
            </span>
          </div>

          <!-- Expiry Date & CVV (Side by Side) -->
          <div class="flex gap-4 mb-4">
            <!-- Expiry Input -->
            <div class="field-container flex-1">
              <label class="input-label">
                {{ t('orders.securePayment.expiryDate') }}
              </label>
              <input
                type="text"
                v-model="expiryDate"
                @input="handleExpiryInput"
                :placeholder="t('orders.securePayment.expiryPlaceholder')"
                class="card-input text-center"
                :class="{ 'error': errors.expiryDate }"
              />
              <span v-if="errors.expiryDate" class="error-msg">
                {{ errors.expiryDate }}
              </span>
            </div>

            <!-- CVV Input -->
            <div class="field-container flex-1">
              <label class="input-label">
                {{ t('orders.securePayment.cvvCvc') }}
              </label>
              <div class="relative flex items-center w-full">
                <input
                  type="password"
                  v-model="cvv"
                  @input="handleCvvInput"
                  placeholder="***"
                  class="card-input text-center pr-10"
                  :class="{ 'error': errors.cvv }"
                />
                
                <!-- Info Trigger -->
                <div 
                  class="absolute right-3 cursor-pointer flex items-center justify-center"
                  @mouseenter="showCvvHelp = true"
                  @mouseleave="showCvvHelp = false"
                  @click="showCvvHelp = !showCvvHelp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="info-icon">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <!-- Interactive CVV Popover -->
                <transition name="fade">
                  <div v-if="showCvvHelp" class="cvv-popover" style="width: 160px; height: 100px;">
                    <img
                      src="/img/payment-methods/tooltip.png"
                      alt="CVV Helper"
                      style="width: 160px; height: 100px; display: block;"
                    />
                  </div>
                </transition>
              </div>
              <span v-if="errors.cvv" class="error-msg">
                {{ errors.cvv }}
              </span>
            </div>
          </div>

          <!-- Checkbox -->
          <div class="checkbox-container mb-6">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="agreed"
                class="hidden-checkbox"
              />
              <div class="checkbox-box" :class="{ 'checked': agreed }">
                <svg v-if="agreed" width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkmark">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="checkbox-text" v-html="t('orders.securePayment.agreeTermsHtml')"></span>
            </label>
          </div>

          <!-- Pay error display -->
          <div v-if="payError" class="error-box mb-4">
            {{ payError }}
          </div>

          <!-- Pay Button with Tooltip -->
          <div class="relative pt-2">
            <transition name="fade">
              <div v-if="showTooltip" class="validation-tooltip">
                {{ t('orders.securePayment.pleaseAcceptTerms') }}
                <div class="tooltip-arrow"></div>
              </div>
            </transition>

            <button
              type="submit"
              :disabled="processing"
              class="primary-btn"
              :class="[ agreed ? 'btn-active' : 'btn-inactive' ]"
            >
              <div v-if="processing" class="btn-spinner"></div>
              <span v-else>{{ t('orders.securePayment.pay', { amount: formattedTotal }) }}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<style scoped>
.cabinet-page-with-exchange-form {
  padding-top: 40px;
  padding-bottom: 40px;
}

.exchange-card {
  max-width: 448px;
  width: 448px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-btn {
  padding: 8px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:hover {
  background-color: var(--bg-secondary);
}

.back-arrow {
  width: 24px;
  height: 24px;
  color: #9ca3af;
}

.step-title {
  font-size: 24px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 150%;
  text-align: center;
}

.header-spacer {
  width: 40px;
  height: 40px;
}

/* Purchase Details Section */
.summary-section {
  display: flex;
  flex-direction: column;
  padding-top: 14px;
}

.summary-total-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 4px;
}

.details-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.details-line {
  /*display: flex;
  justify-content: left; */
}

.summary-details-title {
  color: #929AAA;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
}

.purchase-details-total {
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0;
  color: var(--text-primary);
}


.details-label {
  color: #929AAA;
  font-weight: 500;
  margin-right: 5px;
}

.details-value {
  color: var(--text-primary);
  font-weight: 500;
}

/* Inputs styling matching project */
.input-label {
  display: block;
  font-size: 12px;
  color: #929AAA;
  letter-spacing: 0.05em;
  padding: 0 4px;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 150%;
}

.card-input {
  width: 100%;
  outline: none;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  border: 1px solid #F2F2F6;
  border-radius: 6px;
  padding: 16px;
  transition: all 0.3s ease;
  min-width: 0;
  font-size: 14px;
}

:deep(.dark) .card-input {
  background-color: var(--bg-secondary);
  border-color: #1F2937;
}

.card-input:focus {
  border-color: #6366f1;
}

.card-input.error {
  border-color: #dc2626;
  background-color: var(--bg-primary);
}

.error-msg {
  color: #dc2626;
  font-size: 11px;
  font-weight: 500;
  margin-top: 4px;
  display: block;
  padding-left: 4px;
}

/* Checkbox */
.checkbox-container {
  display: flex;
  align-items: center;
  padding-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.checkbox-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #F2F2F6;
  background-color: var(--bg-secondary);
  transition: all 0.2s ease;
}

:deep(.dark) .checkbox-box {
  border-color: #1F2937;
  background-color: var(--bg-secondary);
}

.checkbox-box.checked {
  background-color: #FF6B00;
  border-color: #FF6B00;
}

.checkmark {
  color: #ffffff;
}

.checkbox-text {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 140%;
  font-weight: 500;
}

.link-text {
  color: #FF6B00;
  text-decoration: none;
  font-weight: 600;
}

.link-text:hover {
  text-decoration: underline;
}

/* Pay Button styling matching project */
.primary-btn {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 50px;
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

.btn-inactive {
  background-image: linear-gradient(to right, #9ca3af, #6b7280);
  color: white;
  box-shadow: none;
  opacity: 0.5;
  cursor: default;
}

/* CVV Popover */
.info-icon {
  color: #9ca3af;
  transition: color 0.2s;
}

.info-icon:hover {
  color: #6b7280;
}

.cvv-popover {
  position: absolute;
  bottom: 57px;
  right: 0;
  z-index: 30;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
}

:deep(.dark) .cvv-popover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.cvv-tooltip-img {
  width: 160px;
  height: 100px;
  display: block;
}

/* Tooltips */
.validation-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 12px;
  z-index: 20;
  background-color: var(--bg-primary);
  border: 1px solid #F2F2F6;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

:deep(.dark) .validation-tooltip {
  border-color: #1F2937;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background-color: var(--bg-primary);
  border-right: 1px solid #F2F2F6;
  border-bottom: 1px solid #F2F2F6;
  transform: rotate(45deg) translate(-4px, -4px);
  z-index: -1;
}

:deep(.dark) .tooltip-arrow {
  border-color: #1F2937;
}

/* Spinner Animations */
.loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #F3F4F6;
  border-top: 4px solid #FF6B00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}

.hidden-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.error-box {
  padding: 12px;
  background-color: #fef2f2;
  border-radius: 6px;
  color: #dc2626;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  border: 1px solid #fee2e2;
}

@media (max-width: 500px) {
  .exchange-card {
    width: 100%;
    max-width: 100%;
    padding: 20px;
  }
}
</style>
