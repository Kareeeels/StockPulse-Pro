# Guía de Deploy en VPS (Ubuntu 24.04)

## Información del VPS
- IP: 194.163.180.138
- OS: Ubuntu 24.04
- Backend port: 10000
- Frontend port: 10001

## Paso 1: Conectar al VPS via SSH
```bash
ssh root@194.163.180.138
```

## Paso 2: Instalar dependencias en el VPS
```bash
# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar Java 17
sudo apt install openjdk-17-jdk -y

# Instalar Maven
sudo apt install maven -y

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Instalar Git
sudo apt install git -y
```

## Paso 3: Configurar PostgreSQL
```bash
# Cambiar a usuario postgres
sudo -u postgres psql

# Crear base de datos y usuario (ejecuta estos comandos en psql)
CREATE DATABASE stockpulse_db;
ALTER USER postgres WITH PASSWORD 'Axelob12';
\q
```

## Paso 4: Clonar el repositorio
```bash
cd /opt
git clone https://github.com/Kareeeels/StockPulse-Pro.git
cd StockPulse-Pro
```

## Paso 5: Ejecutar el Backend
```bash
cd backend
mvn clean package -DskipTests

# Ejecutar el jar (puedes usar screen o tmux para mantenerlo corriendo)
sudo apt install screen -y
screen -S stockpulse-backend
java -jar target/stockpulse-pro-1.0.0.jar

# Para salir de screen: Ctrl + A, luego D
# Para volver: screen -r stockpulse-backend
```

## Paso 6: Ejecutar el Frontend
```bash
# En otra terminal o screen
cd /opt/StockPulse-Pro/frontend

# Instalar un servidor simple (usaremos Python 3)
sudo apt install python3 -y

# Ejecutar el frontend en el puerto 10001
screen -S stockpulse-frontend
python3 -m http.server 10001
```

## Paso 7: Configurar Firewall (ufw)
```bash
sudo ufw allow 10000/tcp
sudo ufw allow 10001/tcp
sudo ufw enable
```

## Acceso a la aplicación
- **Frontend**: http://194.163.180.138:10001/login.html
- **Backend API**: http://194.163.180.138:10000/api

## Credenciales de acceso
- Usuario: admin
- Contraseña: 12345
