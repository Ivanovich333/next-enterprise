"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Check, X } from "lucide-react"

const contactInfo = [
  {
    title: "Телефон",
    value: "+998 (90) 957-54-07",
    href: "tel:+998909575407",
    icon: Phone,
  },
  {
    title: "Email",
    value: "info@smarthome.ru",
    href: "mailto:info@smarthome.ru",
    icon: Mail,
  },
  {
    title: "Адрес",
    value: "Москва, ул. Примерная, д. 1",
    icon: MapPin,
  },
  {
    title: "Время работы",
    value: "Пн-Пт: 9:00 - 18:00",
    icon: Clock,
  },
]

const socialLinks = [
  { name: "Telegram", url: "#", label: "TG" },
  { name: "WhatsApp", url: "#", label: "WA" },
  { name: "VK", url: "#", label: "VK" },
]

interface FormData {
  name: string
  phone: string
  email: string
  serviceType: string
  area: string
  message: string
  consent: boolean
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  consent?: string
}

export default function Contacts() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    area: "",
    message: "",
    consent: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Phone mask for Uzbekistan format: +998 (XX) XXX-XX-XX
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (!numbers) return ""

    // Always start with +998
    let formatted = "+998"

    if (numbers.length <= 3) {
      // Just started typing, show +998 (
      if (numbers.length > 0) formatted += " ("
      return formatted
    }

    // Format: +998 (XX) XXX-XX-XX
    if (numbers.length <= 5) {
      // +998 (XX
      formatted += ` (${numbers.slice(3)}`
    } else if (numbers.length <= 8) {
      // +998 (XX) XXX
      formatted += ` (${numbers.slice(3, 5)}) ${numbers.slice(5)}`
    } else if (numbers.length <= 10) {
      // +998 (XX) XXX-XX
      formatted += ` (${numbers.slice(3, 5)}) ${numbers.slice(5, 8)}-${numbers.slice(8)}`
    } else {
      // +998 (XX) XXX-XX-XX (complete)
      formatted += ` (${numbers.slice(3, 5)}) ${numbers.slice(5, 8)}-${numbers.slice(8, 10)}-${numbers.slice(10, 12)}`
    }

    return formatted
  }

  // Validation
  const validateField = (name: string, value: string | boolean) => {
    switch (name) {
      case "name":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "Имя должно содержать минимум 2 символа"
        }
        break
      case "phone":
        const phoneNumbers = typeof value === "string" ? value.replace(/\D/g, "") : ""
        if (!phoneNumbers || phoneNumbers.length !== 12) {
          return "Введите корректный номер телефона"
        }
        break
      case "email":
        if (typeof value === "string" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Введите корректный email"
        }
        break
      case "consent":
        if (!value) {
          return "Необходимо согласие на обработку данных"
        }
        break
    }
    return ""
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false

    let newValue: string | boolean = value

    if (name === "phone") {
      newValue = formatPhone(value)
    } else if (type === "checkbox") {
      newValue = checked
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }))

    // Validate on change if field was touched
    if (touched.has(name)) {
      const error = validateField(name, newValue)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => new Set(prev).add(name))

    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (["name", "phone", "email", "consent"].includes(key)) {
        const error = validateField(key, value)
        if (error) newErrors[key as keyof FormErrors] = error
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      // Mark all required fields as touched
      setTouched(new Set(["name", "phone", "email", "consent"]))
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowModal(true)
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        area: "",
        message: "",
        consent: false,
      })
      setTouched(new Set())
      setErrors({})
    }, 1500)
  }

  const isFieldValid = (fieldName: string) => {
    return touched.has(fieldName) && !errors[fieldName as keyof FormErrors] && formData[fieldName as keyof FormData]
  }

  return (
    <>
      {/* Header */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Контакты
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Свяжитесь с нами для консультации и расчета стоимости проекта
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[60%_40%]">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 lg:p-12 shadow-sm">
              <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Оставить заявку
              </h2>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                Заполните форму и мы свяжемся с вами в течение 30 минут
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full px-4 pt-6 pb-2 border rounded-lg bg-white dark:bg-gray-700
                      text-gray-900 dark:text-white outline-none transition-all
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
                      dark:focus:border-white dark:focus:ring-white dark:focus:ring-opacity-20
                      ${errors.name && touched.has("name") ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 dark:text-gray-400
                      transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                  >
                    Ваше имя *
                  </label>
                  {isFieldValid("name") && (
                    <Check className="absolute right-4 top-4 text-green-500 w-5 h-5" />
                  )}
                  {errors.name && touched.has("name") && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
                      <X className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full px-4 pt-6 pb-2 border rounded-lg bg-white dark:bg-gray-700
                      text-gray-900 dark:text-white outline-none transition-all
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
                      dark:focus:border-white dark:focus:ring-white dark:focus:ring-opacity-20
                      ${errors.phone && touched.has("phone") ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 dark:text-gray-400
                      transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                  >
                    Телефон *
                  </label>
                  {isFieldValid("phone") && (
                    <Check className="absolute right-4 top-4 text-green-500 w-5 h-5" />
                  )}
                  {errors.phone && touched.has("phone") && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
                      <X className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full px-4 pt-6 pb-2 border rounded-lg bg-white dark:bg-gray-700
                      text-gray-900 dark:text-white outline-none transition-all
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
                      dark:focus:border-white dark:focus:ring-white dark:focus:ring-opacity-20
                      ${errors.email && touched.has("email") ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 dark:text-gray-400
                      transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                  >
                    Email *
                  </label>
                  {isFieldValid("email") && (
                    <Check className="absolute right-4 top-4 text-green-500 w-5 h-5" />
                  )}
                  {errors.email && touched.has("email") && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
                      <X className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Service Type */}
                <div className="relative">
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-all
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
                      dark:focus:border-white dark:focus:ring-white dark:focus:ring-opacity-20
                      appearance-none cursor-pointer"
                  >
                    <option value="">Выберите услугу</option>
                    <option value="scratch">С нуля</option>
                    <option value="turnkey">Под ключ</option>
                    <option value="ready">В готовый объект</option>
                  </select>
                  <label
                    htmlFor="serviceType"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 dark:text-gray-400 pointer-events-none"
                  >
                    Тип услуги
                  </label>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Area */}
                <div className="relative">
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-all
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
                      dark:focus:border-white dark:focus:ring-white dark:focus:ring-opacity-20"
                    placeholder=" "
                    min="0"
                  />
                  <label
                    htmlFor="area"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 dark:text-gray-400
                      transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                  >
                    Площадь помещения (м²)
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-all resize-none
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
                      dark:focus:border-white dark:focus:ring-white dark:focus:ring-opacity-20"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 dark:text-gray-400
                      transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                  >
                    Комментарий или описание задачи
                  </label>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600
                      text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white
                      cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                    Я согласен на обработку персональных данных в соответствии с{" "}
                    <a href="#" className="text-gray-900 dark:text-white underline hover:no-underline transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>
                {errors.consent && touched.has("consent") && (
                  <div className="flex items-center gap-1 -mt-4 text-sm text-red-500">
                    <X className="w-4 h-4" />
                    <span>{errors.consent}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                    rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-[0.98] overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </span>
                  {/* Ripple effect */}
                  <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20
                    group-active:animate-ping transition-opacity" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Контактная информация
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    const content = (
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700
                          flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-white
                          transition-colors duration-300">
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300
                            group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            {info.title}
                          </div>
                          <div className="text-base font-semibold text-gray-900 dark:text-white
                            group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    )

                    return info.href ? (
                      <a key={info.title} href={info.href} className="block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-lg">
                        {content}
                      </a>
                    ) : (
                      <div key={info.title}>{content}</div>
                    )
                  })}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Мы в социальных сетях
                  </h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="flex items-center justify-center w-12 h-12 rounded-full
                          bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold
                          hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900
                          transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                        aria-label={social.name}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A1234567890abcdef&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                    title="Карта расположения офиса"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center
                justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Спасибо за заявку!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Мы свяжемся с вами в ближайшее время для уточнения деталей проекта
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900
                  font-semibold rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}} />
    </>
  )
}
