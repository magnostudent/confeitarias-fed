<template>
  <div class="row" v-for="confeitaria in confeitarias" :key="confeitaria.id">
    <div class="col-md-6">
      <div class="card marges">
        <div class="card-body">
          <h5 class="card-title">{{ confeitaria.nome }}</h5>
          <div class="card-text">
            <p>{{ confeitaria.endereco.cep }}</p>
            <p>{{ confeitaria.endereco.rua }} - {{ confeitaria.endereco.numero }}</p>
            <p>
              {{ confeitaria.endereco.bairro }} - {{ confeitaria.endereco.cidade }}/{{
                confeitaria.endereco.estado
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <Mapa :latitude="confeitaria.latitude" :longitude="confeitaria.longitude" />
    </div>
    <div class="col-md-2">
      <a class="btn btn-primary" :href="`/confeitaria/${confeitaria.id}`" role="button">Ver Loja</a>
    </div>
  </div>
</template>

<style>
.marges {
  margin: 15px;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Mapa from './Mapa.vue'
import type { Confeitaria } from '@/models/Confeitaria'
import confeitariaService from '@/services/confeitaria.service'

export default defineComponent({
  components: { Mapa },
  setup() {
    const confeitarias = ref<Confeitaria[]>([])

    onMounted(async () => {
      const response = await confeitariaService.getConfeitarias()
      confeitarias.value = response
    })

    return {
      confeitarias,
    }
  },
})
</script>
