import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Sharing App',
  description: 'Upload and share videos easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
