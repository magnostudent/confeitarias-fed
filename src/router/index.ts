import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authGuard from '@/guards/auth.guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/carrinho',
      name: 'Carrinho',
      component: () => import('../views/CarrinhoView.vue'),
    },
    {
      path: '/produto/gerir',
      name: 'Gerir Produtos',
      component: () => import('../views/GerirProdutosView.vue'),
    },
    {
      path: '/produto/novo',
      name: 'Criar Produtos',
      component: () => import('../views/CriarProdutoView.vue'),
    },
    {
      path: '/produto/editar/:id',
      name: 'Editar Produtos',
      component: () => import('../views/EditarProdutoView.vue'),
    },
    {
      path: '/confeitaria/gerir',
      name: 'Gerir Confeitarias',
      component: () => import('../views/GerirConfeitariasView.vue'),
    },
    {
      path: '/confeitaria/:id',
      name: 'Confeitararia',
      component: () => import('../views/ConfeitariaView.vue'),
    },
    {
      path: '/confeitaria/novo',
      name: 'Criar Confeitaria',
      component: () => import('../views/CriarConfeitaria.vue'),
    },
    {
      path: '/confeitaria/editar/:id',
      name: 'Editar Confeioraria',
      component: () => import('../views/EditarConfeitaria.vue'),
    },
  ],
})

router.beforeEach(authGuard)

export default router
