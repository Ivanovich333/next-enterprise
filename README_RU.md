# 🏠 Сайт для установки систем умного дома (Узбекистан)

Современный сайт на Next.js 14 с админ-панелью и интеграцией Telegram для компании по установке умных домов.

## ✨ Возможности

### Для посетителей:
- 📱 Адаптивный дизайн для всех устройств
- 🎨 Современный UI с темной темой
- 📝 Форма заявки с валидацией
- 📸 Портфолио выполненных работ
- ⭐ Отзывы клиентов
- 💰 Ценовые пакеты (в сумах)
- 🤝 Партнеры и технологии
- ❓ FAQ секция

### Для администратора:
- 🔐 Защищенная админ-панель с авторизацией
- 📊 Управление портфолио (CRUD)
- 💬 Управление отзывами
- 🏢 Управление партнерами
- 📦 Управление ценовыми пакетами
- 📮 Просмотр заявок клиентов
- 📱 Telegram уведомления при новых заявках

## 🛠 Технологии

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite + Prisma ORM
- **Auth**: NextAuth.js
- **Notifications**: Telegram Bot API
- **Icons**: Lucide React

## 🚀 Быстрый старт

### 1. Установка
```bash
npm install
```

### 2. Настройка базы данных
```bash
# Создать БД и применить миграции
npm run db:migrate

# Создать администратора
npm run create-admin
# Логин: admin@smarthome.uz
# Пароль: admin123

# Загрузить тестовые данные
npm run db:seed
```

### 3. Настройка Telegram

1. Получите ваш Chat ID через [@userinfobot](https://t.me/userinfobot)
2. Добавьте в файл `.env`:
```env
TELEGRAM_CHAT_ID="ваш_chat_id"
```

### 4. Запуск
```bash
npm run dev
```

Откройте http://localhost:3000

## 📁 Структура проекта

```
smart-home-site/
├── app/
│   ├── admin/              # Админ-панель
│   │   ├── login/          # Страница входа
│   │   ├── portfolio/      # Управление портфолио
│   │   ├── reviews/        # Управление отзывами
│   │   └── page.tsx        # Главная админки
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth
│   │   ├── contact/        # Обработка заявок
│   │   ├── portfolio/      # CRUD портфолио
│   │   └── reviews/        # CRUD отзывов
│   ├── page.tsx            # Главная страница
│   └── layout.tsx          # Layout
├── components/
│   ├── ApplicationForm/    # Форма заявки
│   ├── Button/             # Кнопки
│   └── Navbar/             # Навигация
├── lib/
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth config
│   └── telegram.ts         # Telegram integration
├── prisma/
│   ├── schema.prisma       # Схема БД
│   └── dev.db              # SQLite база
└── scripts/
    ├── create-admin.ts     # Создание админа
    └── seed.ts             # Тестовые данные
```

## 🔑 Доступ к админке

**URL**: http://localhost:3000/admin/login

**Тестовые учетные данные**:
- Email: `admin@smarthome.uz`
- Пароль: `admin123`

⚠️ **Важно**: Смените пароль после первого входа!

## 📱 Telegram уведомления

При отправке формы на сайте вы получите уведомление:

```
🔔 Новая заявка с сайта!

👤 Имя: Алишер
📱 Телефон: +998 (90) 123-45-67
📧 Email: alisher@mail.ru
💬 Сообщение: Интересует установка умного дома

⏰ 18.10.2025, 13:45
```

## 🎯 Адаптация под Узбекистан

- ✅ Валюта: узбекские сумы (15 млн сум)
- ✅ Телефоны: формат +998 (XX) XXX-XX-XX
- ✅ Часовой пояс: Asia/Tashkent
- ✅ Локализация на русском
- ✅ Локальные примеры (Tashkent City, Юнусабад)
- ✅ Популярные в Узбекистане бренды

## 📝 Доступные скрипты

```bash
npm run dev          # Запуск в dev режиме
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен версии
npm run lint         # Линтинг кода

# База данных
npm run db:migrate   # Применить миграции
npm run db:studio    # Открыть Prisma Studio
npm run db:seed      # Загрузить тестовые данные

# Администрирование
npm run create-admin # Создать админа
```

## 🔒 Безопасность

Перед развертыванием в продакшен:

1. **Смените NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```
Добавьте в `.env`:
```
NEXTAUTH_SECRET="сгенерированный_секрет"
```

2. **Смените пароль администратора** через админку

3. **Убедитесь** что `.env` в `.gitignore`

4. **Настройте** переменные окружения на продакшен сервере

## 🌐 Развертывание

### Vercel (рекомендуется)
1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения
3. Deploy!

### Другие платформы
- Настройте PostgreSQL вместо SQLite
- Обновите `DATABASE_URL` в `.env`
- Настройте переменные окружения

## 📚 Дополнительная информация

- [SETUP.md](./SETUP.md) - Детальная инструкция по настройке
- [QUICKSTART.md](./QUICKSTART.md) - Быстрый старт
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## 🐛 Troubleshooting

**Не могу войти в админку**
- Убедитесь что создали админа: `npm run create-admin`

**Форма не отправляется**
- Проверьте `TELEGRAM_CHAT_ID` в `.env`
- Убедитесь что запустили бота (отправьте /start)

**Ошибки БД**
- Удалите `prisma/dev.db`
- Запустите `npm run db:migrate && npm run db:seed`

**Не приходят уведомления**
- Проверьте токен бота
- Проверьте Chat ID (через @userinfobot)
- Убедитесь что написали боту /start

## 📄 Лицензия

Частный проект для компании по установке умных домов.

## 👥 Поддержка

При возникновении вопросов обратитесь к файлам документации или свяжитесь с разработчиком.
