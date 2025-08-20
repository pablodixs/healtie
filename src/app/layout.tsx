import type { Metadata } from 'next'

import './globals.css'

import { MainLayout } from './components/MainLayout'

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
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    )
}
