<template>
  <div>
    <button
      class="btn btn-primary"
      :disabled="loading"
      @click="pay"
    >
      {{ loading ? 'Processing...' : 'Test pa2222yment' }}
    </button>

    <div
      v-if="error"
      class="mt-3 text-danger"
    >
      {{ error }}
    </div>

    <div
      v-if="success"
      class="mt-3 text-success"
    >
      Payment success
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { apiClient } from "@/services/api.js";

const loading = ref(false);
const error = ref(null);
const success = ref(false);

const redirectTo3ds = (paymentResult) => {
  const form = document.createElement('form');

  form.method = 'POST';
  form.action = paymentResult.ACSURL;
  form.style.display = 'none';

  [
    ['PaReq', paymentResult.PaReq],
    ['MD', paymentResult.MD],
    ['TermUrl', "https://vitrine-admin.ironbit.io/third-party-payment-callback"],
  ].forEach(([name, value]) => {
    const input = document.createElement('input');

    input.type = 'hidden';
    input.name = name;
    input.value = value;

    form.appendChild(input);
  });

  document.body.appendChild(form);

  form.submit();
};

const pay = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;

  try {
    const response = await apiClient.get('/test/4g12hs/pay-card');

    const paymentResult = response.data.payment_result;

    if (!paymentResult) {
      throw new Error('Empty payment response');
    }

    switch (paymentResult.status) {
      case 'wait':
        redirectTo3ds(paymentResult);
        return;

      case 'OK':
        success.value = true;
        return;

      case 'error':
        error.value = paymentResult.errortext ??
          'Payment failed';
        return;

      default:
        error.value = `Unknown status: ${paymentResult.status}`;
    }
  } catch (e) {
    error.value =
      e?.response?.data?.message ??
      e?.message ??
      'Unexpected error';
  } finally {
    loading.value = false;
  }
};
</script>