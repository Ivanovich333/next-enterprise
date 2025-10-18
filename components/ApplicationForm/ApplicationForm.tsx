"use client"

import { useState } from "react"

export interface ApplicationFormProps {
  onSubmit?: (data: FormData) => Promise<void>
  className?: string
}

interface FormData {
  name: string
  phone: string
  email: string
  serviceType: string
  comment: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  serviceType?: string
}

const serviceTypes = [
  { value: "from-scratch", label: "Установка с нуля" },
  { value: "turnkey", label: "Установка под ключ" },
  { value: "ready-object", label: "Установка в готовый объект" },
  { value: "consultation", label: "Консультация" },
  { value: "other", label: "Другое" },
]

export function ApplicationForm({ onSubmit, className = "" }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    comment: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа"
    }

    // Validate phone (Uzbekistan format: 12 digits including country code 998)
    const phoneNumbers = formData.phone.replace(/\D/g, "")
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона"
    } else if (phoneNumbers.length !== 12) {
      newErrors.phone = "Введите корректный номер телефона"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Введите email"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email"
    }

    // Validate service type
    if (!formData.serviceType) {
      newErrors.serviceType = "Выберите тип услуги"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    let newValue = value

    if (name === "phone") {
      newValue = formatPhone(value)
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("idle")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        comment: "",
      })
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ваше имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.name
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Иван Иванов"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="relative">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.phone
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="+998"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.email
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="example@mail.ru"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.email}</p>
          )}
        </div>

        {/* Service Type Field */}
        <div className="relative">
          <label
            htmlFor="serviceType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Тип услуги <span className="text-red-500">*</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.serviceType
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            disabled={isSubmitting}
          >
            <option value="">Выберите тип услуги</option>
            {serviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.serviceType}</p>
          )}
        </div>

        {/* Comment Field */}
        <div className="relative">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Комментарий
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
            placeholder="Расскажите подробнее о вашем проекте..."
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full px-6 py-4 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden group"
        >
          <span className={`flex items-center justify-center ${isSubmitting ? "opacity-0" : "opacity-100"} transition-opacity`}>
            Отправить заявку
          </span>

          {/* Loading Animation */}
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}

          {/* Ripple effect */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </button>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="p-4 text-green-700 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-200 animate-slide-up">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Заявка успешно отправлена!</span>
            </div>
            <p className="mt-2 text-sm">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200 animate-slide-up">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Произошла ошибка</span>
            </div>
            <p className="mt-2 text-sm">Пожалуйста, попробуйте позже или позвоните нам.</p>
          </div>
        )}
      </form>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
