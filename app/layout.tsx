import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes'
import NavBar from './Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Generated by HireQuotient',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      
        <Theme>
        <NavBar/>
        {children}
        </Theme>
        </body>
    </html>
  )
}
