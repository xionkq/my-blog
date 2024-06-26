import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import Header from '@/app/ui/header/header'
import Footer from '@/app/ui/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "xion's blog",
  description: "xion's personal blog site",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-img-light dark:bg-img-black`}>
        <div className="mx-auto max-w-large min-h-screen text-black dark:text-white">
          <Header />
          <main className="min-h-[calc(100vh-344px)] lg:min-h-[calc(100vh-224px)] md:min-h-[calc(100vh-176px)]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
