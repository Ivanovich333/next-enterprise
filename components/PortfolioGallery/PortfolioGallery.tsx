"use client"

import { useState } from "react"

export interface PortfolioProject {
  id: number
  title: string
  category: string
  location: string
  description: string
  image: string
  images?: string[]
}

export interface PortfolioGalleryProps {
  projects: PortfolioProject[]
  columns?: 2 | 3 | 4
}

export function PortfolioGallery({ projects, columns = 3 }: PortfolioGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [filter, setFilter] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const openLightbox = (project: PortfolioProject, imageIndex: number = 0) => {
    setSelectedProject(project)
    setCurrentImageIndex(imageIndex)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "auto"
  }

  const goToNextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const goToPrevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images!.length - 1 : prev - 1
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") goToNextImage()
    if (e.key === "ArrowLeft") goToPrevImage()
  }

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === category
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category === "all" ? "Все проекты" : category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => openLightbox(project)}
          >
            {/* Image */}
            <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-2">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-sm text-gray-200 mb-1">{project.location}</p>
              <p className="text-xs text-gray-300">{project.category}</p>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {project.category}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {selectedProject.images && selectedProject.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevImage()
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors p-3 hover:bg-white/10 rounded-full z-10"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextImage()
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors p-3 hover:bg-white/10 rounded-full z-10"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image Placeholder */}
            <div className="bg-gray-800 rounded-lg flex items-center justify-center min-h-[400px] min-w-[600px]">
              <div className="text-center text-white">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400">Изображение проекта</p>
              </div>
            </div>

            {/* Image Counter */}
            {selectedProject.images && selectedProject.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
              <p className="text-lg text-gray-300 mb-1">{selectedProject.location}</p>
              <p className="text-gray-400">{selectedProject.description}</p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {selectedProject.images && selectedProject.images.length > 1 && (
            <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {selectedProject.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`flex-shrink-0 w-16 h-16 bg-gray-700 rounded-lg transition-all ${
                    index === currentImageIndex
                      ? "ring-2 ring-blue-500 scale-110"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-xs">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
}
