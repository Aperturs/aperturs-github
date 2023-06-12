import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "react-hot-toast";



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aperturs',
  description: 'One Stop Social Media Management Software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <Toaster 
      position="top-left"
      reverseOrder={false}
      />
        {children}
      </body>
    </html>
  )
}
