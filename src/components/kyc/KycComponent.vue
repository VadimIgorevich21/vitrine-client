<script setup>
import { ref } from 'vue'
import { apiClient } from "@/services/api.js";

let allpassStarted = ref(false)
let kycLink = ref('')

const startVerification = async () => {
  // запрос к твоему backend
  const { data } = await apiClient.post('/allpass/start')
  kycLink.value = data.link
  
  if (kycLink.value) {
    window.open(kycLink.value, '_blank')
  }

  allpassStarted.value = true
}
</script>

<template>
  <button @click="startVerification">
    Пройти верификацию
  </button>

  <div id="allpass" v-show="allpassStarted"></div>
</template>