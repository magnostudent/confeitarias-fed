<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h1 class="mb-3">{{ confeitaria?.nome }}</h1>
        <p class="text-secondary"><i class="fas fa-phone"></i> {{ confeitaria?.telefone }}</p>
      </div>
    </div>
    <hr class="my-4" />
    <h2 class="mb-4">Produtos</h2>
    <ListaProdutos :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ListaProdutos from '@/components/ListaProdutos.vue'
import confeitariaService from '@/services/confeitaria.service'
import type { Confeitaria } from '@/models/Confeitaria'

export default defineComponent({
  components: {
    ListaProdutos,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const confeitaria = ref<Confeitaria>()

    onMounted(async () => {
      const response = await confeitariaService.getConfeitaria(+id)
      confeitaria.value = response
    })

    return {
      confeitaria,
      id: Number,
    }
  },
})
</script>
