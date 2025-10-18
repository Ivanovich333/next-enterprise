"use client"

import { useEffect, useRef, useState } from "react"
import {
  Award,
  CheckCircle,
  Headphones,
  Lightbulb,
  MapPin,
  Shield,
  Target,
  Users,
} from "lucide-react"

// Animated Counter Component
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
    <div ref={ref} className="text-5xl font-bold text-white">
      {count}
      {suffix}
    </div>
  )
}

// Value Card Component
function ValueCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center text-center p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 dark:bg-blue-900 rounded-full">
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}

// Team Card Component
function TeamCard({ name, position, description, initials }: { name: string; position: string; description: string; initials: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:-translate-y-2`}
    >
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
        <div className="text-6xl font-bold text-white">{initials}</div>
      </div>
      <div className="p-6">
        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">{position}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const values = [
  {
    icon: Shield,
    title: "Качество",
    description: "Используем только сертифицированное оборудование от ведущих мировых производителей"
  },
  {
    icon: Target,
    title: "Прозрачность",
    description: "Понятные цены, официальный договор, гарантии на все работы и оборудование"
  },
  {
    icon: Lightbulb,
    title: "Инновации",
    description: "Постоянно следим за новыми технологиями и внедряем лучшие решения"
  },
  {
    icon: Headphones,
    title: "Сервис",
    description: "Техническая поддержка 24/7, быстрое реагирование на любые вопросы"
  }
]

const team = [
  {
    name: "Александр Иванов",
    position: "Технический директор",
    description: "15 лет опыта в автоматизации зданий. Сертифицированный специалист KNX и Loxone.",
    initials: "АИ"
  },
  {
    name: "Мария Петрова",
    position: "Руководитель проектов",
    description: "Управление проектами любой сложности. Более 100 успешно реализованных объектов.",
    initials: "МП"
  },
  {
    name: "Дмитрий Сидоров",
    position: "Ведущий инженер",
    description: "Специалист по интеграции систем. Эксперт в области умного освещения и климата.",
    initials: "ДС"
  },
  {
    name: "Елена Козлова",
    position: "Менеджер по работе с клиентами",
    description: "Помогает подобрать оптимальное решение и сопровождает на всех этапах проекта.",
    initials: "ЕК"
  }
]

const whyChooseUs = [
  "Бесплатный выезд и консультация специалиста",
  "Официальный договор и гарантия на все работы",
  "Сертифицированные инженеры и монтажники",
  "Работаем с ведущими мировыми брендами",
  "Техническая поддержка после установки",
  "Гибкая система оплаты и рассрочка"
]

const cities = [
  "Москва и Московская область",
  "Санкт-Петербург",
  "Казань",
  "Нижний Новгород",
  "Екатеринбург",
  "Сочи"
]

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 lg:py-20 text-center">
          <h1 className="mb-6 text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Мы делаем дома умнее
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Превращаем обычные дома в умные пространства с 2019 года
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
                Наша история
              </h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Мы начали нашу деятельность в 2019 году с простой идеи — сделать технологии умного дома
                  доступными каждому. Наша команда объединила специалистов с многолетним опытом в автоматизации
                  зданий и инженерных системах.
                </p>
                <p>
                  За эти годы мы установили системы в сотнях домов и квартир по всей России, помогая людям
                  жить комфортнее, безопаснее и экономить ресурсы. Каждый проект для нас — это возможность
                  создать что-то уникальное, учитывая индивидуальные потребности клиента.
                </p>
                <p>
                  Наша команда постоянно обучается и следит за новыми технологиями, чтобы предлагать клиентам
                  только лучшие и проверенные решения на рынке. Мы гордимся тем, что 98% наших клиентов
                  рекомендуют нас своим друзьям и знакомым.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <Users className="w-32 h-32 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Наша миссия
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-blue-600 dark:text-blue-400 max-w-4xl mx-auto leading-relaxed">
            Делать жизнь людей комфортнее и безопаснее через умные технологии
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Наши ценности
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-gray-900 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <AnimatedCounter end={200} suffix="+" />
              <p className="mt-2 text-lg text-blue-100">Реализованных проектов</p>
            </div>
            <div>
              <AnimatedCounter end={5} suffix=" лет" />
              <p className="mt-2 text-lg text-blue-100">На рынке</p>
            </div>
            <div>
              <AnimatedCounter end={98} suffix="%" />
              <p className="mt-2 text-lg text-blue-100">Довольных клиентов</p>
            </div>
            <div>
              <AnimatedCounter end={50000} suffix="+" />
              <p className="mt-2 text-lg text-blue-100">м² умного дома</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Команда профессионалов
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Специалисты с многолетним опытом в автоматизации и инженерных системах
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Сертификаты и партнерства
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Официальные партнеры ведущих производителей
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {["KNX", "Xiaomi", "Amazon", "Yandex", "Apple", "Zigbee"].map((brand) => (
              <div
                key={brand}
                className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Award className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geography */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Где мы работаем
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Реализуем проекты в крупнейших городах России
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cities.map((city) => (
              <div
                key={city}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item) => (
              <div key={item} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-gray-900 py-16 lg:py-20">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Готовы обсудить ваш проект?
          </h2>
          <p className="mb-8 text-xl text-blue-100 max-w-2xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacts"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              Заказать консультацию
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              Посмотреть проекты
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
