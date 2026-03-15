<template>
  <div class="kyc-container">
    <div v-if="step === 'idle'">
      <button @click="startKyc" :disabled="loading" class="btn-start">
        {{ loading ? t('cabinet.verification_page.loading') : t('cabinet.verification_page.verifyIdentity') }}
      </button>
    </div>

    <div v-show="step === 'process'" ref="sdkContainer" class="sdk-mount-point"></div>

    <div v-if="step === 'completed'">
      <h3>{{ t('cabinet.verification_page.verificationCompleted') }}</h3>
      <p>{{ t('cabinet.verification_page.awaitStatus') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import Allpass from '@allpass/web-sdk'; // Импортируем из NPM
import axios from 'axios';

const { t } = useI18n();

const step = ref('idle'); // idle, process, completed
const loading = ref(false);
const sdkContainer = ref(null);
let allpassInstance = null;

const startKyc = async () => {
  loading.value = true;
  try {
    // Получаем токен от вашего Laravel (AllpassController@start)
    const { data } = await axios.post('/api/kyc/start');

    if (data.token) {
      step.value = 'process';
      initSDK(data.token);
    }
  } catch (err) {
    console.error('Ошибка сессии:', err);
    alert(t('cabinet.verification_page.initError'));
  } finally {
    loading.value = false;
  }
};

const initSDK = (token) => {
  // Создаем экземпляр
  allpassInstance = new Allpass({
    token: token,
    container: sdkContainer.value, // Передаем DOM-элемент через ref
    onComplete: (data) => {
      console.log('User finished!', data);
      step.value = 'completed';
    },
    onCancel: () => {
      step.value = 'idle';
    },
    onError: (err) => {
      console.error('Allpass SDK Error:', err);
      step.value = 'idle';
    }
  });

  // Запуск
  allpassInstance.mount();
};

// Важно уничтожать экземпляр при закрытии компонента
onBeforeUnmount(() => {
  if (allpassInstance && typeof allpassInstance.unmount === 'function') {
    allpassInstance.unmount();
  }
});
</script>

<style scoped>
.sdk-mount-point {
  width: 100%;
  height: 600px; /* Обязательно фиксированная высота */
  border-radius: 12px;
  background: #f9f9f9;
}
.btn-start {
  padding: 12px 24px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>