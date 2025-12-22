import type { Metadata } from 'next'

import './globals.css'

import { MainLayout } from '@/components/Layout'
import { MobileNav } from '@/components/Header/MobileNav'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
    title: 'Healtie',
    description:
        'Encontre estabelecimentos de saúde próximos a você com o Healtie.',
    keywords: [
        'saúde',
        'estabelecimentos',
        'healtie',
        'mapa',
        'ubs',
        'upa',
        'hospital',
        'tempo de espera',
        'onde ir',
    ],
    openGraph: {
        title: 'Healtie',
        description:
            'Encontre estabelecimentos de saúde próximos a você com o Healtie.',
        url: 'https://healtie.app/',
        siteName: 'Healtie',
        images: [
            {
                url: 'https://healtie.app/pictures/og-image.png',
                width: 1900,
                height: 600,
                alt: 'Healtie',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
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
