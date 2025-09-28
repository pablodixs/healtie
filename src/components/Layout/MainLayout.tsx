import { ReactNode, Suspense } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { mainLayoutContainer, mainLayoutContentContainer } from './styles'

export function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className={mainLayoutContainer}>
            <Header />
            <section className={mainLayoutContentContainer()}>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                <Footer />
            </section>
        </div>
    )
}
