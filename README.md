# StockPulse Pro

Aplicación simple de gestión de acciones con login.

## Estructura del Proyecto
```
stockpulse-pro/
├── backend/          # Spring Boot backend
├── frontend/         # HTML/CSS/JS frontend
├── dart_utils/       # Archivo Dart de ejemplo
└── README.md
```

## Requisitos previos
- Java 17 o superior
- Maven
- PostgreSQL
- (Opcional) Dart SDK para ejecutar el archivo Dart

## Paso 1: Crear la base de datos en PostgreSQL

1. Abre psql o pgAdmin
2. Ejecuta los siguientes comandos:
```sql
CREATE DATABASE stockpulse_db;
```
3. (Opcional) Si tu usuario y contraseña de PostgreSQL no son "postgres"/"postgres", edita el archivo `backend/src/main/resources/application.properties` y actualiza las credenciales.

## Paso 2: Ejecutar el backend

1. Abre una terminal y navega a la carpeta `backend/`
2. Ejecuta:
```bash
mvnw spring-boot:run
```
O si tienes Maven instalado globalmente:
```bash
mvn spring-boot:run
```
El backend se ejecutará en http://localhost:8080

## Paso 3: Abrir el frontend

1. Navega a la carpeta `frontend/`
2. Abre el archivo `login.html` en tu navegador web (double-click o abre con tu navegador preferido)

## Datos de ejemplo para pruebas

Después de iniciar sesión, puedes agregar estas acciones de ejemplo:
- NVIDIA - NVDA - Tecnología - 124.50 - NASDAQ
- Google - GOOGL - Tecnología - 178.20 - NASDAQ
- BBVA - BBVA - Banca - 11.40 - BMV
- Apple - AAPL - Tecnología - 210.30 - NASDAQ

## Ejecutar el archivo Dart (opcional)

1. Asegúrate de tener Dart SDK instalado
2. Navega a la carpeta `dart_utils/`
3. Ejecuta:
```bash
dart run stock_calculator.dart
```
