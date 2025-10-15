#!/usr/bin/env pwsh

Write-Host "🚀 Автоматическое развертывание BusTickets Platform на Railway" -ForegroundColor Cyan

# Проверка и установка Railway CLI
Write-Host "`n✅ Проверка Railway CLI..." -ForegroundColor Green

try {
    $railwayVersion = railway --version 2>$null
    Write-Host "Railway CLI уже установлен: $railwayVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 Установка Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка установки Railway CLI" -ForegroundColor Red
        Write-Host "💡 Попробуйте запустить как администратор" -ForegroundColor Yellow
        Read-Host "Нажмите Enter для выхода"
        exit 1
    }
}

Write-Host "`n🔐 Вход в Railway..." -ForegroundColor Green
Write-Host "Откроется браузер для аутентификации" -ForegroundColor Yellow

railway login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка аутентификации" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "`n🎯 Создание проекта на Railway..." -ForegroundColor Green

# Инициализация проекта Railway
railway init

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка создания проекта" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "`n📦 Развертывание Backend сервиса..." -ForegroundColor Green

# Переходим в папку backend
Set-Location backend

# Развертывание backend
railway up

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend успешно развернут!" -ForegroundColor Green
    
    # Установка переменных окружения
    Write-Host "`n🔧 Настройка переменных окружения..." -ForegroundColor Yellow
    
    railway variables set PORT=3001
    railway variables set TELEGRAM_TOKEN="7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo"
    railway variables set TELEGRAM_CHAT_ID="2063086506"
    
    # Получаем URL backend
    $backendUrl = railway status --json | ConvertFrom-Json | Select-Object -ExpandProperty url
    Write-Host "Backend URL: $backendUrl" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Ошибка развертывания backend" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "`n🎨 Развертывание Frontend сервиса..." -ForegroundColor Green

# Переходим в папку frontend
Set-Location ../frontend

# Развертывание frontend
railway up

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend успешно развернут!" -ForegroundColor Green
    
    # Установка переменной API URL
    if ($backendUrl) {
        railway variables set REACT_APP_API_URL="$backendUrl"
    }
    
    # Получаем URL frontend
    $frontendUrl = railway status --json | ConvertFrom-Json | Select-Object -ExpandProperty url
    Write-Host "Frontend URL: $frontendUrl" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Ошибка развертывания frontend" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Обновляем CORS настройки в backend
if ($frontendUrl) {
    Write-Host "`n🔗 Обновление CORS настроек..." -ForegroundColor Yellow
    Set-Location ../backend
    railway variables set FRONTEND_URL="$frontendUrl"
}

Write-Host "`n🎉 РАЗВЕРТЫВАНИЕ ЗАВЕРШЕНО!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🌐 Ваш сайт: $frontendUrl" -ForegroundColor White
Write-Host "🔧 Backend API: $backendUrl" -ForegroundColor White
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`n🤖 Telegram бот настроен:" -ForegroundColor Green
Write-Host "📱 Токен: 7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo" -ForegroundColor White
Write-Host "💬 Chat ID: 2063086506" -ForegroundColor White

Write-Host "`n🧪 Тестирование:" -ForegroundColor Yellow
Write-Host "1. Откройте: $frontendUrl" -ForegroundColor White
Write-Host "2. Найдите билеты" -ForegroundColor White
Write-Host "3. Заполните форму бронирования" -ForegroundColor White
Write-Host "4. Введите данные карты → проверьте Telegram" -ForegroundColor White
Write-Host "5. Подтвердите в боте → введите SMS код" -ForegroundColor White

Read-Host "`nНажмите Enter для завершения"