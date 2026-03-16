<template>
  <div class="account-view">
    <!-- Turnover Section (Only if verified) -->
    <div v-if="isVerified" class="turnover-card mb-6">
      <div class="turnover-content">
        <h2 class="page-title-h2 mb-8">{{ t('cabinet.account_page.turnover_title') }}</h2>

        <div class="turnover-stats">
          <div class="stat-item">
            <span class="stat-label">{{ t('cabinet.account_page.crypto_purchased') }}</span>
            <div class="stat-value">
              {{ formatCurrency(authStore.user?.default_currency_info?.buyTotal) }} <span class="currency-unit">{{ authStore.user?.default_currency }}</span>
            </div>
          </div>

          <div class="stat-item">
            <span class="stat-label">{{ t('cabinet.account_page.crypto_sold') }}</span>
            <div class="stat-value">
              {{ formatCurrency(authStore.user?.default_currency_info?.sellTotal) }} <span class="currency-unit">{{ authStore.user?.default_currency }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="turnover-bg"></div>
    </div>

    <!-- Personal Information Section -->
    <div class="info-card mb-6">
      <h2 class="section-title mb-8">{{ t('cabinet.account_page.personal_info_title') }}</h2>

      <div class="info-grid">
        <!-- Default Currency -->
        <div class="info-item">
          <span class="info-label">{{ t('cabinet.account_page.default_currency') }}</span>
          <div class="info-value-wrapper">
             <UniversalSelect
               v-if="authStore.user"
               :model-value="authStore.user.default_currency || 'EUR'"
               :items="configStore.fiatCurrencies"
               item-key="code"
               label-path="code"
               icon-path="icon"
               :borderless="false"
               align="left"
               @update:model-value="handleCurrencyChange"
               class="currency-select"
             />
          </div>
        </div>

        <!-- Country -->
        <div class="info-item">
          <span class="info-label">{{ t('cabinet.account_page.country') }}</span>
          <div class="info-value-wrapper">
            <div class="value-with-icon">
              <span class="country-flag">🇺🇦</span>
              <span class="value-text">Ukraine</span>
              <button class="edit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 5L19 8.5M17.5 3L21 6.5L11.5 16H8V12.5L17.5 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 21H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Phone Number -->
        <div class="info-item">
          <span class="info-label">{{ t('cabinet.account_page.phone_number') }}</span>
          <div class="info-value-wrapper">
            <div class="value-with-icon">
              <span class="value-text">{{ authStore.user?.phone || '—' }}</span>
              <button class="edit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 5L19 8.5M17.5 3L21 6.5L11.5 16H8V12.5L17.5 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 21H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="info-item">
          <span class="info-label">{{ t('cabinet.account_page.email') }}</span>
          <div class="info-value-wrapper">
            <div class="value-with-icon">
              <span class="value-text">{{ authStore.user?.email || '—' }}</span>
              <button class="edit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 5L19 8.5M17.5 3L21 6.5L11.5 16H8V12.5L17.5 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 21H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- KYC Section -->
    <div class="info-card">
      <h2 class="section-title mb-6">{{ t('cabinet.account_page.kyc_status_title') }}</h2>

      <div class="kyc-status">
        <!-- Verified State -->
        <div v-if="isVerified" class="verified-badge">
          <div class="check-icon">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L5 9L13 1" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="status-text">{{ t('cabinet.account_page.identity_verified') }}</span>
        </div>

        <!-- Unverified State -->
        <div v-else class="unverified-card flex items-center justify-between w-full">
          <div class="flex items-center gap-4">
            <div class="warning-circle-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0674 4.76465L29.5794 24.7033C29.755 25.0073 29.8474 25.3522 29.8474 25.7033C29.8474 26.0544 29.755 26.3993 29.5795 26.7033C29.4039 27.0073 29.1515 27.2598 28.8474 27.4353C28.5434 27.6109 28.1985 27.7033 27.8474 27.7033H4.82344C4.47237 27.7033 4.12748 27.6109 3.82345 27.4353C3.51942 27.2598 3.26695 27.0073 3.09142 26.7033C2.91589 26.3993 2.82348 26.0544 2.82349 25.7033C2.82349 25.3522 2.9159 25.0073 3.09144 24.7033L14.6034 4.76465C15.3728 3.43132 17.2968 3.43132 18.0674 4.76465ZM16.3354 20.5673C15.9818 20.5673 15.6427 20.7078 15.3926 20.9578C15.1426 21.2079 15.0021 21.547 15.0021 21.9007C15.0021 22.2543 15.1426 22.5934 15.3926 22.8435C15.6427 23.0935 15.9818 23.234 16.3354 23.234C16.6891 23.234 17.0282 23.0935 17.2782 22.8435C17.5283 22.5934 17.6688 22.2543 17.6688 21.9007C17.6688 21.547 17.5283 21.2079 17.2782 20.9578C17.0282 20.7078 16.6891 20.5673 16.3354 20.5673ZM16.3354 11.234C16.0089 11.234 15.6937 11.3539 15.4496 11.5709C15.2056 11.7879 15.0496 12.087 15.0114 12.4113L15.0021 12.5673V17.9006C15.0025 18.2405 15.1326 18.5674 15.3659 18.8145C15.5992 19.0616 15.918 19.2103 16.2573 19.2302C16.5966 19.2501 16.9306 19.1398 17.1912 18.9216C17.4518 18.7035 17.6193 18.3941 17.6594 18.0566L17.6688 17.9006V12.5673C17.6688 12.2137 17.5283 11.8746 17.2782 11.6245C17.0282 11.3745 16.6891 11.234 16.3354 11.234Z" fill="#FF8A00"/>
              </svg>
            </div>
            <span class="unverified-text">{{ t('cabinet.account_page.kyc_not_verified_message') }}</span>
          </div>
          <button @click="goToVerification" class="btn-complete-kyc">
            {{ t('cabinet.account_page.complete_kyc') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useConfigStore } from '@/stores/syncConfigs';
import UniversalSelect from '@/components/common/UniversalSelect.vue';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const configStore = useConfigStore();

onMounted(async () => {
  await authStore.updateUser();
  await configStore.getMainConfigs();
});

const isVerified = computed(() => authStore.user?.kyc_verified === true);

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return '0.00';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

const handleCurrencyChange = async (currency: string) => {
  try {
    await authStore.changeDefaultCurrency(currency);
  } catch (error) {
    console.error('Failed to change default currency:', error);
  }
};

const goToVerification = () => {
  router.push('/cabinet/verification');
};
</script>

<style scoped>
.account-view {
  color: #0F1116;
}

/* Warning Banner Styles */
.kyc-warning-banner {
  background: #F6851B;
  color: white;
  padding: 16px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;
}

.kyc-warning-banner:hover {
  background: #e67a15;
}

.warning-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.warning-text {
  font-size: 16px;
  font-weight: 500;
}

.arrow-icon {
  opacity: 0.8;
}

/* Card Styles */
.turnover-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  min-height: 220px;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.turnover-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.turnover-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/account/turnover-bg.png');
  background-position: right center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}

.section-title {
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0;
  color: #101828;
}

.turnover-stats {
  display: flex;
  gap: 80px;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #B0B8C6;
  margin-bottom: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0;
}

.stat-value {
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  letter-spacing: 0;
  color: #101828;
}

.currency-unit {
  color: #929AAA;
  margin-left: 4px;
}

.info-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.info-label {
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0;
  display: block;
  color: #B0B8C6;
  margin-bottom: 12px;
}

.currency-select {
  width: auto;
  min-width: 140px;
}

:deep(.currency-select .selected-item-button.normal) {
  background-color: #F8F9FA;
  border: 1px solid #F2F2F6;
  border-radius: 8px;
  padding: 8px 16px;
  min-height: 48px;
  max-width: 150px;
}

:deep(.currency-select .item-label) {
  color: #929AAA;
  font-weight: 500;
  font-size: 16px;
}

:deep(.currency-select .arrow-icon) {
  color: #929AAA;
  width: 14px;
  height: 14px;
}

.value-with-icon {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 500;
  color: #101828;
  height: 48px; /* Align with select height */
}

.edit-btn {
  color: #929AAA;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: 4px;
}

.edit-btn:hover {
  color: #101828;
  transform: scale(1.1);
}

.country-flag {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.kyc-status {
  display: flex;
  align-items: center;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}

.check-icon {
  width: 24px;
  height: 24px;
  background: #10B981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0;
  color: #101828;
}

/* Unverified Card Styles */
.unverified-text {
  font-size: 15px;
  color: #0F1116;
  font-weight: 500;
  max-width: 800px;
  margin-right: 20px;
}

.btn-complete-kyc {
  background: linear-gradient(135deg, #FF4D00 0%, #FF8A00 100%);
  color: white;
  padding: 12px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s;
  box-shadow: 0 10px 20px -5px rgba(255, 122, 0, 0.4);
}

.btn-complete-kyc:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -5px rgba(255, 122, 0, 0.5);
  cursor: pointer;
}

@media (max-width: 1024px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .turnover-stats {
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .unverified-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .btn-complete-kyc {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .turnover-stats {
    flex-direction: column;
    gap: 24px;
  }

  .stat-value {
    font-size: 24px;
  }

  .turnover-bg {
    opacity: 0.3;
  }
}
</style>

