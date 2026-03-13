<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { orderService } from '@/services/orderService'
import TransactionRow from '@/components/cabinet/orders/TransactionRow.vue'
import BasePagination from '@/components/common/BasePagination.vue'
// @ts-ignore – known exports resolution quirk in @vuepic/vue-datepicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const { t } = useI18n()
const router = useRouter()
const loading = ref(true)
const orders = ref<any[]>([])
const meta = ref({
  current_page: 1,
  per_page: 10,
  total: 0
})

const filters = ref({
  search: '',
  date_from: '',
  date_to: ''
})

// --- Date range picker ---
const dateRange = ref<[Date, Date] | null>(null)

const onDateRangeUpdate = (range: [Date, Date] | null) => {
  if (range && range[0] && range[1]) {
    const fmt = (d: Date): string => d.toISOString().split('T')[0] ?? ''
    filters.value.date_from = fmt(range[0])
    filters.value.date_to = fmt(range[1])
  } else {
    filters.value.date_from = ''
    filters.value.date_to = ''
  }
}

const clearDates = () => {
  dateRange.value = null
  filters.value.date_from = ''
  filters.value.date_to = ''
  fetchOrders(1)
}
// --- end date range picker ---

const fetchOrders = async (page = 1) => {
  loading.value = true
  try {
    const data = await orderService.getUserOrders({
      page,
      ...filters.value
    })
    orders.value = data.data || []
    const m = data.meta || data
    meta.value = {
      current_page: m.current_page ?? m.currentPage ?? 1,
      per_page: m.per_page ?? m.perPage ?? 10,
      total: m.total ?? 0
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
}

// Debounced search
let searchTimeout: any = null
watch(() => filters.value.search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchOrders(1)
  }, 500)
})

watch([() => filters.value.date_from, () => filters.value.date_to], () => {
  fetchOrders(1)
})

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="orders-container min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 class="page-title">Transaction history</h1>

        <!-- Filters -->
        <div class="filters-row">
          <!-- Search -->
          <div class="search-wrapper">
             <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             <input
               v-model="filters.search"
               type="text"
               placeholder="Enter asset name"
               class="search-input"
             />
          </div>

          <!-- Date Range Picker (icon-only trigger) -->
          <div class="date-picker-wrap">
            <VueDatePicker
              v-model="dateRange"
              range
              :enable-time-picker="false"
              auto-apply
              teleport="body"
              position="left"
              @update:model-value="onDateRangeUpdate"
            >
              <template #trigger>
                <!-- calendar icon — opens the picker -->
                <button
                  class="calendar-icon-btn"
                  :class="{ 'calendar-icon-btn--active': dateRange }"
                  type="button"
                  title="Select date range"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="cal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </template>
            </VueDatePicker>

            <!-- Clear button rendered OUTSIDE picker so it never blocks picker's click -->
            <button
              v-if="dateRange"
              class="clear-date-btn"
              type="button"
              title="Clear dates"
              @click="clearDates"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="cal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-if="loading && orders.length === 0" class="flex justify-center items-center py-20">
        <div class="loading-spinner"></div>
      </div>

      <div v-else-if="orders.length === 0" class="empty-state-card text-center">
        <div class="empty-content">
          <img src="@/assets/img/transaction-history/empty-orders-img.png" alt="No orders" class="empty-img" />
          <h2 class="page-title-h2">{{ t('orders.history.emptyTitle') }}</h2>
          <p class="empty-subtitle">{{ t('orders.history.emptySubtitle') }}</p>
          
          <button @click="router.push('/cabinet')" class="buy-now-btn">
            {{ t('orders.history.buyBtn') }}
          </button>
        </div>
      </div>

      <!-- Orders Table/List -->
      <div v-else class="orders-wrapper">
         <!-- Table Head -->
         <div class="table-header-labels">
            <div class="col-lbl col-chevron"></div>
            <div class="col-lbl col-date uppercase">Date</div>
            <div class="col-lbl col-type uppercase">Type</div>
            <div class="col-lbl col-direction uppercase">Direction</div>
            <div class="col-lbl col-amount uppercase text-right">Amount</div>
            <div class="col-lbl col-status uppercase text-right">Status</div>
            <div class="col-lbl col-actions"></div>
         </div>

         <div class="orders-list-card">
            <TransactionRow 
              v-for="order in orders" 
              :key="order.id" 
              :order="order" 
            />
         </div>

         <!-- Pagination -->
         <BasePagination 
           v-model="meta.current_page"
           :total="meta.total"
           :per-page="meta.per_page"
           @update:model-value="fetchOrders"
         />
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

.page-title-h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1D2939;
  margin-bottom: 8px;
}

/* Search and Filters */
.filters-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

@media (min-width: 768px) {
  .filters-row {
    width: auto;
  }
}

.search-wrapper {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  max-width: 320px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #98A2B3;
}

.search-input {
  width: 100%;
  background-color: white;
  border: 1px solid #F2F2F6;
  border-radius: 10px;
  padding: 10px 12px 10px 40px;
  font-size: 14px;
  color: #101828;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #2563EB;
}

.date-picker-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.calendar-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background-color: white;
  border: 1px solid #F2F2F6;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.calendar-icon-btn:hover {
  border-color: #D0D5DD;
  background-color: #F9FAFB;
}

.calendar-icon-btn--active {
  border-color: #2563EB;
  background-color: #EFF6FF;
}

.cal-icon {
  width: 20px;
  height: 20px;
  color: #667085;
}

.calendar-icon-btn--active .cal-icon {
  color: #2563EB;
}

/* Clear button overlaid on top-right of the calendar button */
.clear-date-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: #6B7280;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
}

.clear-date-btn .cal-icon {
  width: 10px;
  height: 10px;
  color: white;
}

/* Table Design */
.table-header-labels {
  display: flex;
  padding: 12px 16px;
  gap: 16px;
}

.col-lbl {
  font-size: 12px;
  font-weight: 600;
  color: #98A2B3;
  letter-spacing: 0.05em;
}

.col-chevron { width: 24px; flex-shrink: 0; }
.col-date { width: 140px; flex-shrink: 0; }
.col-type { width: 100px; flex-shrink: 0; }
.col-direction { width: 15rem; flex-shrink: 1; }
.col-amount { width: 150px; flex-shrink: 0; text-align: right; }
.col-status { width: 120px; flex-shrink: 0; display: flex; justify-content: flex-end; }
.col-actions { width: 100px; flex-shrink: 0; }

.orders-list-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #F2F2F6;
}

/* Empty & Loading States */
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

@media (max-width: 768px) {
  .table-header-labels { display: none; }
  .search-wrapper { max-width: none; }
}
</style>