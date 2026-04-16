#!/bin/bash
set -e

echo "=== DEPLOY SCRIPT INICIADO ==="

# Si ya tienes el repo clonado, comenta estas dos líneas
# git clone https://github.com/Canoo6767/project.git
# cd project

echo "Construyendo imágenes y levantando contenedores..."
docker compose --env-file .env up -d --build

echo "=== DEPLOY COMPLETADO ==="
