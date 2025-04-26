<template>
  <div class="container mt-5">
    <h1>Criar Confeitaria</h1>
    <form @submit.prevent="criarConfeitaria">
      <div class="row">
        <div class="col-md-6">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nome" v-model="confeitaria.nome" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="telefone" class="form-label">Telefone</label>
          <input type="text" class="form-control" id="telefone" v-model="confeitaria.telefone" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label for="latitude" class="form-label">Latitude</label>
          <input type="text" class="form-control" id="rua" v-model="confeitaria.latitude" />
        </div>
        <div class="col-md-3">
          <label for="longitude" class="form-label">Longitude</label>
          <input type="text" class="form-control" id="rua" v-model="confeitaria.longitude" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="cep" class="form-label">CEP</label>
          <input
            type="text"
            class="form-control"
            id="cep"
            v-model="confeitaria.endereco.cep"
            @blur="buscarEndereco"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="rua" class="form-label">Rua</label>
          <input type="text" class="form-control" id="rua" v-model="confeitaria.endereco.rua" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <label for="numero" class="form-label">Número</label>
          <input
            type="text"
            class="form-control"
            id="numero"
            v-model="confeitaria.endereco.numero"
          />
        </div>
        <div class="col-md-4">
          <label for="bairro" class="form-label">Bairro</label>
          <input
            type="text"
            class="form-control"
            id="bairro"
            v-model="confeitaria.endereco.bairro"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <label for="cidade" class="form-label">Cidade</label>
          <input
            type="text"
            class="form-control"
            id="cidade"
            v-model="confeitaria.endereco.cidade"
          />
        </div>
        <div class="col-md-2">
          <label for="estado" class="form-label">Estado</label>
          <input
            type="text"
            class="form-control"
            id="estado"
            v-model="confeitaria.endereco.estado"
          />
        </div>
      </div>
      <div class="row margin">
        <div class="col-md-2">
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style>
.margin {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  emits: ['criar-confeitaria'],
  props: {
    confeitariaProp: {
      type: Object,
      default: () => ({
        id: 0,
        nome: '',
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
        },
        latitude: 0,
        longitude: 0,
        telefone: '',
      }),
    },
  },
  setup(props, context) {
    const confeitaria = ref({ ...props.confeitariaProp })

    watchEffect(() => {
      confeitaria.value = { ...props.confeitariaProp }
    })

    const buscarEndereco = async () => {
      // Implemente a lógica para buscar o endereço pelo CEP
    }

    const criarConfeitaria = () => {
      context.emit('criar-confeitaria', confeitaria.value)
    }

    return {
      confeitaria,
      buscarEndereco,
      criarConfeitaria,
    }
  },
})
</script>
