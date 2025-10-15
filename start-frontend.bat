@echo off
echo 🎨 Автоматический запуск Frontend...

cd frontend

echo ✅ Установка зависимостей...
npm install

echo ✅ Установка переменных окружения...
set REACT_APP_API_URL=http://localhost:3001

echo ✅ Запуск React приложения...
echo 🌐 Сайт: http://localhost:3000

npm start