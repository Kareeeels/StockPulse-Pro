#!/bin/bash

# Script de Deploy Automático para StockPulse Pro en Ubuntu 24.04
# Ejecutar como root o con sudo

set -e  # Salir en caso de error

echo "========================================="
echo "  Deploy de StockPulse Pro"
echo "========================================="

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}1. Actualizando paquetes...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}2. Instalando dependencias (Java 17, Maven, PostgreSQL, Git, screen)...${NC}"
apt install openjdk-17-jdk maven postgresql postgresql-contrib git screen python3 -y

echo -e "${YELLOW}3. Configurando PostgreSQL...${NC}"
# Establecer contraseña de postgres y crear BD
sudo -u postgres psql << EOF
ALTER USER postgres WITH PASSWORD 'Axelob12';
CREATE DATABASE IF NOT EXISTS stockpulse_db;
EOF

echo -e "${YELLOW}4. Clonando/actualizando repositorio en /opt/StockPulse-Pro...${NC}"
cd /opt
if [ -d "StockPulse-Pro" ]; then
    echo "Repositorio existe, actualizando..."
    cd StockPulse-Pro
    git pull origin main
else
    echo "Clonando repositorio..."
    git clone https://github.com/Kareeeels/StockPulse-Pro.git
    cd StockPulse-Pro
fi

echo -e "${YELLOW}5. Compilando Backend...${NC}"
cd backend
mvn clean package -DskipTests

echo -e "${YELLOW}6. Deteniendo servicios anteriores (si existen)...${NC}"
pkill -f "stockpulse-pro" || true
pkill -f "python3 -m http.server 3001" || true
screen -S stockpulse-backend -X quit || true
screen -S stockpulse-frontend -X quit || true
sleep 2

echo -e "${YELLOW}7. Iniciando Backend en puerto 9090 (screen: stockpulse-backend)...${NC}"
screen -dmS stockpulse-backend bash -c "cd /opt/StockPulse-Pro/backend && java -jar target/stockpulse-pro-1.0.0.jar"

echo -e "${YELLOW}8. Iniciando Frontend en puerto 9091 (screen: stockpulse-frontend)...${NC}"
screen -dmS stockpulse-frontend bash -c "cd /opt/StockPulse-Pro/frontend && python3 -m http.server 9091"

echo -e "${YELLOW}9. Configurando Firewall (ufw)...${NC}"
ufw allow 22/tcp
ufw allow 9090/tcp
ufw allow 9091/tcp
echo "y" | ufw enable

echo -e "\n${GREEN}========================================="
echo "  ✅ DEPLOY COMPLETADO!"
echo "=========================================${NC}"
echo ""
echo "  📱 Frontend: http://194.163.180.138:9091/login.html"
echo "  🖥️  Backend API: http://194.163.180.138:9090/api"
echo ""
echo "  Credenciales de acceso:"
echo "  Usuario: admin"
echo "  Contraseña: 12345"
echo ""
echo "  Para ver los logs del backend: screen -r stockpulse-backend"
echo "  Para ver los logs del frontend: screen -r stockpulse-frontend"
echo "  (Para salir de screen: Ctrl + A, luego D)"
echo ""
