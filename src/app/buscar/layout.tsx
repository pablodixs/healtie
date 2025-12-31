import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Buscar',
    description: 'Busque estabelecimentos de saúde no Healtie.',
    keywords: ['saúde', 'buscar', 'healtie', 'estabelecimentos'],
}

export default function Layout({ children }: { children: ReactNode }) {
    return <main>{children}</main>
}
