/*
 * This is the initial API interface
 * we set the base URL for the API
 */

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { notify } from '@kyvg/vue3-notification'
import { router } from '@/router'
import { i18n } from '@/i18n'

const apiUrl = import.meta.env.VITE_APP_API_URL || ''

export const apiClient = axios.create({
  baseURL: apiUrl + '/client-api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // required to handle the CSRF token
})

// Request interceptor: locale для бэкенда (письма, сообщения API)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const locale = i18n.global.locale?.value ?? localStorage.getItem('locale') ?? 'en'
  config.headers['X-Locale'] = locale
  return config
})

// Request interceptor: Add Authorization token
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Request interceptor: Add Telegram auth
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const tgInitData = localStorage.getItem('TgInitData')
  if (tgInitData) {
    config.headers['Tg-Auth'] = `Tg ${tgInitData}`
  }
  return config
})

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const response = error.response

    if (!response) {
      // Network error or no response
      return Promise.reject(error)
    }

    const status = response.status

    // Maintenance mode
    if (status === 503) {
      router.push('/maintenance')
      return Promise.reject(error)
    }

    // Unauthorized — сбрасываем сессию и редирект на логин (в т.ч. из кабинета)
    if ([401, 419].includes(status)) {
      console.error('User not authorized, login failed with API')

      if (status === 401) {
        localStorage.removeItem('configs')
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')

        // Сбрасываем user в store без импорта store на верхнем уровне (избегаем циклической зависимости)
        import('@/stores/authStore').then(({ useAuthStore }) => {
          const auth = useAuthStore()
          auth.user = null
        })

        const currentPath = router.currentRoute.value.fullPath
        const isGuestPage = router.currentRoute.value.name && ['login', 'register', 'forgotPassword', 'passwordReset'].includes(router.currentRoute.value.name as string)
        if (!isGuestPage) {
          router.push({ path: '/auth', query: { redirect: currentPath } })
        }
      }
    }

    // Forbidden
    if (status === 403) {
      const message = (response.data as { message?: string })?.message || 'Access denied'
      notify({
        group: 'auth',
        type: 'error',
        duration: 10000,
        title: 'Authorization',
        text: message,
      })
    }

    // Validation error
    if (status === 422) {
      const message = (response.data as { message?: string })?.message || 'Validation error'
      notify({
        group: 'auth',
        type: 'error',
        duration: 10000,
        title: 'Authorization',
        text: message,
      })
    }

    // Rate limit or other 420 error
    if (status === 420) {
      window.location.href = '/not-found'
    }

    return Promise.reject(error)
  }
)
