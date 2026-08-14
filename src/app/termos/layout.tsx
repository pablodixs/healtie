import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Termos de Uso',
    description:
        'Consulte as regras, responsabilidades e condições para utilizar o Healtie.',
    alternates: {
        canonical: '/termos',
    },
    openGraph: {
        title: 'Termos de Uso | Healtie',
        description:
            'Consulte as regras, responsabilidades e condições para utilizar o Healtie.',
        url: 'https://healtie.app/termos',
        siteName: 'Healtie',
        locale: 'pt_BR',
        type: 'website',
    },
}

export default function TermsLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}
