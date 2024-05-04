import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import Header from '@/app/ui/header/header'
import Footer from '@/app/ui/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <main className="mt-[50px]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
