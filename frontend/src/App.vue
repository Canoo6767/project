<script setup>
import { ref } from 'vue'

const resultado = ref('')
const historial = ref([])

async function consultar() {
  const res = await fetch('http://localhost:8080/consulta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ciudad: 'Monterrey', fecha: new Date().toISOString() })
  })
  const data = await res.json()
  resultado.value = data.resultado
  await cargarHistorial()
}

async function cargarHistorial() {
  const res = await fetch('http://localhost:8080/historial')
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
