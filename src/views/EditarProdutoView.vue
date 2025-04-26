<template>
  <div>
    <FormProdutos :produtoProp="produto" :usuarioProp="usuario" @criar-produto="editarProduto" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormProdutos from '../components/FormProdutos.vue'
import confeitariaService from '@/services/confeitaria.service'
import type { Produto } from '@/models/produto'
import type { Usuario } from '@/models/usuario'
import authService from '@/services/auth.service'

export default defineComponent({
  components: { FormProdutos },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const produto = ref<Produto>()
    const usuario = ref<Usuario>()

    onMounted(async () => {
      const id = route.params.id
      produto.value = await confeitariaService.getProduto(+id)
      usuario.value = await authService.getUsuario();
    })

    const editarProduto = async (produtoEditado) => {
      await confeitariaService.editarProduto(produtoEditado)
      router.push({ name: 'produto/gerir' })
    }

    return {
      produto,
      usuario,
      editarProduto,
    }
  },
})
</script>
