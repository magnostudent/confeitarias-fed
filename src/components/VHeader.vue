<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid paddinL paddinR">
      <a class="navbar-brand" href="/">
        <img
          src="/logo.png"
          alt="Logo"
          width="30"
          height="30"
          class="d-inline-block align-text-top"
        />
        Confeitarias
      </a>
      <div class="d-flex justify-content-end align-items-center">
        <button v-if="!estaLogado()" class="btn btn-outline-light me-3" @click="redirectToLogin">
          Login
        </button>
        <div v-else class="dropdown me-3">
          <button
            class="btn btn-outline-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ getUsuario() }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li v-if="getPerfil() === 'admin'">
              <a class="dropdown-item" @click="redirectToGerenciarConfeitarias">Gerir Sistema</a>
            </li>
            <li v-if="getPerfil() === 'confeitaria'">
              <a class="dropdown-item" @click="redirectToGerenciarProdutos">Gerir Confeitaria</a>
            </li>
            <li><a class="dropdown-item" @click="logout">Logout</a></li>
          </ul>
        </div>
        <button
          v-if="!estaLogado()"
          class="btn btn-outline-light position-relative"
          @click="redirectToCarrinho"
        >
          <i class="bi bi-basket-fill"></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            v-if="quantidadeTotal > 0"
          >
            {{ quantidadeTotal }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
<style>
.paddinR {
  padding-right: 10%;
}
.paddinL {
  padding-left: 10%;
}
</style>

<script lang="ts">
import authService from '@/services/auth.service'
import { useCarrinhoStore } from '@/stores/carrinhoStore'
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const carrinhoStore = useCarrinhoStore()

    const quantidadeTotal = computed(() => carrinhoStore.getQuantidadeTotal())

    const estaLogado = () => {
      //  return authService.isLogado();
      return true
    }

    const getUsuario = () => {
      return authService.getUsuario()
    }

    const getPerfil = () => {
      const usuario = authService.getUsuario()

      if (usuario) {
        return usuario.perfil
      }
      //retirar
      // return 'admin'
      return 'confeitaria'
    }

    const redirectToLogin = () => {
      router.push({ path: '/login' })
    }

    const redirectToCarrinho = () => {
      router.push({ path: '/carrinho' })
    }

    const redirectToGerenciarConfeitarias = () => {
      router.push({ path: '/confeitaria/gerir' })
    }

    const redirectToGerenciarProdutos = () => {
      router.push({ path: '/produto/gerir' })
    }

    const logout = () => {
      authService.logout()
      router.push({ path: '/' })
    }

    return {
      redirectToLogin,
      redirectToCarrinho,
      redirectToGerenciarConfeitarias,
      redirectToGerenciarProdutos,
      logout,
      quantidadeTotal,
      estaLogado,
      getUsuario,
      getPerfil,
    }
  },
})
</script>
