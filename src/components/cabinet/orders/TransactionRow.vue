<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { orderService } from '@/services/orderService';
import OrderStatus from './OrderStatus.vue';

const props = defineProps<{
  order: any;
}>();

const emit = defineEmits(['refresh']);
const { t } = useI18n();

const isOpen = ref(false);
const isRegenerating = ref(false);
const isCanceling = ref(false);

const isBuy = computed(() => props.order.order_type === 'buy');

const formatAmount = (info: any) => {
  if (!info) return '0.00';
  const val = info.amount !== undefined && info.amount !== null ? info.amount : info.rate;
  if (val === undefined || val === null) return '0.00';
  
  const amountValue = typeof val === 'string' ? parseFloat(val) : val;
  const precision = (info.precision !== undefined && info.precision !== null) ? parseInt(info.precision) : 2;
  
  // Use en-US locale for consistent number formatting (period as decimal separator)
  // while respecting the dynamic precision and removing redundant trailing zeros.
  return amountValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision
  });
};

const cryptoAmount = computed(() => formatAmount(props.order.crypto_amount_info));
const cryptoCurrency = computed(() => props.order.crypto_amount_info?.currency_code || '');

const fiatAmount = computed(() => formatAmount(props.order.fiat_amount_info));
const fiatCurrency = computed(() => props.order.fiat_amount_info?.currency_code || '');

const exchangeRate = computed(() => formatAmount(props.order.rate_info));

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const locale = useI18n().locale.value;
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' }) + ' ' + 
         date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
};

const copyToClipboard = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
};

const truncateMiddle = (str: string, startChars = 10, endChars = 8) => {
  if (!str) return '';
  if (str.length <= startChars + endChars) return str;
  return `${str.substring(0, startChars)}...${str.substring(str.length - endChars)}`;
};

const submitPaymentForm = (payment: any) => {
  if (!payment || !payment.action || !payment.fields) {
    console.error('Invalid payment data received:', payment);
    return false;
  }

  const { action, fields } = payment;
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = action;

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  return true;
};

const handleRegeneratePayment = async () => {
  if (isRegenerating.value) return;
  
  isRegenerating.value = true;
  try {
    const response = await orderService.regeneratePayment(props.order.id);
    if (!submitPaymentForm(response.payment)) {
      isRegenerating.value = false;
    }
  } catch (error) {
    console.error('Failed to regenerate payment:', error);
    isRegenerating.value = false;
  }
};

const handleCancelOrder = async () => {
  if (isCanceling.value) return;
  
  isCanceling.value = true;
  try {
    const response = await orderService.cancelOrder(props.order.id);
    if (response.payment) {
      if (!submitPaymentForm(response.payment)) {
        isCanceling.value = false;
      }
    } else {
      emit('refresh');
      isCanceling.value = false;
    }
  } catch (error) {
    console.error('Failed to cancel order:', error);
    isCanceling.value = false;
  }
};
</script>

<template>
  <div class="transaction-row-container" :class="{ 'is-open': isOpen }">
    <!-- Header Row (Simplified Table View) -->
    <div class="transaction-header" @click="isOpen = !isOpen">
      <!-- Chevron -->
      <div class="col-chevron">
        <svg xmlns="http://www.w3.org/2000/svg" :class="['chevron-icon', { 'rotated': isOpen }]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Date -->
      <div class="col-date">
        {{ formatDate(order.created_at) }}
      </div>

      <!-- Type -->
      <div class="col-type">
        <div :class="['type-badge', isBuy ? 'buy' : 'sell']">
          <svg v-if="isBuy" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {{ isBuy ? t('orders.details.buy') : t('orders.details.sell') }}
        </div>
      </div>

      <!-- Direction -->
      <div class="col-direction">
        {{ order.direction || `${fiatCurrency} ${t('orders.details.to')} ${cryptoCurrency}` }}
      </div>

      <!-- Amount -->
      <div class="col-amount font-bold text-gray-900">
        {{ cryptoAmount }} {{ cryptoCurrency }}
      </div>

      <!-- Status -->
      <div class="col-status">
        <OrderStatus :status="order.status" />
      </div>

      <!-- Actions -->
      <div class="col-actions">
        <button 
          v-if="order.actions?.includes('regeneratePayment')" 
          class="pay-btn"
          :disabled="isRegenerating"
          @click.stop="handleRegeneratePayment"
        >
          <div v-if="isRegenerating" class="mini-spinner"></div>
          <span v-else>{{ t('orders.actions.pay') }}</span>
        </button>
        <button 
          v-else-if="order.actions?.includes('cancel')"
          class="cancel-btn" 
          :disabled="isCanceling"
          @click.stop="handleCancelOrder"
        >
          <div v-if="isCanceling" class="cancel-spinner"></div>
          <span v-else>{{ t('orders.actions.cancel') }}</span>
        </button>
      </div>
    </div>

    <!-- Expanded Content -->
    <transition name="expand">
      <div v-if="isOpen" class="transaction-details">
        <div class="details-grid">
          <div class="detail-item">
            <label>{{ t('orders.details.amountPaid') }}</label>
            <span>{{ fiatAmount }} {{ fiatCurrency }}</span>
          </div>
          <div class="detail-item">
            <label>{{ t('orders.details.exchangeRate') }}</label>
            <span>1 {{ isBuy ? fiatCurrency : cryptoCurrency }} = {{ exchangeRate }} {{ isBuy ? cryptoCurrency : fiatCurrency }}</span>
          </div>
          <div class="detail-item">
            <label>{{ t('orders.details.feePaid') }}</label>
            <span>0.00 {{ fiatCurrency }}</span>
          </div>
          
          <!-- Receiving details based on type -->
          <div class="detail-item" v-if="isBuy && order.wallet_address">
            <label>{{ t('orders.details.receivingWallet') }}</label>
            <div class="flex items-center">
              <span class="truncate-address">{{ truncateMiddle(order.wallet_address, 10, 8) }}</span>
              <button @click.stop="copyToClipboard(order.wallet_address)" class="copy-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="detail-item" v-if="!isBuy && order.user_requisites">
            <label>{{ t('orders.details.userRequisites') }}</label>
            <span>{{ order.user_requisites }}</span>
          </div>

          <!-- Transaction Hash (for Buy) -->
          <div class="detail-item" v-if="isBuy && order.tx_hash">
            <label>{{ t('orders.details.transactionHash') }}</label>
            <div class="flex items-center">
              <span class="truncate-address">{{ truncateMiddle(order.tx_hash, 10, 8) }}</span>
              <button @click.stop="copyToClipboard(order.tx_hash)" class="copy-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirmation (for Sell) -->
           <div class="detail-item" v-if="!isBuy && order.tx_hash">
             <label>{{ t('orders.details.confirmation') }}</label>
             <div class="flex items-center">
               <span class="truncate-address">{{ truncateMiddle(order.tx_hash, 10, 8) }}</span>
                <button @click.stop="copyToClipboard(order.tx_hash)" class="copy-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
             </div>
          </div>

           <div class="detail-item" v-if="order.payment_link">
             <label>{{ t('orders.details.confirmation') }}</label>
             <a :href="order.payment_link" target="_blank" class="receipt-link">
               {{ t('orders.details.viewReceipt') }}
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
               </svg>
             </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.transaction-row-container {
  background-color: white;
  margin-bottom: 8px; /* mt-2 equivalent */
  transition: all 0.2s ease;
}

