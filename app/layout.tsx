import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spec Maker - Generate Perfect Project Specs',
  description: 'Create complete, validated project specifications with built-in OWASP, GDPR, and SOC2 compliance checklists',
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