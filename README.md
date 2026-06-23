# StockPulse Pro (Frontend)

Frontend de la aplicación StockPulse Pro, desarrollado con HTML, CSS y JavaScript.

## Repositorio del Backend
El backend está en un repositorio separado: https://github.com/Kareeeels/StockPulse-

## Estructura del Proyecto
```
stockpulse-pro/
├── frontend/         # HTML/CSS/JS frontend
├── dart_utils/       # Archivo Dart de ejemplo
└── README.md
```

## Requisitos previos
- (Opcional) Dart SDK para ejecutar el archivo Dart

## Ejecutar el frontend

1. Abre la carpeta `frontend/`
2. Abre el archivo `login.html` en tu navegador web (double-click o usa un servidor simple como Python HTTP Server)

## Configuración
El frontend está configurado para conectarse al backend en `http://localhost:8080/api`. Si necesitas cambiar la URL, edita el archivo `frontend/script.js` y actualiza la variable `API_URL`.

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
