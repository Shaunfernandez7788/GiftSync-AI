import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GiftSync AI",
  description: "Professional Insights, Personal Gifts."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100`}>
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          {children}
        </div>
      </body>
    </html>
  )
}