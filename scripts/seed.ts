import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...')

  // Добавляем тестовые проекты портфолио
  await prisma.portfolio.createMany({
    data: [
      {
        title: 'Квартира в элитном ЖК Tashkent City',
        description: 'Полная автоматизация 3-комнатной квартиры площадью 120м²',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        category: 'apartment',
        location: 'Ташкент, Юнусабад',
        area: '120 м²',
        year: 2024,
        published: true,
        order: 1,
      },
      {
        title: 'Загородный дом',
        description: 'Умный дом с системой безопасности и автоматическим поливом',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        category: 'house',
        location: 'Ташкентская область',
        area: '300 м²',
        year: 2024,
        published: true,
        order: 2,
      },
      {
        title: 'Офисное здание IT-компании',
        description: 'Система контроля доступа и управления климатом',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        category: 'office',
        location: 'Ташкент, Мирзо-Улугбекский район',
        area: '500 м²',
        year: 2023,
        published: true,
        order: 3,
      },
    ],
  })

  // Добавляем отзывы
  await prisma.review.createMany({
    data: [
      {
        name: 'Алишер Каримов',
        project: 'Квартира 150м²',
        rating: 5,
        text: 'Отличная работа! Установили систему умного дома за 5 дней. Теперь управляю всем с телефона, очень удобно.',
        avatar: '👨‍💼',
        published: true,
        order: 1,
      },
      {
        name: 'Дилноза Рахимова',
        project: 'Загородный дом 250м²',
        rating: 5,
        text: 'Профессиональная команда, все сделали качественно. Особенно понравилась система безопасности с уведомлениями.',
        avatar: '👩‍💼',
        published: true,
        order: 2,
      },
    ],
  })

  // Добавляем партнеров (адаптировано под Узбекистан)
  await prisma.partner.createMany({
    data: [
      {
        name: 'Xiaomi',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg',
        fallback: '📱',
        published: true,
        order: 1,
      },
      {
        name: 'Google Home',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Google_Nest_logo.svg',
        fallback: '🏠',
        published: true,
        order: 2,
      },
      {
        name: 'Яндекс Алиса',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Yandex_icon.svg',
        fallback: '🎙️',
        published: true,
        order: 3,
      },
      {
        name: 'Zigbee',
        fallback: '📡',
        published: true,
        order: 4,
      },
    ],
  })

  // Добавляем пакеты (цены в сумах для Узбекистана)
  await prisma.package.createMany({
    data: [
      {
        name: 'Базовый',
        price: 'от 15 000 000 сум',
        popular: false,
        features: JSON.stringify([
          'Умное освещение (3 комнаты)',
          'Управление климатом',
          'Датчики движения',
          'Мобильное приложение',
          'Базовая настройка',
        ]),
        published: true,
        order: 1,
      },
      {
        name: 'Комфорт',
        price: 'от 35 000 000 сум',
        popular: true,
        features: JSON.stringify([
          'Всё из пакета "Базовый"',
          'Видеонаблюдение (4 камеры)',
          'Умные розетки и выключатели',
          'Контроль доступа',
          'Голосовое управление',
          'Сценарии автоматизации',
        ]),
        published: true,
        order: 2,
      },
      {
        name: 'Премиум',
        price: 'от 60 000 000 сум',
        popular: false,
        features: JSON.stringify([
          'Всё из пакета "Комфорт"',
          'Мультирум аудиосистема',
          'Умные жалюзи и шторы',
          'Система полива',
          'Интеграция всех систем',
          'Расширенная поддержка',
        ]),
        published: true,
        order: 3,
      },
    ],
  })

  console.log('✅ База данных успешно заполнена!')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении БД:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
