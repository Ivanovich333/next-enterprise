# Инструкция по деплою на Vercel

## Подготовка

Проект настроен для автоматического переключения базы данных:
- **Локально**: SQLite (file:./dev.db)
- **Production (Vercel)**: PostgreSQL

## Шаг 1: Деплой на Vercel

1. Перейди на [vercel.com](https://vercel.com)
2. Нажми **"Add New..." → "Project"**
3. Импортируй свой GitHub репозиторий
4. Vercel автоматически определит Next.js

## Шаг 2: Настройка Environment Variables

В настройках проекта Vercel добавь следующие переменные:

### Обязательные переменные:

```bash
# Database
DATABASE_PROVIDER=postgresql
DATABASE_URL=  # Будет заполнено автоматически после подключения Vercel Postgres

# Authentication
NEXTAUTH_SECRET=  # Сгенерируй: openssl rand -base64 32
NEXTAUTH_URL=https://your-domain.vercel.app  # Твой Vercel URL

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Опциональные переменные:

```bash
# Telegram (для уведомлений о заявках)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Analytics (опционально)
NEXT_PUBLIC_YANDEX_METRIKA_ID=your_metrika_id
```

## Шаг 3: Добавить Vercel Postgres

1. В настройках проекта перейди на вкладку **"Storage"**
2. Нажми **"Create Database"**
3. Выбери **"Postgres"**
4. Выбери регион (ближайший к твоей аудитории)
5. Нажми **"Create"**

Vercel автоматически:
- Создаст базу данных
- Добавит переменные окружения:
  - `POSTGRES_URL`
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`

6. Обнови переменную `DATABASE_URL`:
   - Скопируй значение `POSTGRES_PRISMA_URL`
   - Вставь в `DATABASE_URL`

## Шаг 4: Запуск миграций на production

После подключения базы данных нужно запустить миграции.

### Вариант A: Через Vercel CLI (рекомендуется)

```bash
# Установи Vercel CLI
npm i -g vercel

# Войди в аккаунт
vercel login

# Подключись к проекту
vercel link

# Запусти миграции
vercel env pull .env.production
DATABASE_URL="ваш_postgres_url" DATABASE_PROVIDER="postgresql" npx prisma migrate deploy
```

### Вариант B: Добавить build script

Можно добавить автоматический запуск миграций при каждом деплое.

Создай файл `scripts/migrate-and-build.sh`:

```bash
#!/bin/bash
echo "Running database migrations..."
npx prisma migrate deploy
echo "Building application..."
npm run build
```

Обнови `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

⚠️ **Внимание**: Это будет запускать миграции при каждом деплое. Убедись что миграции безопасны.

## Шаг 5: Seed данных (опционально)

Если хочешь добавить начальные данные:

```bash
# Подключись к production БД
DATABASE_URL="ваш_postgres_url" DATABASE_PROVIDER="postgresql" npm run db:seed
```

## Шаг 6: Создание админа на production

После первого деплоя создай администратора:

```bash
# Через Vercel CLI
DATABASE_URL="ваш_postgres_url" DATABASE_PROVIDER="postgresql" npm run create-admin admin@example.com SecurePassword123 "Admin Name"
```

Или используй Prisma Studio:

```bash
DATABASE_URL="ваш_postgres_url" DATABASE_PROVIDER="postgresql" npx prisma studio
```

## Проверка

После деплоя проверь:

1. ✅ Сайт открывается: `https://your-domain.vercel.app`
2. ✅ Админка работает: `https://your-domain.vercel.app/admin/login`
3. ✅ Портфолио загружается из БД
4. ✅ Форма отправки работает
5. ✅ Telegram уведомления приходят (если настроено)

## Troubleshooting

### Ошибка: "Database not found"
- Проверь что `DATABASE_URL` правильно настроен
- Убедись что миграции были запущены

### Ошибка: "Prisma Client not found"
- Добавь `prisma generate` в build команду
- Vercel должен автоматически запускать postinstall

### Страницы не загружаются
- Проверь логи в Vercel Dashboard
- Убедись что все environment variables заполнены

## Полезные команды

```bash
# Просмотр логов
vercel logs

# Повторный деплой
vercel --prod

# Откат к предыдущей версии
# Через Vercel Dashboard → Deployments → Promote to Production
```

## Мониторинг

Рекомендуется настроить:
- [Vercel Analytics](https://vercel.com/analytics) - бесплатно
- [Sentry](https://sentry.io) - для отслеживания ошибок
- [Better Uptime](https://betteruptime.com) - для мониторинга uptime

---

## Быстрый чеклист

- [ ] Проект задеплоен на Vercel
- [ ] Environment variables настроены
- [ ] Vercel Postgres подключен
- [ ] `DATABASE_URL` = `POSTGRES_PRISMA_URL`
- [ ] Миграции запущены
- [ ] Админ создан
- [ ] Сайт работает
- [ ] Админка доступна
- [ ] Формы отправляются

**Готово! 🚀**
