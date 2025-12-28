import { ReactNode } from 'react'
import { css } from '../../../../styled-system/css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Consultar estabelecimento no DataSUS | Healtie',
    description:
        'Consulte informações de estabelecimentos de saúde no banco de dados do DataSUS através do Healtie.',
    keywords: ['saúde', 'doodle', 'hoodles', 'healtie', 'funcionamento'],
    openGraph: {
        title: 'Consultar estabelecimento no DataSUS | Healtie',
        description:
            'Consulte informações de estabelecimentos de saúde no banco de dados do DataSUS através do Healtie.',
        url: 'https://healtie.app/datasus/consulta',
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
                    base: '1rem',
                    md: '0',
                },
            })}
        >
            {children}
        </main>
    )
}
