<template>
  <div class="container mt-5">
    <h1>Gerenciamento de Confeitarias</h1>
    <button class="btn btn-primary mb-3" @click="criarConfeitaria">Criar Confeitaria</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="confeitaria in confeitarias" :key="confeitaria.id">
          <td>{{ confeitaria.nome }}</td>
          <td>{{ confeitaria.telefone }}</td>
          <td>{{ confeitaria.endereco.rua }} {{ confeitaria.endereco.numero }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-2" @click="editarConfeitaria(confeitaria)">
              Editar
            </button>
            <button class="btn btn-sm btn-danger" @click="excluirConfeitaria(confeitaria)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import type { Confeitaria } from '@/models/Confeitaria'
import confeitariaService from '@/services/confeitaria.service'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const confeitarias = ref<Confeitaria[]>([])

    onMounted(async () => {
      confeitarias.value = await confeitariaService.getConfeitarias()
    })

    const criarConfeitaria = () => {
      router.push({ path: 'confeitaria/novo' })
    }

    const editarConfeitaria = (confeitaria: { id: number }) => {
      router.push({ path: `/confeitaria/editar/${confeitaria.id}` })
    }

    const excluirConfeitaria = async (confeitaria: { nome: string; id: number }) => {
      if (confirm(`Deseja excluir a confeitaria ${confeitaria.nome}?`)) {
        await confeitariaService.excluirConfeitaria(confeitaria.id)
        confeitarias.value = await confeitariaService.getConfeitarias()
      }
    }

    return {
      confeitarias,
      criarConfeitaria,
      editarConfeitaria,
      excluirConfeitaria,
    }
  },
})
</script>
