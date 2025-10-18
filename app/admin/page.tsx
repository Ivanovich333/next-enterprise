"use client"

import { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FileText, LogOut, MessageSquare, Phone } from "lucide-react"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const menuItems = [
    {
      title: "Портфолио",
      description: "Управление проектами",
      icon: FileText,
      href: "/admin/portfolio",
      color: "blue",
    },
    {
      title: "Отзывы",
      description: "Управление отзывами клиентов",
      icon: MessageSquare,
      href: "/admin/reviews",
      color: "green",
    },
    {
      title: "Заявки",
      description: "Просмотр заявок клиентов",
      icon: Phone,
      href: "/admin/requests",
      color: "red",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Админ-панель
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Добро пожаловать, {session.user?.name || session.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
