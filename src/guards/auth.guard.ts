import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import authService from '../services/auth.service'

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = authService.getToken()
  if (to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

export default authGuard
