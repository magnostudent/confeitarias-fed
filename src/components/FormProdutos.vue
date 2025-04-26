<template>
  <div class="container mt-5">
    <h1>{{ produto.id ? 'Editar Produto' : 'Criar Produto' }}</h1>
    <form @submit.prevent="criarProduto">
      <div class="mb-3">
        <label for="nomeProduto" class="form-label">Nome do Produto</label>
        <input type="text" class="form-control" id="nomeProduto" v-model="produto.nomeProduto" />
      </div>
      <div class="mb-3">
        <label for="valor" class="form-label">Valor</label>
        <input type="number" class="form-control" id="valor" v-model="produto.valor" />
      </div>
      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <textarea class="form-control" id="descricao" v-model="produto.descricao"></textarea>
      </div>
      <div class="mb-3">
        <label for="imagem" class="form-label">Imagem</label>
        <input type="file" class="form-control" id="imagem" @change="uploadImagem" />
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  emits: ['criar-produto'],
  props: {
    usuarioProp: {
      type: Object,
      default: () => ({
        id: 0,
        nome: '',
        idade: 0,
        perfil: '',
        confeitaria: 0,
      }),
    },
    produtoProp: {
      type: Object,
      default: () => ({
        id: 0,
        nomeProduto: '',
        valor: 0,
        descricao: '',
        imagem: '',
      }),
    },
  },
  setup(props, context) {
    const produto = ref({ ...props.produtoProp })
    const usuario = ref({ ...props.usuarioProp })

    watchEffect(() => {
      produto.value = { ...props.produtoProp }
      usuario.value = { ...props.usuarioProp }
    })

    const uploadImagem = (event) => {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('imagem', file)

      // Faça o upload da imagem para uma pasta local do projeto
      // e retorne o path da imagem
      // Exemplo:
      // const path = await uploadImagemService.upload(formData);
      // produto.value.imagem = path;

      // Para fins de exemplo, vamos apenas simular o upload
      produto.value.imagem = 'path/to/imagem.jpg'
    }

    const criarProduto = () => {
      produto.value.confeitaria = usuario.value.confeitaria
      context.emit('criar-produto', produto.value)
    }

    return {
      usuario,
      produto,
      uploadImagem,
      criarProduto,
    }
  },
})
</script>
