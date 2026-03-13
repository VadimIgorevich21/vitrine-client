<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { orderService } from '@/services/orderService'

const { t } = useI18n()
const router = useRouter()
const loading = ref(true)
const orders = ref<any[]>([])

const fetchOrders = async () => {
  loading.value = true
  try {
    const data = await orderService.getUserOrders()
    orders.value = data.data || []
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="orders-container min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Content -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="loading-spinner"></div>
      </div>

      <div v-else-if="orders.length === 0" class="empty-state-card">
        <div class="empty-content">
          <img src="@/assets/img/transaction-history/empty-orders-img.png" alt="No orders" class="empty-img" />
          <h2 class="page-title-h2">{{ t('orders.history.emptyTitle') }}</h2>
          <p class="empty-subtitle">{{ t('orders.history.emptySubtitle') }}</p>
          
          <button @click="router.push('/cabinet')" class="buy-now-btn">
            {{ t('orders.history.buyBtn') }}
          </button>
        </div>
      </div>

      <!-- Orders List (Placeholder for now) -->
      <div v-else-if="orders.length > 0" class="orders-list">
         <div class="card p-8 text-center text-gray-500">
            Transactions list will be here...
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-container {
  background-color: #F9FAFB;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
}

.create-order-btn {
  background-color: #2563EB;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s;
}

.create-order-btn:hover {
  background-color: #1D4ED8;
}

.card {
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #F3F4F6;
}

.form-section-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.empty-state-card {
  background-color: white;
  border-radius: 24px;
  padding: 80px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 448px;
  margin: 0 auto;
}

.empty-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-img {
  width: 120px;
  height: auto;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #1D2939;
  margin-bottom: 8px;
}

.empty-subtitle {
  color: #98A2B3;
  font-size: 16px;
  margin-bottom: 32px;
}

.buy-now-btn {
  background: linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%);
  color: white;
  padding: 16px 48px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2);
  transition: all 0.3s;
  cursor: pointer;
}

.buy-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(255, 107, 0, 0.3);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #F3F4F6;
  border-top: 4px solid #2563EB;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>