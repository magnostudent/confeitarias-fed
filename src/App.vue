<script lang="ts">
import { defineComponent } from 'vue'
import VHeader from './components/VHeader.vue'
import VFooter from './components/VFooter.vue'

export default defineComponent({
  components: {
    VHeader,
    VFooter,
  },
})
</script>

<template>
  <div>
    <VHeader />
    <router-view />
    <VFooter />
  </div>
</template>
