<template>
  <section class="simple-process-section">
    <div class="default-container px-4 py-24">
      <div class="process-grid">
        <!-- Left Content (Similar to InstantRegistration) -->
        <div class="process-content">
          <h1 class="page-title-h1 mb-4">
            {{ t('home.process_title_p1') }}
          </h1>
          <div class="mb-4">
            <span class="page-subtitle-gradient">{{ t('home.process_title_p2') }}</span>
          </div>
          <h2 class="process-subtitle-small mb-8">
             {{ t('home.process_title_p3') }}
          </h2>
          <p class="page-content-text mb-8">
            {{ t('home.process_description') }}
          </p>
          <div class="process-actions">
            <button class="btn-get-started">
              {{ t('home.process_btn') }}
            </button>
          </div>
        </div>

        <!-- Right Steps List -->
        <div class="process-steps">
          <div class="steps-container">
            <!-- Step 1 -->
            <div class="step-item">
              <div class="step-marker-container">
                <div class="step-marker active">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5L4.66667 9.5L13 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="step-card">
                <h3 class="step-title">{{ t('home.process_step1_title') }}</h3>
                <p class="step-desc">{{ t('home.process_step1_desc') }}</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="step-item">
              <div class="step-marker-container">
                <div class="step-marker">02</div>
              </div>
              <div class="step-card">
                <h3 class="step-title">{{ t('home.process_step2_title') }}</h3>
                <p class="step-desc">{{ t('home.process_step2_desc') }}</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="step-item">
              <div class="step-marker-container">
                <div class="step-marker">03</div>
              </div>
              <div class="step-card">
                <h3 class="step-title">{{ t('home.process_step3_title') }}</h3>
                <p class="step-desc">{{ t('home.process_step3_desc') }}</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="step-item">
              <div class="step-marker-container">
                <div class="step-marker">04</div>
              </div>
              <div class="step-card">
                <h3 class="step-title">{{ t('home.process_step4_title') }}</h3>
                <p class="step-desc">{{ t('home.process_step4_desc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.simple-process-section {
  background-color: #F9FAFB;
  border-top: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
}

:deep(.dark) .simple-process-section {
  background-color: #0f172a;
  border-color: rgba(255, 255, 255, 0.05);
}

.process-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 6rem;
  align-items: center;
}



.process-subtitle-small {
  font-weight: 500;
  font-size: 36px;
  line-height: 120%;
  color: #929AAA;
}

.btn-get-started {
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

.btn-get-started:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 35px -5px rgba(15, 23, 42, 0.4);
  background: #1e293b;
}

/* Steps Styles */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.step-marker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 30px;
}

.step-marker {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #929AAA;
  border: 1px solid #E5E7EB;
  background: white;
  z-index: 2;
  transition: all 0.3s ease;
}

.step-marker.active {
  background: #FF7A00;
  border-color: #FF7A00;
  box-shadow: 0 10px 20px -5px rgba(255, 122, 0, 0.4);
}

/* .step-line removed */

.step-card {
  flex: 1;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateX(10px);
  border-color: rgba(255, 122, 0, 0.1);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.08);
}

.step-title {
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 16px;
  color: #667085;
  line-height: 1.5;
}

:deep(.dark) .step-marker {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark) .step-card {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.05);
}

:deep(.dark) .step-title {
  color: #f8fafc;
}

:deep(.dark) .step-desc {
  color: #94a3b8;
}

/* .step-line dark removed */

@media (max-width: 1024px) {
  .process-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .process-content {
    position: static;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .step-item {
    gap: 1.5rem;
  }
}
</style>
