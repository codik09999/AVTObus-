@echo off
echo 🚀 Подготовка к развертыванию BusTickets Platform на Railway...

echo.
echo ✅ Git репозиторий инициализирован
echo ✅ Все файлы добавлены в Git

echo.
echo 📋 Следующие шаги для развертывания на Railway:
echo.
echo 1. Идите на https://railway.app и войдите в аккаунт
echo 2. Создайте новый проект: "New Project"
echo 3. Выберите "Empty Project"
echo.
echo 🔧 BACKEND СЕРВИС:
echo 4. Добавьте новый сервис: "Add Service" → "GitHub Repo"
echo 5. Подключите этот проект к GitHub (если еще не подключен)
echo 6. Выберите репозиторий AVTObus+++
echo 7. В настройках укажите:
echo    - Root Directory: backend
echo    - Build Command: npm install
echo    - Start Command: npm start
echo 8. В Variables добавьте:
echo    - PORT=3001
echo    - TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
echo    - TELEGRAM_CHAT_ID=2063086506
echo.
echo 🎨 FRONTEND СЕРВИС:
echo 9. Добавьте второй сервис: "Add Service" → "GitHub Repo"
echo 10. Выберите тот же репозиторий
echo 11. В настройках укажите:
echo     - Root Directory: frontend
echo     - Build Command: npm run build
echo     - Start Command: npx serve -s build
echo 12. После развертывания backend, добавьте в frontend Variables:
echo     - REACT_APP_API_URL=https://ваш-backend-url.railway.app
echo.
echo 🌐 ОБНОВЛЕНИЕ CORS:
echo 13. После получения frontend URL, добавьте в backend Variables:
echo     - FRONTEND_URL=https://ваш-frontend-url.railway.app
echo.
echo 🎉 Готово! Ваш сайт будет доступен по Railway URL
echo.
echo 📱 Telegram бот уже настроен с токеном: 7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
echo 💬 Chat ID: 2063086506
echo.

pause