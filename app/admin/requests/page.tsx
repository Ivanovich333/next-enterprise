"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

interface ContactRequest {
  id: string
  name: string
  phone: string
  email?: string
  message?: string
  source?: string
  status: string
  createdAt: string
}

export default function RequestsAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchRequests()
    }
  }, [session])

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <a
            href="/admin"
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Заявки клиентов
          </h1>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Пока нет заявок
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(request.createdAt).toLocaleString("ru-RU", {
                        timeZone: "Asia/Tashkent",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      request.status === "new"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        : request.status === "contacted"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    }`}
                  >
                    {request.status === "new" ? "Новая" : request.status === "contacted" ? "В работе" : "Завершена"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">📱</span>
                    <a
                      href={`tel:${request.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {request.phone}
                    </a>
                  </div>

                  {request.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">📧</span>
                      <a
                        href={`mailto:${request.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {request.email}
                      </a>
                    </div>
                  )}

                  {request.message && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {request.message}
                      </p>
                    </div>
                  )}

                  {request.source && (
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      Источник: {request.source}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
