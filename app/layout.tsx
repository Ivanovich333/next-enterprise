import "styles/tailwind.css"
import { Navbar } from "components/Navbar/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        <main className="pt-16 lg:pt-20">{children}</main>
      </body>
    </html>
  )
}
