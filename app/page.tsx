"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "components/Button/Button"
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Home as HomeIcon, Minus, PhoneCall, Plus, Settings, Shield, Star, Users, Wrench } from "lucide-react"

const benefits = [
  {
    title: "Энергоэффективность",
    description: "Снижение расходов на электроэнергию до 30% благодаря умному управлению освещением и климатом",
  },
  {
    title: "Безопасность",
    description: "Контроль доступа, видеонаблюдение и оповещения о любых событиях в вашем доме",
  },
  {
    title: "Комфорт",
    description: "Автоматизация рутинных задач и управление всеми системами из одного приложения",
  },
  {
    title: "Удаленное управление",
    description: "Контроль за домом из любой точки мира через смартфон или планшет",
  },
  {
    title: "Гибкая настройка",
    description: "Сценарии работы под ваши потребности и возможность расширения системы",
  },
  {
    title: "Надежность",
    description: "Качественное оборудование и профессиональный монтаж с гарантией",
  },
]

// Counter component with animation
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={ref} className="text-4xl font-bold text-gray-900 dark:text-white">
      {count}
      {suffix}
    </div>
  )
}

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])

  // Load data from API (only projects and reviews)
  useEffect(() => {
    Promise.all([
      fetch('/api/portfolio?published=true').then(r => r.json()),
      fetch('/api/reviews?published=true').then(r => r.json()),
    ]).then(([portfolioData, reviewsData]) => {
      setProjects(portfolioData.map((p: any) => ({ id: p.id, image: p.image, title: p.title })))
      setReviews(reviewsData)
    }).catch(console.error)
  }, [])

  const whyUs = [
    { icon: Star, number: 200, suffix: "+", label: "Завершенных проектов" },
    { icon: Clock, number: 5, suffix: " лет", label: "На рынке" },
    { icon: Shield, number: 100, suffix: "%", label: "Гарантия качества" },
    { icon: Users, number: 24, suffix: "/7", label: "Поддержка клиентов" },
  ]

  const packages = [
    {
      name: "Базовый",
      price: "от 15 млн сум",
      popular: false,
      features: [
        "Умное освещение (3 комнаты)",
        "Управление климатом",
        "Датчики движения",
        "Мобильное приложение",
        "Базовая настройка",
      ],
    },
    {
      name: "Комфорт",
      price: "от 35 млн сум",
      popular: true,
      features: [
        "Всё из пакета 'Базовый'",
        "Видеонаблюдение (4 камеры)",
        "Умные розетки и выключатели",
        "Контроль доступа",
        "Голосовое управление",
        "Сценарии автоматизации",
      ],
    },
    {
      name: "Премиум",
      price: "от 60 млн сум",
      popular: false,
      features: [
        "Всё из пакета 'Комфорт'",
        "Мультирум аудиосистема",
        "Умные жалюзи и шторы",
        "Система полива",
        "Интеграция всех систем",
        "Расширенная поддержка",
      ],
    },
    {
      name: "VIP",
      price: "от 120 млн сум",
      popular: false,
      features: [
        "Всё из пакета 'Премиум'",
        "Домашний кинотеатр",
        "Система безопасности Pro",
        "Индивидуальный дизайн",
        "Персональный инженер",
        "Приоритетная поддержка",
      ],
    },
  ]

  const workSteps = [
    {
      icon: PhoneCall,
      title: "Консультация",
      description: "Обсуждаем ваши потребности и возможности умного дома",
    },
    {
      icon: HomeIcon,
      title: "Проект",
      description: "Разрабатываем индивидуальное решение и смету",
    },
    {
      icon: Wrench,
      title: "Монтаж",
      description: "Устанавливаем оборудование с соблюдением всех стандартов",
    },
    {
      icon: Settings,
      title: "Настройка",
      description: "Программируем систему и создаем сценарии автоматизации",
    },
    {
      icon: CheckCircle,
      title: "Поддержка",
      description: "Обучаем пользованию и обеспечиваем техническую поддержку",
    },
  ]

  // projects loaded from API

  const partners = [
    { name: "Xiaomi", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg", fallback: "🏠" },
    { name: "KNX", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/KNX_logo.svg", fallback: "🔌" },
    { name: "Amazon Alexa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg", fallback: "🔊" },
    { name: "Yandex Алиса", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Yandex_icon.svg", fallback: "🎙️" },
    { name: "Apple HomeKit", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", fallback: "🍎" },
    { name: "Zigbee", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Zigbee_logo.svg", fallback: "📡" },
  ]

  // reviews loaded from API

  const faqs = [
    {
      question: "Сколько стоит установка умного дома?",
      answer: "Стоимость зависит от площади объекта и набора функций. Базовое решение для квартиры от 15 млн сум. Предлагаем бесплатную консультацию для точного расчета.",
    },
    {
      question: "Сколько времени займет установка?",
      answer: "Для квартиры 2-3 комнаты - 3-5 дней. Для загородного дома - 1-2 недели. Точные сроки определяем после осмотра объекта.",
    },
    {
      question: "Какая гарантия на оборудование и работы?",
      answer: "Гарантия на оборудование - от производителя (1-3 года). На монтажные работы - 2 года. Также предоставляем сервисное обслуживание.",
    },
    {
      question: "Можно ли установить систему в уже готовую квартиру?",
      answer: "Да, мы специализируемся на установке в готовые объекты без масштабного ремонта. Используем беспроводные решения где это возможно.",
    },
    {
      question: "Сложно ли пользоваться умным домом?",
      answer: "Нет, интерфейс интуитивно понятен. После установки проводим обучение, показываем все функции. Большинство действий можно автоматизировать.",
    },
    {
      question: "Что будет если отключат интернет?",
      answer: "Базовые функции (освещение, климат) работают локально без интернета. Удаленное управление временно недоступно, но система продолжает работать.",
    },
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 text-center">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Умный дом под ключ
            </h1>
            <p className="mb-8 max-w-2xl mx-auto font-light md:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Профессиональная установка систем автоматизации для дома, квартиры или бизнес-объекта.
              Полный цикл работ от проектирования до запуска.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contacts" className="min-w-[200px]">
                Оставить заявку
              </Button>
              <Button href="/services" intent="secondary" className="min-w-[200px]">
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800"
                >
                  <Icon className="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400" />
                  <AnimatedCounter end={item.number} suffix={item.suffix} />
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Преимущества умного дома
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Современные технологии для повышения комфорта, безопасности и экономии ресурсов
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col p-6 bg-gray-50 rounded-lg dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Solutions Section */}
      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Популярные решения
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Готовые пакеты для быстрого старта. Возможна индивидуальная комплектация.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col p-6 rounded-xl transition-all duration-300 ${
                  pkg.popular
                    ? "bg-blue-50 border-2 border-blue-500 shadow-xl scale-105 dark:bg-blue-900/20"
                    : "bg-gray-50 border border-gray-200 hover:shadow-xl dark:bg-gray-800"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный выбор
                  </div>
                )}
                <h3 className="mb-2 text-2xl text-gray-900 dark:text-white">{pkg.name}</h3>
                <div className="mb-4 text-3xl font-extrabold text-blue-600 dark:text-blue-400">{pkg.price}</div>
                <ul className="mb-6 space-y-3 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contacts"
                  intent={pkg.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Как мы работаем
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Прозрачный процесс от первого звонка до запуска системы
            </p>
          </div>
          <div className="relative">
            {/* Timeline line - only show when all items in one row */}
            <div className="hidden xl:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 dark:from-blue-800 dark:via-blue-500 dark:to-blue-800" />

            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
              {workSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex items-center justify-center w-20 h-20 mb-4 bg-white rounded-full shadow-lg border-4 border-blue-500 dark:bg-gray-800 dark:border-blue-400">
                      <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg dark:bg-blue-500">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects Section */}
      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Наши проекты
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Реализованные проекты умных домов для квартир, домов и офисов
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-200 dark:bg-gray-700 cursor-pointer"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:opacity-10 transition-opacity duration-300">
                  {!project.image && '🏠'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/portfolio" intent="secondary" className="min-w-[200px]">
              Смотреть все проекты
            </Button>
          </div>
        </div>
      </section>

      {/* Technologies & Partners Section */}
      <section className="bg-white dark:bg-gray-900 overflow-hidden">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Технологии и партнеры
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Работаем с ведущими производителями умных устройств
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-lg transition-all dark:bg-gray-800"
              >
                {partner.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 mb-3 object-contain dark:invert dark:opacity-80"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'block'
                    }}
                  />
                ) : null}
                <div className="text-5xl mb-2" style={{ display: partner.logo ? 'none' : 'block' }}>
                  {partner.fallback}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Отзывы клиентов
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Что говорят о нас наши клиенты
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 md:p-12 dark:bg-gray-700">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="text-7xl flex-shrink-0">{reviews[currentReview]?.avatar}</div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-3">
                    {[...Array(reviews[currentReview]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{reviews[currentReview]?.text}"
                  </p>
                  <div className="font-bold text-gray-900 dark:text-white">{reviews[currentReview]?.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{reviews[currentReview]?.project}</div>
                </div>
              </div>
            </div>
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentReview ? "bg-blue-600 w-8" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-gray-900 dark:text-white">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ответы на популярные вопросы о установке умного дома
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-800"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:hover:bg-gray-700"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0 dark:text-blue-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:py-20 lg:px-6">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
              Готовы сделать ваш дом умным?
            </h2>
            <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
              Получите бесплатную консультацию и расчет стоимости вашего проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/contacts" className="min-w-[200px] bg-white text-blue-600 hover:bg-gray-100">
                Получить консультацию
              </Button>
              <a
                href="tel:+998909575407"
                className="text-white text-lg font-semibold hover:text-blue-100 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                +998 (90) 957-54-07
              </a>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}} />
    </>
  )
}
