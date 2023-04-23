import NavLink from '@/components/ui/NavLink'
import 'tailwindcss/tailwind.css'

export const metadata = {
  title: 'Invoicee',
  description: 'Invoice and Quotation Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="px-6 py-4 shadow flex items-center justify-between">
          <h1 className="text-3xl font-bold">Invoicee</h1>
          <ul>
            <li>
              <NavLink href="/">Dashboard</NavLink>
            </li>
          </ul>
        </nav>
        <main className="px-6 py-4 overflow-auto">
          {children}
        </main>
      </body>
    </html >
  )
}
