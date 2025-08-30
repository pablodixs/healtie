import { ReactNode } from 'react'

import { Navbar } from '../Navbar'
import { Header } from '../Header'

import { mainLayoutContainer, mainLayoutContentContainer } from './styles'

export function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className={mainLayoutContainer}>
            <Header />
            <section className={mainLayoutContentContainer()}>
                <Navbar />
                <div>{children}</div>
            </section>
        </div>
    )
}
