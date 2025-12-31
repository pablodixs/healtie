import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Onde Ir',
    description:
        'Descubra o estabelecimento de saúde ideal para você ir no Healtie.',
}

export default function Layout({ children }: { children: ReactNode }) {
    return <main>{children}</main>
}
