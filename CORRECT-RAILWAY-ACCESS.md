# 🔗 ДОСТУП К ВАШЕМУ RAILWAY ПРОЕКТУ

## ⚠️ **ИСПРАВЛЕНИЕ:**

Извиняюсь за ошибочную ссылку! Правильный способ доступа к проекту:

---

## 🎯 **КАК НАЙТИ ВАШ ПРОЕКТ:**

### **ВАРИАНТ 1: Прямой доступ**
1. **Откройте:** [railway.app](https://railway.app)
2. **Войдите в аккаунт** (xxxsssppp@protonmail.com)
3. **Найдите проект:** `BusTickets-Platform`

### **ВАРИАНТ 2: Через CLI**
```bash
npx @railway/cli open
```
*(команда откроет проект в браузере автоматически)*

---

## ✅ **ЧТО УЖЕ ГОТОВО В ПРОЕКТЕ:**

- **✅ Проект создан:** `BusTickets-Platform`
- **✅ Сервис настроен** со всеми переменными окружения
- **✅ Переменные установлены:**
  ```
  PORT=3001
  TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
  TELEGRAM_CHAT_ID=2063086506
  ```

---

## 🛠 **ОСТАЛОСЬ СДЕЛАТЬ (2 минуты):**

### **1. В Railway проекте BusTickets-Platform:**

1. **Кликните на сервис** BusTickets-Platform
2. **Settings** → **Source**
3. **Connect Repository** → выберите `codik09999/AVTObus-`
4. **Root Directory:** установите `backend`
5. **Deploy**

### **2. Добавьте Frontend сервис:**

1. **"+ New Service"** в том же проекте
2. **GitHub Repo** → `codik09999/AVTObus-`
3. **Settings** → **Source** → **Root Directory:** `frontend`
4. **Variables** → добавьте `REACT_APP_API_URL` (URL backend'а после деплоя)

### **3. Обновите CORS в backend:**

Добавьте переменную `FRONTEND_URL` (URL frontend'а после деплоя)

---

## 🎯 **АЛЬТЕРНАТИВА - СОЗДАТЬ ЗАНОВО:**

Если не можете найти проект BusTickets-Platform, создайте новый:

1. **Railway.app** → **New Project**
2. **Deploy from GitHub Repo**
3. **Выберите:** `codik09999/AVTObus-`
4. **Настройте** как описано в `MANUAL-DEPLOY.md`

---

## 📋 **ВСЕ ГОТОВЫЕ ДАННЫЕ:**

### **Backend переменные (уже установлены):**
```
PORT=3001
TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
TELEGRAM_CHAT_ID=2063086506
```

### **Frontend переменная (добавить):**
```
REACT_APP_API_URL=https://ваш-backend-url.railway.app
```

### **CORS переменная (добавить в backend):**
```
FRONTEND_URL=https://ваш-frontend-url.railway.app
```

---

## 🤖 **TELEGRAM БОТ УЖЕ НАСТРОЕН:**

- **Токен:** `7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo` ✅
- **Chat ID:** `2063086506` ✅
- **Переменные установлены** в Railway ✅

---

## 🚀 **ПРОСТЫЕ ШАГИ:**

1. **Откройте:** [railway.app](https://railway.app)
2. **Найдите:** проект `BusTickets-Platform`
3. **Подключите GitHub** репозиторий `codik09999/AVTObus-`
4. **Готово!** 🎉

---

**📝 Если проект не найден, используйте полную инструкцию из `MANUAL-DEPLOY.md`**