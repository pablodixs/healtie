'use client'

import { ReactNode, Suspense } from 'react'
import { usePathname } from 'next/navigation'

import { Header } from '../Header'
import { Footer } from '../Footer'
import { mainLayoutContainer, mainLayoutContentContainer } from './styles'

export function MainLayout({ children }: { children: ReactNode }) {
    const path = usePathname()

    return (
        <div className={mainLayoutContainer}>
            <Header />
            <section
                className={mainLayoutContentContainer({
                    fullWidthPage: path === '/mapa',
                })}
            >
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                {path !== '/mapa' && <Footer />}
            </section>
        </div>
    )
}
