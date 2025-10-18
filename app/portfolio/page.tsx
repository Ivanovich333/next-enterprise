"use client"

import { useEffect, useState } from "react"
import { Button } from "components/Button/Button"

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio?published=true')
      .then(r => r.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading portfolio:', err)
        setLoading(false)
      })
  }, [])
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Наши проекты
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Более 100 успешно реализованных проектов умного дома по всей России. От небольших квартир до загородных резиденций — мы создаем индивидуальные решения для автоматизации любого масштаба. Каждый проект разрабатывается с учетом особенностей объекта и пожеланий владельца.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 pt-0 pb-16 sm:pb-20 lg:px-6">
          {loading ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              Загрузка проектов...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              Проекты пока не добавлены
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer dark:bg-gray-700"
                >
                  {/* Image */}
                  <div className="bg-gray-200 dark:bg-gray-600 h-48 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">
                          Фото проекта
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-2 text-sm text-blue-600 dark:text-blue-400">
                      {project.year && `${project.year}`}
                      {project.year && project.location && ' • '}
                      {project.location}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 flex-1">
                      {project.description || 'Описание проекта'}
                    </p>

                    {/* Category & Area */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.category && (
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          {project.category === 'apartment' ? 'Квартира' : project.category === 'house' ? 'Дом' : 'Офис'}
                        </span>
                      )}
                      {project.area && (
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
                          {project.area}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Выполненных проектов
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5 лет
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                На рынке
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                98%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Довольных клиентов
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Хотите такой же проект?
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Оставьте заявку, и мы создадим уникальное решение для вашего дома
          </p>
          <Button href="/contacts">
            Обсудить проект
          </Button>
        </div>
      </section>
    </>
  )
}
