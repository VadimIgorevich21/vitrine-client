import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useConfigStore } from '@/stores/syncConfigs'

const guestAuthRouteNames = [
  'login',
  'auth',
  'authCallback',
  'register',
  'forgotPassword',
  'passwordReset',
]

export async function getConfigs(to: RouteLocationNormalized): Promise<void> {
  const authStore = useAuthStore()
  if (
    !authStore.toLogoutStatus &&
    to.path !== '/logout' &&
    to.path !== '/maintenance'
  ) {
    if (authStore.user) {
      const configStore = useConfigStore()
      await configStore.getMainConfigs()
    }
  }
}

export async function updateNotifications(
  to: RouteLocationNormalized
): Promise<void> {
  const authStore = useAuthStore()
  if (
    !authStore.toLogoutStatus &&
    to.path !== '/logout' &&
    to.path !== '/maintenance'
  ) {
    if (authStore.user) {
      const configStore = useConfigStore()
      await configStore.updateConfigs()
    }
  }
}

const TOKEN_KEY = 'token'

export async function authenticated(
  to: RouteLocationNormalized
): Promise<RouteLocationRaw | undefined> {
  const authStore = useAuthStore()
  if (
    authStore.toLogoutStatus ||
    to.path === '/logout' ||
    to.path === '/maintenance'
  ) {
    return undefined
  }

  // Вызываем API только если есть токен или пользователь в store (проверка/обновление сессии).
  // Для гостя без токена не дергаем /auth/user — иначе 401 на каждый переход и возможный цикл редиректов.
  const hasToken = !!localStorage.getItem(TOKEN_KEY)
  if (hasToken || authStore.user) {
    await authStore.getAuthUser()
  }

  const meta = to.meta as { requiresAuth?: boolean }
  if (meta.requiresAuth && !authStore.user) {
    return {
      path: '/auth',
      query: { redirect: to.fullPath },
    }
  }

  const name = to.name as string | undefined
  if (authStore.user && name && guestAuthRouteNames.includes(name)) {
    return { path: '/operations' }
  }

  return undefined
}

export function roleRedirectAndTitle(
  to: RouteLocationNormalized
): RouteLocationRaw | undefined {
  const authStore = useAuthStore()
  if (!authStore.user) {
    setDocumentTitle(to)
    return undefined
  }

  if (to.path === '/' && authStore.is('internal balances access')) {
    return { path: '/customers', query: { type: 'cash' } }
  }
  if (
    (to.path === '/' || to.path === '/cashbox-operations') &&
    authStore.is('world cashier access')
  ) {
    return { path: '/customers', query: { type: 'world_balance' } }
  }
  if (
    (to.path === '/' || to.path === '/cryptocurrency-operations') &&
    authStore.is('security')
  ) {
    return { path: '/cashbox-operations' }
  }

  setDocumentTitle(to)
  return undefined
}

function setDocumentTitle(to: RouteLocationNormalized): void {
  const meta = to.meta as { title?: string }
  if (meta.title) {
    document.title = meta.title
  }
}
