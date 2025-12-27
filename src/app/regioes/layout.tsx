import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Disponibilidade - Healtie',
    description:
        'Explore os doodles do Healtie feitos para concientizar e celebrar datas importantes da saúde.',
    keywords: ['saúde', 'cidades', 'disponiveis', 'healtie'],
    openGraph: {
        title: 'Disponibilidade | Healtie',
        description:
            'Explore os doodles do Healtie feitos para concientizar e celebrar datas importantes da saúde.',
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
