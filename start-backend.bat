@echo off
echo 🚀 Автоматический запуск Backend...

cd backend

echo ✅ Установка зависимостей...
npm install

echo ✅ Установка переменных окружения...
set PORT=3001
set TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
set TELEGRAM_CHAT_ID=2063086506
set FRONTEND_URL=http://localhost:3000

echo ✅ Запуск backend сервера...
echo 🔧 Backend API: http://localhost:3001
echo 🤖 Telegram бот активирован!

npm start