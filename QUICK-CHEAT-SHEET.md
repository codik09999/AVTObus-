# ⚡ ШПАРГАЛКА ДЛЯ РАЗВЕРТЫВАНИЯ

## 🔥 **БЫСТРЫЕ ССЫЛКИ:**
- **Railway:** [railway.app](https://railway.app)
- **GitHub репозиторий:** https://github.com/codik09999/AVTObus-

---

## 📋 **ДАННЫЕ ДЛЯ КОПИРОВАНИЯ:**

### **Backend настройки:**
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### **Backend переменные:**
```
PORT=3001
TELEGRAM_TOKEN=7808830885:AAHFkGTaOylnQ99RrNolU5UgjEgo2gxFrqo
TELEGRAM_CHAT_ID=2063086506
```

### **Frontend настройки:**
```
Root Directory: frontend
Build Command: npm run build
Start Command: npx serve -s build
```

### **Frontend переменная:**
```
REACT_APP_API_URL=https://ваш-backend-url.railway.app
```

### **CORS переменная (добавить в backend):**
```
FRONTEND_URL=https://ваш-frontend-url.railway.app
```

---

## 🚀 **КРАТКАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ:**

1. **Railway** → **New Project** → **GitHub Repo** → **`codik09999/AVTObus-`**

2. **Backend сервис:**
   - Settings → General → установить настройки
   - Settings → Variables → скопировать переменные
   - Дождаться деплоя → скопировать URL

3. **+ New Service** → **GitHub Repo** → **тот же репозиторий**

4. **Frontend сервис:**
   - Settings → General → установить настройки  
   - Settings → Variables → `REACT_APP_API_URL` = URL backend'а
   - Дождаться деплоя → скопировать URL

5. **Backend сервис:**
   - Settings → Variables → добавить `FRONTEND_URL` = URL frontend'а

6. **Готово!** 🎉

---

## 🧪 **ТЕСТ:**

**Ваш сайт** → **Найти билеты** → **Выбрать** → **Данные пассажира** → **Данные карты** → **Telegram уведомление!** 📱

---

**⏱ Время: 5-10 минут**
**📝 Полная инструкция:** `MANUAL-DEPLOY.md`