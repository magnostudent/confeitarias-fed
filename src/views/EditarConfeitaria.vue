<template>
  <div>
    <FormConfeitaria :confeitariaProp="confeitaria" @criar-confeitaria="editarConfeitaria" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormConfeitaria from '../components/FormConfeitaria.vue'

import type { Confeitaria } from '@/models/Confeitaria'
import confeitariaService from '@/services/confeitaria.service'

export default defineComponent({
  components: { FormConfeitaria },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const confeitaria = ref<Confeitaria>()

    onMounted(async () => {
      const id = route.params.id
      confeitaria.value = await confeitariaService.getConfeitaria(+id)
    })

    const editarConfeitaria = async (confeitariaEditada: Confeitaria) => {
      await confeitariaService.editarConfeitaria(confeitariaEditada)
      router.push({ path: '/gerir-confeitarias' })
    }

    return {
      confeitaria,
      editarConfeitaria,
    }
  },
})
</script>
