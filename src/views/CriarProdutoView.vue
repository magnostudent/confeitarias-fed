<template>
  <div>
    <FormProdutos :usuarioProp="usuario" @criar-produto="criarProduto" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormProdutos from '../components/FormProdutos.vue'
import confeitariaService from '@/services/confeitaria.service'
import type { Produto } from '@/models/produto'
import type { Usuario } from '@/models/usuario'
import authService from '@/services/auth.service'

export default defineComponent({
  components: { FormProdutos },
  setup() {
    const router = useRouter()
    const usuario = ref<Usuario>()

    onMounted(async () => {
      usuario.value = await authService.getUsuario()
    })

    const criarProduto = async (produto: Produto) => {
      await confeitariaService.criarProduto(produto)
      router.push({ name: 'produto/gerir' })
    }

    return {
      criarProduto,
      usuario,
    }
  },
})
</script>
