@echo off
chcp 65001 > nul
echo =========================================
echo   DEPLOY DE STOCKPULSE PRO EN VPS
echo =========================================
echo.
echo Este script se conectara a tu VPS y ejecutara el deploy.
echo.
echo Presiona cualquier tecla para continuar...
pause > nul

echo.
echo Conectando a tu VPS y ejecutando deploy...
echo.

:: Conectar via SSH y ejecutar comandos en el VPS
ssh root@194.163.180.138 "cd /opt && (git clone https://github.com/Kareeeels/StockPulse-Pro.git 2>/dev/null || true) && cd StockPulse-Pro && git pull origin main && chmod +x deploy.sh && ./deploy.sh"

echo.
echo =========================================
echo   FIN DEL PROCESO
echo =========================================
echo.
pause
