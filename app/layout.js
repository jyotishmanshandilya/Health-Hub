"use client"
import Nav from '@/components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Health Hub',
  description: 'Health and Wellness Ecommerce Store',
}

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Nav/>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}