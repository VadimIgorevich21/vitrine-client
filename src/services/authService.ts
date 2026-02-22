import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { notify } from '@kyvg/vue3-notification'
import { apiClient } from '@/services/api'
import type { LoginPayload } from '@/types/auth'
import { i18n } from '@/i18n'

const apiUrl = import.meta.env.VITE_APP_API_URL ?? ''

export const authClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

// X-Locale для client-api (OTP-письма и ответы в выбранном языке)
authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const locale = i18n.global.locale?.value ?? localStorage.getItem('locale') ?? 'en'
  config.headers['X-Locale'] = locale
  return config
})

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    if (response?.status === 401) {
      console.info('User not authorized, login failed with API')
      const message = (response.data as { message?: string })?.message
      if (message) {
        notify({
          group: 'auth',
          type: 'error',
          duration: 10000,
          title: 'Authorization',
          text: message,
        })
      }
    }

    if (response?.status === 403) {
      const message = (response.data as { message?: string })?.message
      notify({
        group: 'auth',
        type: 'error',
        duration: 10000,
        title: 'Authorization',
        text: message ?? 'Access denied',
      })
    }

    if (response?.status === 420) {
      window.location.href = '/not-found'
    }

    return Promise.reject(error)
  }
)

//const USER_STORAGE_KEY = 'user'
const USER_ID_KEY = 'userId'
const TOKEN_KEY = 'token'

/** Base URL бэкенда без завершающего слэша */
function getApiBase(): string {
  return (apiUrl || '').replace(/\/$/, '')
}

/**
 * URL для входа через Google.
 * Редирект на этот URL; после входа бэкенд перенаправит на redirect_uri с token и token_type=Bearer.
 */
export function getGoogleAuthUrl(redirectUri?: string): string {
  const base = getApiBase()
  const uri = redirectUri ?? (typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '')
  const params = new URLSearchParams()
  if (uri) params.set('redirect_uri', uri)
  const query = params.toString()
  return `${base}/client-api/auth/google${query ? `?${query}` : ''}`
}

/**
 * Сохраняет токен после OAuth callback (query: token, token_type=Bearer).
 */
export function saveTokenFromCallback(token: string): void {
  if (token) localStorage.setItem(TOKEN_KEY, token)
}

export default {
  async login(payload: LoginPayload): Promise<{ token: string }> {
    await authClient.get('/sanctum/csrf-cookie')
    const { data } = await authClient.post<{ token: string }>('/client-api/auth/login', payload)
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
    }
    return data
  },

  logout(): Promise<unknown> {
    return apiClient
      .post('/logout')
      .then(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_ID_KEY)
      })
      .catch((err) => {
        console.error(err)
      })
  },

  getAuthUser() {
    return apiClient.get<{ data: import('@/types/auth').User }>('/auth/user')
  },

  async forgotPassword(payload: Record<string, unknown>) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/forgot-password', payload)
  },

  async resetPassword(payload: Record<string, unknown>) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/reset-password', payload)
  },

  async registerUser(payload: Record<string, unknown>) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/register', payload)
  },

  sendVerification(payload: Record<string, unknown>) {
    return authClient.post('/email/verification-notification', payload)
  },

  async sendOtp(email: string): Promise<unknown> {
    return authClient.post('/client-api/auth/otp/send', { email: email.trim() })
  },

  async verifyOtp(email: string, code: string): Promise<{ token: string }> {
    const { data } = await authClient.post<{ token: string }>('/client-api/auth/otp/verify', {
      email: email.trim(),
      otp: code.trim(),
    })
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
    }
    return data
  },

  // Telegram auth (раскомментируйте и настройте эндпоинты при необходимости)
  // async telegramCheckAuth(payload: Record<string, unknown>) {
  //   await authClient.get('/tg/csrf-token').then((res) => {
  //     localStorage.setItem('xsrfLocalToken', res.data.csrf_token)
  //   })
  //   return authClient.post('/tg/telegram-check-auth', payload)
  // },
}
