import "styles/tailwind.css"
import { Navbar } from "components/Navbar/Navbar"
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Navbar />
          <main className="pt-16 lg:pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
