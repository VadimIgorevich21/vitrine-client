<template>
  <section class="support-contact-section">
    <div class="default-container px-4 py-32 text-center">
      <div class="support-content">
        <h2 class="page-title-h1 white-color mb-12">
          {{ t('home.support_title_p1') }} <span class="text-orange-gradient">{{ t('home.support_title_p2') }}</span>
        </h2>
        <p class="support-description mb-12">
          {{ t('home.support_description') }}
        </p>
        <div class="support-actions">
          <button class="btn-contact" @click="handleContact">
            {{ t('home.support_btn') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const handleContact = () => {
  router.push({ name: 'contacts' });
};
</script>

<style scoped>
.support-contact-section {
  /* background-color: #121212; Very dark background */
  background-color: #020202; /* Very dark background */
  position: relative;
  overflow: hidden;
}

.support-content {
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.support-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
}

.support-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #929AAA;
  margin-left: auto;
  margin-right: auto;
}

.btn-contact {
  background: linear-gradient(135deg, #FF4D00 0%, #FF8A00 100%);
  color: #ffffff;
  padding: 18px 64px;
  border-radius: 999px;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 15px 30px -10px rgba(255, 122, 0, 0.4);
}

.btn-contact:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -10px rgba(255, 122, 0, 0.6);
}

/* Optional: Add a subtle glow behind the button to match the premium look */
.support-actions {
  position: relative;
  display: inline-block;
}

.support-actions::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 122, 0, 0.2);
  filter: blur(40px);
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
}

@media (max-width: 768px) {
  .support-title {
    font-size: 2.5rem;
  }
  
  .btn-contact {
    padding: 16px 48px;
    width: 100%;
  }
}

.page-title-h1.white-color {
  color: #ffffff;
}
</style>
