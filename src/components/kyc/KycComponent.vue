<script setup>
import { ref } from 'vue'
import { apiClient } from "@/services/api.js";

let allpassStarted = ref(false)
let accessToken = ref('')

const startVerification = async () => {
  // запрос к твоему backend
  const { data } = await apiClient.post('/allpass/start')
  accessToken.value = data.token

  // инициализируем SDK
  window.Allpass.init({
    onLoad: () => console.log('Loaded'),
    onStart: () => console.log('Start flow'),
    onPassStep: (e) => console.log('Step', e.stepType),
    onComplete: (e) => {
      console.log('Completed')
      allpassStarted.value = false
    },
    onError: (e) => console.error('Error', e)
  })

  // запускаем верификацию
  window.Allpass.start(accessToken.value)
  allpassStarted.value = true
}
</script>

<template>
  <button @click="startVerification">
    Пройти верификацию
  </button>

  <div id="allpass" v-show="allpassStarted"></div>
</template>