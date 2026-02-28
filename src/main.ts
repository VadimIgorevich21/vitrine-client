import { watch } from 'vue'
import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import { pinia } from '@/stores'
import { i18n, LOCALE_STORAGE_KEY } from '@/i18n'
import { router } from '@/router'
import '@/assets/tailwind.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(Notifications)
app.use(Toast)

watch(
  () => i18n.global.locale.value,
  (locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
  },
  { immediate: true }
)

app.mount('#app')
