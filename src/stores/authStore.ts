import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { router } from '@/router'
import { getError } from '@/utils/helpers'
import authService from '@/services/authService'
import type { User, LoginPayload } from '@/types/auth'

function isAuthError(err: unknown): boolean {
  const status = (err as AxiosError<unknown>)?.response?.status
  return status === 401 || status === 419
}

const USER_STORAGE_KEY = 'user'
const USER_ID_KEY = 'userId'
const CONFIGS_KEY = 'configs'

export const useAuthStore = defineStore('auth', () => {
  // state
  const user = ref<User | null>(null)
  const pinCodeAccess = ref(false)
  const toLogout = ref(false)
  const error = ref<string | Record<string, unknown> | null>(null)
  const loading = ref(false)

  // getters
  const identity = computed(() => user.value)
  const loggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => (user.value ? !!user.value.isAdmin : false))

  function is(roles: string | string[]): boolean {
    if (!user.value) return false
    const list = Array.isArray(roles) ? roles : [roles]
    return user.value.roles?.some((role) => list.includes(role)) ?? false
  }

  function can(permission: string): boolean {
    return user.value?.permissions?.includes(permission) ?? false
  }

  const toLogoutStatus = computed(() => toLogout.value)

  // actions
  async function telegramCheckAuth(payload: Record<string, unknown>) {
    try {
      // когда будет готов бэкенд — раскомментируйте в authService и вызовите:
      // return await authService.telegramCheckAuth(payload)
      return await Promise.resolve(payload)
    } catch (err) {
      error.value = getError(err)
      throw err
    }
  }

  async function login(payload: LoginPayload, redirectPath?: string): Promise<void> {
    try {
      await authService.login(payload)
      await getAuthUser()
      if (user.value) {
        router.push(redirectPath || '/cabinet')
      }
    } catch (err) {
      error.value = getError(err)
      throw err
    }
  }

  async function sendOtp(email: string): Promise<void> {
    try {
      error.value = null
      await authService.sendOtp(email)
    } catch (err) {
      error.value = getError(err)
      throw err
    }
  }

  async function verifyOtp(email: string, code: string, redirectPath?: string): Promise<void> {
    try {
      error.value = null
      await authService.verifyOtp(email, code)
      await getAuthUser()
      if (user.value) {
        router.push(redirectPath || '/cabinet')
      }
    } catch (err) {
      error.value = getError(err)
      throw err
    }
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout()
      user.value = null
      router.push({ path: '/auth' })
      localStorage.removeItem(CONFIGS_KEY)
      localStorage.removeItem(USER_STORAGE_KEY)
    } catch (err) {
      user.value = null
      error.value = getError(err)
    }
  }

  async function getAuthUser(): Promise<void> {
    try {
      loading.value = true
      // При жёсткой перезагрузке store пустой — всегда запрашиваем свежие данные пользователя с API.
      // При навигации внутри SPA используем кэш.
      const isColdStart = user.value === null
      const cached =
        !isColdStart ? localStorage.getItem(USER_STORAGE_KEY) : null
      const hasValidCache =
        cached &&
        cached !== 'undefined' &&
        cached !== 'null' &&
        cached.trim() !== ''
      if (!hasValidCache) {
        const response = await authService.getAuthUser()
        const data = response.data.data
        user.value = data
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))
      } else {
        try {
          user.value = JSON.parse(cached!) as User
        } catch {
          localStorage.removeItem(USER_STORAGE_KEY)
          const response = await authService.getAuthUser()
          const data = response.data.data
          user.value = data
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))
        }
      }
      if (!localStorage.getItem(USER_ID_KEY) && user.value?.id) {
        localStorage.setItem(USER_ID_KEY, String(user.value.id))
      }
    } catch (err) {
      user.value = null
      error.value = getError(err)
      // Не пробрасываем 401/419 — иначе guard не вызовет next() и навигация зависнет
      if (!isAuthError(err)) throw err
    } finally {
      loading.value = false
    }
  }

  async function updateUser(): Promise<void> {
    try {
      loading.value = true
      const response = await authService.getAuthUser()
      const data = response.data.data
      user.value = data
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))
      if (!localStorage.getItem(USER_ID_KEY) && data?.id) {
        localStorage.setItem(USER_ID_KEY, String(data.id))
      }
    } catch (err) {
      user.value = null
      error.value = getError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function cleanUserStorage(): void {
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(USER_ID_KEY)
    localStorage.removeItem('token')
    localStorage.removeItem(CONFIGS_KEY)
  }

  async function setToLogout(): Promise<void> {
    toLogout.value = true
    user.value = null
    await logout()
  }

  return {
    user,
    pinCodeAccess,
    toLogout,
    error,
    loading,

    identity,
    loggedIn,
    isAdmin,
    is,
    can,
    toLogoutStatus,

    telegramCheckAuth,
    login,
    sendOtp,
    verifyOtp,
    logout,
    getAuthUser,
    updateUser,
    cleanUserStorage,
    setToLogout,
  }
})
