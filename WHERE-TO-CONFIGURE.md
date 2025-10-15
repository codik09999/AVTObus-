# 📍 ГДЕ ИМЕННО НАСТРАИВАТЬ В RAILWAY

## 🔥 **ШАГ 1: ПОСЛЕ СОЗДАНИЯ ПРОЕКТА**

1. **Откройте:** [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub Repo**
3. **Выберите:** `codik09999/AVTObus-`

Railway создаст сервис автоматически.

---

## 🛠 **BACKEND СЕРВИС - ГДЕ НАСТРАИВАТЬ:**

### **Кликните на сервис (прямоугольник с названием)**

### **Вкладка "Settings" (в боковом меню слева):**

#### 📁 **General Settings:**
Найдите секцию **"Source"**:
- **Root Directory:** `backend` ← вписать
- **Build Command:** `npm install` ← вписать  
- **Start Command:** `npm start` ← вписать

#### 🔧 **Variables:**
Нажмите **"Variables"** в левом меню:
- **Кнопка "+ New Variable"**

Добавьте по одной:
```
Name: PORT          Value: 3001
Name: TELEGRAM_TOKEN    Value: 7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
Name: TELEGRAM_CHAT_ID  Value: 2063086506
```

---

## 🎨 **FRONTEND СЕРВИС - СОЗДАНИЕ:**

1. **В том же проекте** нажмите **"+ New Service"**
2. **Выберите:** "GitHub Repo"
3. **Выберите:** `codik09999/AVTObus-` (тот же репозиторий)

### **После создания кликните на новый сервис:**

#### 📁 **General Settings:**
В секции **"Source"**:
- **Root Directory:** `frontend` ← вписать
- **Build Command:** `npm run build` ← вписать
- **Start Command:** `npx serve -s build` ← вписать

#### 🔧 **Variables:**
Нажмите **"Variables"** в левом меню:
- **Кнопка "+ New Variable"**

Добавьте:
```
Name: REACT_APP_API_URL    Value: https://ваш-backend-url.railway.app
```

*(URL backend'а получите после его успешного деплоя)*

---

## 🔗 **ОБНОВЛЕНИЕ CORS (в backend):**

1. **Вернитесь к backend сервису** (кликните на него)
2. **Variables** (левое меню)
3. **"+ New Variable"**

Добавьте:
```
Name: FRONTEND_URL    Value: https://ваш-frontend-url.railway.app
```

*(URL frontend'а получите после его деплоя)*

---

## 📍 **ВИЗУАЛЬНЫЕ ОРИЕНТИРЫ:**

### **Dashboard Railway выглядит так:**
```
┌─────────────────────────┐
│     Ваш проект          │
├─────────────────────────┤
│ ┌─────────┐ ┌─────────┐ │
│ │Backend  │ │Frontend │ │  ← Эти прямоугольники
│ │Service  │ │Service  │ │
│ └─────────┘ └─────────┘ │
└─────────────────────────┘
```

### **Левое меню в сервисе:**
```
├ Overview
├ Deployments  
├ Metrics
├ Settings     ← Здесь General
├ Variables    ← Здесь переменные
├ Networking
└ ...
```

---

## ⚡ **ПОРЯДОК ДЕЙСТВИЙ:**

1. **Backend сервис** → Settings → General → установить `backend`
2. **Backend сервис** → Variables → добавить 3 переменные
3. **Дождаться деплоя** → скопировать URL backend'а  
4. **+ New Service** → создать frontend
5. **Frontend сервис** → Settings → General → установить `frontend`
6. **Frontend сервис** → Variables → добавить URL backend'а
7. **Дождаться деплоя** → скопировать URL frontend'а
8. **Backend сервис** → Variables → добавить URL frontend'а

---

## 🎯 **ВАЖНЫЕ МОМЕНТЫ:**

- **Root Directory** - это папка в репозитории (backend/frontend)
- **Variables** - переменные окружения для приложения
- **URL сервисов** появляются после успешного деплоя
- **Каждый сервис настраивается отдельно**

---

**📝 Если что-то непонятно, следуйте скриншотам в Railway - интерфейс интуитивный!**