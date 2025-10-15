'use client'

import { ReactNode, Suspense } from 'react'
import { usePathname } from 'next/navigation'

import { Header } from '../Header'
import { Footer } from '../Footer'
import { CookiesDialog } from '../OneTimeDialogs/CookiesDialog'
import { mainLayoutContainer, mainLayoutContentContainer } from './styles'

import { Portal } from '../Portal'

import { useCookiesPreferences } from '@/hooks/useCookiesPreferences'
import { AllowLocationDialog } from '../OneTimeDialogs'

export function MainLayout({ children }: { children: ReactNode }) {
    const path = usePathname()
    const { hasSetPreference, allowCookies, isPreferenceReady } =
        useCookiesPreferences()

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
            <Portal>
                {isPreferenceReady && !hasSetPreference && (
                    <CookiesDialog savePreference={allowCookies} />
                )}
                <AllowLocationDialog />
            </Portal>
        </div>
    )
}
