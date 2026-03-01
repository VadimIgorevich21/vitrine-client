import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import CabinetLayout from '@/layouts/CabinetLayout.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import AuthCallbackView from '@/views/auth/AuthCallbackView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import TermsOfServiceView from '@/views/TermsOfServiceView.vue'
import CabinetView from '@/views/CabinetView.vue'
import OrdersView from '@/views/OrdersView.vue'
import MaintenanceView from '@/views/MaintenanceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import {
  authenticated,
  getConfigs,
  roleRedirectAndTitle,
} from './middleware'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  // Публичные страницы — свой layout (хедер: имя + «Кабинет» или «Войти»)
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },

      {
        path: 'privacy',
        name: 'privacy',
        component: PrivacyPolicyView,
        meta: { title: 'Privacy Policy' },
      },
      {
        path: 'terms',
        name: 'terms',
        component: TermsOfServiceView,
        meta: { title: 'Terms of Service' },
      },
    ],
  },
  // Кабинет — только для авторизованных, свой layout
  {
    path: '/cabinet',
    component: CabinetLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'cabinet',
        component: CabinetView,
      },
      {
        path: 'orders',
        name: 'orders',
        component: OrdersView,
        meta: { title: 'Orders' },
      },
    ],
  },
  // Auth страницы — без layout (полноэкранный дизайн)
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/auth/callback',
    name: 'authCallback',
    component: AuthCallbackView,
  },
  // Без layout
  {
    path: '/maintenance',
    name: 'maintenance',
    component: MaintenanceView,
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFoundView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'catch-all',
    component: NotFoundView,
  },
]


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'exact-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Only scroll to top if the route actually changed (not just query/hash)
    if (to.path !== from.path) {
      return { top: 0 }
    }
    return false
  },
})

// Единый навигационный гард без использования next()
router.beforeEach(async (to) => {
  // 1) Проверка авторизации
  // Твоя функция authenticated уже возвращает RouteLocationRaw или undefined — это идеально
  const authRedirect = await authenticated(to)
  if (authRedirect) return authRedirect

  // 2) Редиректы по ролям и document.title
  const roleRedirect = roleRedirectAndTitle(to)
  if (roleRedirect) return roleRedirect

  // 3) Подгрузка конфигов для авторизованного пользователя
  // Просто дожидаемся выполнения, возвращать здесь ничего не нужно
  await getConfigs(to)

  // Если мы дошли до сюда и ничего не вернули, роутер просто разрешит переход
  return true
})

// export const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
//   linkExactActiveClass: 'exact-active',
// })
//
// // 1) Проверка авторизации и редиректы для гостевых маршрутов
// router.beforeEach(async (to, _from, next) => {
//   const redirect = await authenticated(to)
//   if (redirect) next(redirect)
//   else next()
// })
//
// // 2) Редиректы по ролям и document.title
// router.beforeEach((to, _from, next) => {
//   const redirect = roleRedirectAndTitle(to)
//   if (redirect) next(redirect)
//   else next()
// })
//
// // 3) Подгрузка конфигов для авторизованного пользователя
// router.beforeEach(async (to, _from, next) => {
//   await getConfigs(to)
//   next()
// })
