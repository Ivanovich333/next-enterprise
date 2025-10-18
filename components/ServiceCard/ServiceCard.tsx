import { Button } from "components/Button/Button"

export interface ServiceCardProps {
  title: string
  description: string
  icon: string
  price: string
  features?: string[]
  href?: string
}

export function ServiceCard({ title, description, icon, price, features, href = "/contacts" }: ServiceCardProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header with icon and price */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{icon}</div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-300">от</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{price}</div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>

        {/* Features list */}
        {features && features.length > 0 && (
          <ul className="mb-6 space-y-3 flex-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <div className="mt-auto">
          <Button href={href} className="w-full">
            Заказать
          </Button>
        </div>
      </div>
    </div>
  )
}
