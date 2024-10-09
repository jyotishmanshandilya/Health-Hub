"use client"
import Nav from '@/components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import StoreProviders from '../providers/StoreProviders'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Health Hub',
  description: 'Health and Wellness Ecommerce Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" metadata={metadata}>
      <body className={inter.className}>
        <StoreProviders>
          <Nav/>
          {children}
        </StoreProviders>
      </body>
    </html>
  )
}