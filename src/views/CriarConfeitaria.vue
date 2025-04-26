<template>
  <div>
    <FormConfeitaria @criar-confeitaria="criarConfeitaria" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import FormConfeitaria from '../components/FormConfeitaria.vue'
import confeitariaService from '@/services/confeitaria.service'
import type { Confeitaria } from '@/models/Confeitaria'

export default defineComponent({
  components: { FormConfeitaria },
  setup() {
    const router = useRouter()

    const criarConfeitaria = async (confeitariaNova: Confeitaria) => {
      await confeitariaService.criarConfeitaria(confeitariaNova)
      router.push({ path: '/gerir-confeitarias' })
    }

    return {
      criarConfeitaria,
    }
  },
})
</script>
