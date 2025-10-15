# 🚀 Развертывание на Railway

## Подготовка

1. **Создайте аккаунт на Railway.app**
2. **Подключите GitHub репозиторий**

## Развертывание Backend

1. В Railway создайте новый проект
2. Выберите "Deploy from GitHub Repo"
3. Выберите ваш репозиторий
4. В настройках проекта укажите:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Добавьте переменные окружения:**
   ```
   PORT=3001
   TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
   TELEGRAM_CHAT_ID=2063086506
   FRONTEND_URL=https://your-frontend-domain.railway.app
   ```

6. Скопируйте URL развернутого backend (например: `https://backend-production-xxx.railway.app`)

## Развертывание Frontend

1. Создайте второй сервис в том же проекте Railway
2. Выберите "Deploy from GitHub Repo" 
3. Выберите тот же репозиторий
4. В настройках проекта укажите:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `serve -s build`

5. **Добавьте переменные окружения:**
   ```
   REACT_APP_API_URL=https://your-backend-domain.railway.app
   ```

## Альтернативный способ - Docker

Если хотите использовать Docker на Railway:

1. **Backend:**
   - Root Directory: `backend`
   - Dockerfile Path: `Dockerfile`

2. **Frontend:**
   - Root Directory: `frontend` 
   - Dockerfile Path: `Dockerfile`

## Настройка домена

1. В Railway перейдите в настройки сервиса
2. В разделе "Networking" добавьте custom domain
3. Обновите `FRONTEND_URL` в backend и `REACT_APP_API_URL` в frontend

## Проверка работы

1. Откройте ваш frontend URL
2. Попробуйте найти билеты
3. Заполните форму бронирования  
4. Введите данные карты - должно прийти сообщение в Telegram
5. Подтвердите в боте - должно появиться окно SMS
6. Введите SMS код - должно прийти в бот для подтверждения

## Мониторинг

Railway предоставляет:
- Логи в реальном времени
- Метрики использования
- Автоматическое масштабирование
- SSL сертификаты

## Troubleshooting

**Проблема:** Frontend не может соединиться с Backend
**Решение:** Проверьте переменную `REACT_APP_API_URL` и CORS настройки

**Проблема:** Telegram бот не отвечает  
**Решение:** Проверьте `TELEGRAM_TOKEN` и `TELEGRAM_CHAT_ID` в переменных окружения

**Проблема:** Ошибки CORS
**Решение:** Добавьте ваш frontend домен в настройки CORS в backend

## Команды Railway CLI (опционально)

```bash
# Установка CLI
npm install -g @railway/cli

# Логин
railway login

# Деплой
railway up

# Просмотр логов
railway logs

# Добавление переменных
railway variables set TELEGRAM_TOKEN=your_token
```