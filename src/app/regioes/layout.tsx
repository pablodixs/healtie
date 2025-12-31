import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Disponibilidade',
    description:
        'Explore onde o Healtie está disponível em diferentes cidades do Brasil.',
    keywords: ['saúde', 'cidades', 'disponiveis', 'healtie'],
    openGraph: {
        title: 'Disponibilidade',
        description:
            'Explore onde o Healtie está disponível em diferentes cidades do Brasil.',
        url: 'https://healtie.app/regioes',
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
