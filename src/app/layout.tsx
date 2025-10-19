import type { Metadata } from 'next'

import './globals.css'

import { MainLayout } from '@/components/Layout'
import { MobileNav } from '@/components/Header/MobileNav'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
    title: 'Healtie',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br">
            <Analytics />
            <body>
                <div id="portal" />
                <MobileNav />
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    )
}
