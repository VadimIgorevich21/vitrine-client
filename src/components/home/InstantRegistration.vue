<template>
  <section class="instant-reg-section">
    <div class="default-container">
      <div class="reg-grid">
        <!-- Left Content -->
        <div class="reg-content">
          <h1 class="page-title-h1 mb-4">
            {{ t('home.instant_reg_title_p1') }}
          </h1>
          <div class="mb-8">
            <span class="page-subtitle-gradient">{{ t('home.instant_reg_title_p2') }}</span>
          </div>
          <p class="page-content-text mb-8">
            {{ t('home.instant_reg_subtitle') }}
          </p>
          <div class="reg-actions">
            <button class="btn-register" @click="handleAction">
              {{ t('home.instant_reg_button') }}
            </button>
          </div>
        </div>

        <!-- Right Graphics Area -->
        <div class="reg-image-wrapper">
          <div class="reg-main-graphic"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const handleAction = () => {
  if (authStore.user) {
    router.push({ name: 'cabinet' });
  } else {
    router.push({ name: 'auth' });
  }
};
</script>

<style scoped>
.instant-reg-section {
  position: relative;
  background-image: url('@/assets/img/home-page/instant-registration-bg.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  background-color: #fff;
}

:deep(.dark) .instant-reg-section {
  background-color: #0f172a;
}

.reg-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  align-items: center;
}

.reg-content {
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  z-index: 2;
}

.reg-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 700;
  color: #0f172a;
}

:deep(.dark) .reg-title {
  color: #f8fafc;
}

.text-gradient {
  background: linear-gradient(135deg, #94a3b8 0%, #cbd5e0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.reg-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #64748b;
  max-width: 550px;
}

:deep(.dark) .reg-subtitle {
  color: #94a3b8;
}

.btn-register {
  background: #0f172a;
  color: white;
  padding: 18px 48px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 35px -5px rgba(15, 23, 42, 0.4);
  background: #1e293b;
}

.reg-image-wrapper {
  position: relative;
  height: clamp(650px, 80vh, 900px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.reg-main-graphic {
  width: 120%;
  height: 100%;
  background-image: url('@/assets/img/home-page/instant-registration-img.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
  transform: scale(1.1);
  transform-origin: center right;
  margin-right: -15%;
  padding: 150px 0;
}

@media (max-width: 1400px) {
  .reg-main-graphic {
    transform: scale(1);
    margin-right: -10%;
  }
}

@media (max-width: 1024px) {
  .reg-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0;
  }

  .reg-content {
    align-items: center;
    margin-bottom: 2rem;
    padding: 150px 0;
  }

  .reg-image-wrapper {
    height: 400px;
    justify-content: center;
  }

  .reg-main-graphic {
    width: 100%;
    margin-right: 0;
    background-position: center;
    transform: scale(1);
  }

  .reg-subtitle {
    margin: 0 auto;
  }
}
</style>
