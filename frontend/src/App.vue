<script setup>
import { ref } from 'vue'

const resultado = ref('')
const historial = ref([])

async function consultar() {
  const res = await fetch('http://3.87.96.167:8080/weather?city=Monterrey')
  const data = await res.json()
  resultado.value = `Clima en ${data.ciudad}: ${data.descripcion}, ${data.temperatura}°C`
  await cargarHistorial()
}

async function cargarHistorial() {
  const res = await fetch('http://3.87.96.167:8080/historial')
  historial.value = await res.json()
}
</script>

<template>
  <div>
    <button @click="consultar">Consultar clima</button>
    <p>{{ resultado }}</p>

    <h3>Historial</h3>
    <ul>
      <li v-for="c in historial" :key="c._id">
        {{ c.fecha }} - {{ c.ciudad }} → {{ c.resultado }}
      </li>
    </ul>
  </div>
</template>
