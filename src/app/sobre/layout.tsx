import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Sobre o Healtie',
    description:
        'Saiba mais sobre o Healtie, nossa missão e como obtemos os dados para ajudar você a encontrar estabelecimentos de saúde próximos.',
    keywords: ['saúde', 'sobre', 'healtie', 'funcionamento'],
    openGraph: {
        title: 'Sobre o Healtie',
        description:
            'Saiba mais sobre o Healtie, nossa missão e como obtemos os dados para ajudar você a encontrar estabelecimentos de saúde próximos.',
        url: 'https://healtie.app/sobre',
        siteName: 'Healtie',
        images: [
            {
                url: 'https://healtie.app/images/og-image.png',
                width: 1900,
                height: 600,
                alt: 'Healtie',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
}

export default function Layout({ children }: { children: ReactNode }) {
    return <main>{children}</main>
}
