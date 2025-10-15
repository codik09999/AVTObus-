@echo off
echo 🚀 Автоматическое развертывание на Railway...

echo.
echo ✅ Проверка установки Railway CLI...

where railway >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Установка Railway CLI...
    npm install -g @railway/cli
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Ошибка установки Railway CLI
        echo 💡 Попробуйте: npm install -g @railway/cli --force
        pause
        exit /b 1
    )
)

echo ✅ Railway CLI установлен!

echo.
echo 🔐 Войдите в Railway (откроется браузер)...
railway login

echo.
echo 🎯 Создание нового проекта...
railway create

echo.
echo 📦 Развертывание backend...
cd backend
railway up --service backend

echo.
echo 🔧 Установка переменных окружения для backend...
railway variables set PORT=3001
railway variables set TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
railway variables set TELEGRAM_CHAT_ID=2063086506

echo.
echo ✅ Backend развернут! Получаем URL...
for /f "tokens=*" %%i in ('railway status --json ^| findstr "url"') do set BACKEND_URL=%%i

echo Backend URL: %BACKEND_URL%

echo.
echo 🎨 Развертывание frontend...
cd ..\frontend

echo.
echo 🔧 Установка переменной API URL...
railway variables set REACT_APP_API_URL=%BACKEND_URL%

railway up --service frontend

echo.
echo ✅ Frontend развернут! Получаем URL...
for /f "tokens=*" %%i in ('railway status --json ^| findstr "url"') do set FRONTEND_URL=%%i

echo Frontend URL: %FRONTEND_URL%

echo.
echo 🔗 Обновление CORS настроек...
cd ..\backend
railway variables set FRONTEND_URL=%FRONTEND_URL%

echo.
echo 🎉 РАЗВЕРТЫВАНИЕ ЗАВЕРШЕНО!
echo.
echo 🌐 Ваш сайт: %FRONTEND_URL%
echo 🔧 Backend API: %BACKEND_URL%
echo.
echo 🤖 Telegram бот готов к работе!
echo 📱 Токен: 7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
echo 💬 Chat ID: 2063086506
echo.

pause