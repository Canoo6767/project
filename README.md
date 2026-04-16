# Proyecto DevOps – Web Application

Este proyecto implementa una aplicación web con **frontend (Vue/Vite)**, **backend (Node.js)** y **base de datos (MongoDB)**.  
Se ejecuta en contenedores Docker y está preparado para despliegue en AWS EC2 usando CloudFormation.

## Arquitectura
Usuario → EC2 → Docker
- Frontend (puerto 5173)
- Backend (puerto 8080)
- Base de datos MongoDB (puerto 27017)

## Tecnologías utilizadas
- Node.js
- Vue/Vite
- MongoDB
- Docker / Docker Compose
- AWS (EC2, S3, CloudFormation)
- GitHub

## Ejecución local
```bash
docker compose up -d
