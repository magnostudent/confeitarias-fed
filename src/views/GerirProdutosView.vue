<template>
  <div class="container mt-5">
    <h1>Gerenciamento de Produtos</h1>
    <button class="btn btn-primary mb-3" @click="criarProduto">Criar Produto</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome do Produto</th>
          <th>Valor</th>
          <th>Descrição</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.nomeProduto }}</td>
          <td>R$ {{ produto.valor.toFixed(2) }}</td>
          <td>{{ produto.descricao }}</td>
          <td><img :src="produto.imagem" alt="Imagem do Produto" width="50" height="50" /></td>
          <td>
            <button class="btn btn-sm btn-primary me-2" @click="editarProduto(produto)">
              Editar
            </button>
            <button class="btn btn-sm btn-danger" @click="excluirProduto(produto)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import type { Produto } from '@/models/produto'
import type { Usuario } from '@/models/usuario'
import authService from '@/services/auth.service'
import confeitariaService from '@/services/confeitaria.service'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const produtos = ref<Produto[]>([])
    const usuario = ref<Usuario>()

    onMounted(async () => {
      usuario.value = await authService.getUsuario()

      produtos.value = await confeitariaService.getProdutosByUser(usuario.value)
    })

    const criarProduto = () => {
      router.push({ path: '/produto/novo' })
    }

    const editarProduto = (produto: { id: number }) => {
      router.push({ path: `/produto/editar/${produto.id}` })
    }

    const excluirProduto = async (produto: { nomeProduto: string; id: number }) => {
      if (confirm(`Deseja excluir o produto ${produto.nomeProduto}?`)) {
        await confeitariaService.excluirProduto(produto.id)
        produtos.value = await confeitariaService.getProdutosByUser(usuario.value)
      }
    }

    return {
      produtos,
      criarProduto,
      editarProduto,
      excluirProduto,
    }
  },
})
</script>
