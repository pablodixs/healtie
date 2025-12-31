import type { Metadata } from 'next'

import './globals.css'

import { MainLayout } from '@/components/Layout'
import { MobileNav } from '@/components/Header/MobileNav'
import { HydrationFix } from '@/components/HydrationFix'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
    title: {
        default: 'Healtie - Seu guia de saúde pública',
        template: '%s | Healtie',
    },
    description:
        'Encontre estabelecimentos de saúde próximos a você com o Healtie. Acesse informações sobre UBS, UPA, hospitais e tempo de espera.',
    icons: {
        shortcut: '/favicon.ico',
        icon: '/favicon.ico',
        apple: '/meta/icons/apple-touch-icon.png',
    },
    metadataBase: new URL('https://healtie.app'),
    alternates: {
        canonical: '/',
        languages: {
            'pt-BR': '/pt-BR',
        },
    },
    openGraph: {
        title: 'Healtie',
        description:
            'Encontre estabelecimentos de saúde próximos a você com o Healtie.',
        url: 'https://healtie.app/',
        siteName: 'Healtie',
        images: [
            {
                url: '/images/og-image.png',
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
        <html lang="pt-br" suppressHydrationWarning>
            <Analytics />
            <body suppressHydrationWarning>
                <HydrationFix />
                <div id="portal" />
                <MobileNav />
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    )
}
