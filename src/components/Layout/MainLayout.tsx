import { ReactNode } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { mainLayoutContainer, mainLayoutContentContainer } from './styles'

export function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className={mainLayoutContainer}>
            <Header />
            <section className={mainLayoutContentContainer()}>
                {children}
                <Footer />
            </section>
        </div>
    )
}
