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
      <body>{children}</body>
    </html>
  )
}
