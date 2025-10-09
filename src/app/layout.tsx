import type { Metadata } from 'next'

import './globals.css'

import { MainLayout } from '@/components/Layout'
import { MobileNav } from '@/components/Header/MobileNav'

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
            <body>
                <div id="portal" />
                <MobileNav />
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    )
}