.transaction-row-container:hover {
  background-color: #F9FAFB;
}

.transaction-header {
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 16px;
  min-height: 64px;
}

.col-chevron { width: 24px; flex-shrink: 0; }
.col-date { width: 140px; color: #929AAA; font-size: 14px; flex-shrink: 0; }
.col-type { width: 110px; flex-shrink: 0; }
.col-direction { width: 16rem; color: #667085; font-size: 14px; flex-shrink: 1; }
.col-amount { width: 180px; font-weight: 600; color: #101828; flex-shrink: 0; white-space: nowrap; }
.col-status { width: 140px; flex-shrink: 0; display: flex; justify-content: flex-start; }
.col-actions { width: 120px; flex-shrink: 0; display: flex; justify-content: flex-start; }

.chevron-icon {
  width: 20px;
  height: 20px;
  color: #98A2B3;
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
}

.type-badge.buy {
  background-color: #ECFDF3;
  color: #027A48;
}

.type-badge.sell {
  background-color: #FEF3F2;
  color: #B42318;
}

.cancel-btn {
  font-size: 13px;
  color: #98A2B3;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #E4E7EC;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  background-color: transparent;
  cursor: pointer;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #FEE4E2;
  color: #D92D20;
  border-color: #FDA29B;
}

.cancel-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(152, 162, 179, 0.3);
  border-top: 2px solid #98A2B3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.cancel-btn:hover:not(:disabled) .cancel-spinner {
  border-color: rgba(217, 45, 32, 0.3);
  border-top-color: #D92D20;
}

.pay-btn {
  background: linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(255, 107, 0, 0.2);
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.pay-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(255, 107, 0, 0.3);
}

.pay-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.mini-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Details Section */
.transaction-details {
  padding: 24px 64px 32px 64px;
  background-color: #FAFAFA;
  border-top: 1px solid #F2F2F6;
}

.details-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 0 0 auto;
  /*min-width: 160px;*/
  margin-bottom: 8px; /* mb-2 equivalent */
}

.detail-item.full-width {
  width: 100%;
}
/* Removed redundant mt-4 handled by gap */

.detail-item label {
  font-size: 12px;
  font-weight: 500;
  color: #B0B8C6;
}

.detail-item span {
  font-size: 14px;
  font-weight: 500;
  color: #929AAA;
}

.truncate-address {
  font-family: monospace;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-btn {
  color: #98A2B3;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: #F2F4F7;
  color: #101828;
}

.receipt-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2563EB;
  font-weight: 600;
  font-size: 15px;
  text-decoration: underline;
}

/* Animations */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 400px;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .col-date, .col-direction { display: none; }
  .transaction-header { 
    padding: 20px 16px; 
    gap: 12px; 
    flex-wrap: wrap; 
  }
  
  /* Row 1: Chevron + Type */
  .col-chevron { width: 24px; }
  .col-type { flex: 1; }
  
  /* Row 2: Amount (full width) */
  .col-amount { 
    width: 100%; 
    flex-basis: 100%;
    font-size: 20px;
    margin: 4px 0;
  }
  
  /* Row 3: Status + Actions */
  .col-status { 
    width: auto;
    flex-shrink: 0;
  }
  .col-actions {
    flex: 1;
  }
  
  .transaction-details { padding: 24px 16px; }
}
</style>
