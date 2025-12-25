import { Metadata } from 'next'
import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

export const metadata: Metadata = {
    title: 'Newsroom | Healtie',
    description: 'Fique por dentro das novidades e atualizações do Healtie.',
    keywords: ['saúde', 'sobre', 'healtie', 'funcionamento'],
    openGraph: {
        title: 'Newsroom | Healtie',
        description:
            'Fique por dentro das novidades e atualizações do Healtie.',
        url: 'https://healtie.app/noticias',
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
    return (
        <main
            className={css({
                paddingX: {
                    base: '2rem',
                    md: '0',
                },
            })}
        >
            {children}
        </main>
    )
}
