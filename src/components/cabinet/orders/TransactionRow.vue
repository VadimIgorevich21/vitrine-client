<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  order: any;
}>();

const isOpen = ref(false);

const isBuy = computed(() => {
  // If we have access to order types, we should use them
  // Assuming 'BuyUSDC' or similar for now, or based on model logic
  // Typically, Buy = EUR to USDC, Sell = USDC to EUR
  // Let's assume a simplified check for now
  return props.order.to_currency === 'USDC' || props.order.to_currency === 'USDT' || props.order.to_currency === 'BTC';
});

const statusClass = computed(() => {
  const status = props.order.status?.toLowerCase();
  if (status === 'completed' || status === 'success') return 'status-completed';
  if (status === 'failed' || status === 'rejected' || status === 'cancelled') return 'status-failed';
  return 'status-pending';
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + 
         date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Optional: Add toast notification
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
          {{ isBuy ? 'Buy' : 'Sell' }}
        </div>
      </div>

      <!-- Direction -->
      <div class="col-direction">
        {{ order.from_currency }} to {{ order.to_currency }}
      </div>

      <!-- Amount -->
      <div class="col-amount font-bold text-gray-900">
        {{ Number(order.amount_to).toLocaleString() }} {{ order.to_currency }}
      </div>

      <!-- Status -->
      <div class="col-status">
        <span :class="['status-badge', statusClass]">
          {{ order.status || 'In progress' }}
        </span>
      </div>

      <!-- Actions -->
      <div class="col-actions">
        <button class="cancel-btn" v-if="order.status === 'In progress' || !order.status">
          Cancel
        </button>
      </div>
    </div>

    <!-- Expanded Content -->
    <transition name="expand">
      <div v-if="isOpen" class="transaction-details">
        <div class="details-grid">
          <div class="detail-item">
            <label>Amount paid</label>
            <span>{{ Number(order.amount_from).toLocaleString() }} {{ order.from_currency }}</span>
          </div>
          <div class="detail-item">
            <label>Exchange rate</label>
            <span>1 {{ order.from_currency }} = {{ order.rate }} {{ order.to_currency }}</span>
          </div>
          <div class="detail-item">
            <label>Fee paid</label>
            <span>25.00 {{ order.from_currency }}</span>
          </div>
          
          <!-- Receiving details based on type -->
          <div class="detail-item full-width mt-4" v-if="order.wallet_address">
            <label>Receiving wallet</label>
            <div class="flex items-center gap-2">
              <span class="truncate-address">{{ order.wallet_address }}</span>
              <button @click.stop="copyToClipboard(order.wallet_address)" class="copy-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="detail-item full-width mt-4" v-if="order.user_requisites">
            <label>Receiving Requisites</label>
            <span>{{ order.user_requisites }}</span>
          </div>

          <div class="detail-item mt-4" v-if="order.tx_hash">
            <label>Transaction Hash</label>
            <div class="flex items-center gap-2">
              <span class="truncate-address">{{ order.tx_hash }}</span>
              <button @click.stop="copyToClipboard(order.tx_hash)" class="copy-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

           <div class="detail-item mt-4" v-if="order.payment_link">
             <label>Confirmation</label>
             <a :href="order.payment_link" target="_blank" class="receipt-link">
               View Receipt
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
  margin-bottom: 2px;
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
.col-date { width: 140px; color: #667085; font-size: 14px; flex-shrink: 0; }
.col-type { width: 100px; flex-shrink: 0; }
.col-direction { width: 15rem; color: #667085; font-size: 14px; flex-shrink: 1; }
.col-amount { width: 150px; font-weight: 700; color: #101828; flex-shrink: 0; text-align: right; }
.col-status { width: 120px; flex-shrink: 0; display: flex; justify-content: flex-end; }
.col-actions { width: 100px; flex-shrink: 0; display: flex; justify-content: flex-end; }

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

.status-badge {
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-completed { background-color: #ECFDF3; color: #027A48; }
.status-failed { background-color: #FEF3F2; color: #B42318; }
.status-pending { background-color: #FFF9E9; color: #B54708; }

.cancel-btn {
  font-size: 13px;
  color: #98A2B3;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #E4E7EC;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: #FEE4E2;
  color: #D92D20;
  border-color: #FDA29B;
}

/* Details Section */
.transaction-details {
  padding: 24px 64px 32px 64px;
  background-color: #FAFAFA;
  border-top: 1px solid #F2F2F6;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item label {
  font-size: 11px;
  font-weight: 500;
  color: #98A2B3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-item span {
  font-size: 15px;
  font-weight: 600;
  color: #101828;
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
  .transaction-header { padding: 12px; gap: 8px; }
  .col-amount { flex-grow: 1; text-align: left; }
  .transaction-details { padding: 16px; }
}
</style>
