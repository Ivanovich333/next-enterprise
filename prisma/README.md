# Prisma Database Configuration

## Два варианта работы с БД

### Вариант 1: PostgreSQL (Рекомендуется для production)

**schema.prisma** настроен на PostgreSQL по умолчанию.

Для локальной разработки с PostgreSQL:
```bash
# Установи PostgreSQL локально или используй Docker
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# Обнови .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smarthome?schema=public"

# Запусти миграции
npm run db:migrate
```

### Вариант 2: SQLite (Проще для локальной разработки)

Если хочешь использовать SQLite локально:

```bash
# 1. Скопируй SQLite schema
cp prisma/schema.sqlite.prisma prisma/schema.prisma

# 2. Обнови .env
DATABASE_URL="file:./dev.db"

# 3. Запусти миграции
npm run db:migrate
```

**⚠️ Важно:** Перед коммитом верни обратно PostgreSQL schema:
```bash
git checkout prisma/schema.prisma
```

## Production (Vercel)

На Vercel всегда используется PostgreSQL:
- `schema.prisma` уже настроен на PostgreSQL
- Vercel Postgres автоматически установит `DATABASE_URL`
- Миграции запустятся автоматически через `vercel-build` script

## Миграции

Существующие миграции совместимы с обеими БД:
- `migrations/20251018134511_init/migration.sql` - SQLite версия
- `migrations/20251018134511_init/migration.postgresql.sql` - PostgreSQL версия

Prisma автоматически выберет правильную миграцию на основе provider в schema.prisma.

## Рекомендация

**Для production:** Всегда используй PostgreSQL (текущий schema.prisma)
**Для local dev:** Можешь использовать SQLite для простоты (schema.sqlite.prisma)

Но проще всего - использовать PostgreSQL везде, даже локально (через Docker).
