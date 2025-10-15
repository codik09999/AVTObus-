# BusTickets Polska - Система покупки автобусных билетов

Современная система покупки билетов на автобус с интеграцией Telegram бота для подтверждения платежей.

## Особенности

- 🎫 Поиск и покупка автобусных билетов
- 💳 Безопасная обработка платежей картами
- 🤖 Интеграция с Telegram ботом для подтверждений
- 📱 SMS верификация через Telegram
- 📱 Адаптивный дизайн для всех устройств
- ⚡ Быстрая и интуитивная навигация

## Технологии

### Frontend
- React 18
- React Router
- Styled Components
- Axios

### Backend
- Node.js
- Express.js
- Telegram Bot API
- CORS

## Установка и запуск

### 1. Подготовка Telegram бота

1. Создайте бота через @BotFather в Telegram
2. Получите токен бота
3. Получите ваш Chat ID (можете использовать @userinfobot)

### 2. Установка зависимостей

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Настройка окружения

Отредактируйте файл `backend/.env`:

```
PORT=3001
TELEGRAM_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

### 4. Запуск приложения

```bash
# Запуск backend (в папке backend)
npm run dev

# Запуск frontend (в папке frontend)
npm start
```

Frontend будет доступен по адресу: http://localhost:3000
Backend API: http://localhost:3001

## Как работает система

1. **Поиск билетов**: Пользователь вводит маршрут и дату
2. **Выбор билета**: Выбор подходящего рейса из списка
3. **Ввод данных пассажира**: Заполнение персональной информации
4. **Оплата картой**: Ввод данных банковской карты
5. **Подтверждение в Telegram**: Администратор получает уведомление с кнопкой подтверждения
6. **SMS верификация**: После подтверждения карты запрашивается SMS код
7. **Подтверждение SMS**: Администратор подтверждает SMS или запрашивает новый
8. **Завершение**: Заказ завершается, билет отправляется на email

## Telegram бот команды

Бот автоматически обрабатывает:
- ✅ Подтверждение данных карты
- ❌ Отклонение платежа
- ✅ Подтверждение SMS кода
- 🔄 Запрос нового SMS кода

## Структура проекта

```
AVTObus+++/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components/
│   │       ├── SearchPage.js
│   │       ├── BookingPage.js
│   │       └── PaymentPage.js
│   └── public/
│       └── index.html
└── README.md
```

## API Endpoints

- `GET /api/search-buses` - Поиск автобусов
- `POST /api/create-order` - Создание заказа
- `POST /api/process-payment` - Обработка платежа
- `GET /api/payment-status/:orderId` - Проверка статуса платежа
- `POST /api/send-sms-code` - Отправка SMS кода

## Примеры использования

### Поиск билетов
```javascript
const response = await axios.get('/api/search-buses', {
  params: {
    from: 'Warszawa',
    to: 'Kraków',
    date: '2023-12-01'
  }
});
```

### Создание заказа
```javascript
const response = await axios.post('/api/create-order', {
  busId: '1',
  passengerData: {
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+48123456789',
    documentNumber: 'AB123456'
  }
});
```

## Безопасность

- Данные карт обрабатываются только на клиенте для отправки в Telegram
- Никакая платежная информация не сохраняется в системе
- SMS коды передаются через защищенное соединение
- Все платежи требуют ручного подтверждения администратора

## Поддержка

Для получения помощи или сообщения об ошибках создайте issue в репозитории.

## Лицензия

MIT License