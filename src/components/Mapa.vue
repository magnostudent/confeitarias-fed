<template>
  <div :id="mapId" style="height: 200px; width: 100%" ref="mapContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import L from 'leaflet'

export default defineComponent({
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    mapId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const mapContainer = ref(null)

    onMounted(() => {
      if (mapContainer.value) {
        const map = L.map(mapContainer.value).setView([props.latitude, props.longitude], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        }).addTo(map)

        const marker = L.marker([props.latitude, props.longitude], {
          icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
          }),
        }).addTo(map)
      }
    })

    return {
      mapContainer,
    }
  },
})
</script>
