<template>
  <div class="container mtop mbotton">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h2>Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Usuário</label>
                <input type="text" id="username" v-model="username" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
            </form>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
              <div
                id="toast-error"
                class="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div class="toast-header">
                  <strong class="me-auto">Erro</strong>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="toast-body">
                  {{ errorMessage }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.mtop {
  margin-top: 100px;
}
.mbotton {
  margin-bottom: 35%;
}
</style>

<script lang="ts">
import authService from '@/services/auth.service'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const login = async () => {
      try {
        await authService.login(username.value, password.value)

        router.push({ path: '/' })
      } catch {
        errorMessage.value = 'Erro ao realizar login. Verifique suas credenciais.'
        const toast = document.getElementById('toast-error')
        const toastInstance = new (window as any).bootstrap.Toast(toast)
        toastInstance.show()
      }
    }

    return {
      username,
      password,
      errorMessage,
      login,
    }
  },
})
</script>
