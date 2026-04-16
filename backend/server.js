const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
app.use(cors())


const app = express()
app.use(express.json())

// Modelo
const consultaSchema = new mongoose.Schema({
  ciudad: String,
  fecha: String,
  resultado: String
})
const Consulta = mongoose.model('Consulta', consultaSchema)

// Logs
const logPath = path.join(__dirname, 'logs', 'app.log')
function log(msg) {
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`)
}

// Endpoint: consulta con OpenWeather (POST)
app.post('/consulta', async (req, res) => {
  const { ciudad, fecha } = req.body
  try {
    const apiKey = process.env.OPENWEATHER_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
    const response = await fetch(url)
    const data = await response.json()

    const resultado = `Clima en ${ciudad}: ${data.weather[0].description}, ${data.main.temp}°C`

    const consulta = new Consulta({ ciudad, fecha, resultado })
    await consulta.save()

    log(`INFO: Consulta realizada para ${ciudad} en ${fecha}`)
    res.json({ resultado })
  } catch (err) {
    log(`ERROR: Falló consulta para ${ciudad} en ${fecha} - ${err.message}`)
    res.status(500).json({ error: 'Error consultando clima' })
  }
})

// Nuevo Endpoint: consulta rápida (GET)
app.get('/weather', async (req, res) => {
  const ciudad = req.query.city || 'Monterrey'
  try {
    const apiKey = process.env.OPENWEATHER_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
    const response = await fetch(url)
    const data = await response.json()

    res.json({
      ciudad,
      descripcion: data.weather[0].description,
      temperatura: data.main.temp
    })
  } catch (err) {
    res.status(500).json({ error: 'Error consultando clima' })
  }
})

// Endpoint: historial
app.get('/historial', async (req, res) => {
  const consultas = await Consulta.find().sort({ fecha: -1 })
  res.json(consultas)
})

// Endpoint: última consulta
app.get('/ultima', async (req, res) => {
  const ultima = await Consulta.findOne().sort({ fecha: -1 })
  res.json(ultima)
})

app.listen(8080, () => console.log('Backend escuchando en puerto 8080'))
