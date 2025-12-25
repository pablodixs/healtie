'use client'

import { ReactNode, Suspense } from 'react'
import { usePathname } from 'next/navigation'

import { Header } from '../Header'
import { Footer } from '../Footer'
import { mainLayoutContainer, mainLayoutContentContainer } from './styles'

import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'

export function MainLayout({ children }: { children: ReactNode }) {
    const path = usePathname()
    // const { hasSetPreference, allowCookies, isPreferenceReady } =
    //     useCookiesPreferences()

    return (
        <div className={mainLayoutContainer}>
            <Header />
            <section
                className={mainLayoutContentContainer({
                    fullWidthPage: path === '/mapa',
                })}
            >
                <Suspense
                    fallback={
                        <div
                            className={css({
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '80dvh',
                            })}
                        >
                            <CircleNotchIcon
                                className={css({
                                    animation: 'spin',
                                    color: 'neutral.500',
                                })}
                                weight="bold"
                                size={18}
                            />{' '}
                        </div>
                    }
                >
                    {children}
                </Suspense>
                {path !== '/mapa' && <Footer />}
            </section>
            {/* <Portal>
                {isPreferenceReady && !hasSetPreference && (
                    <CookiesDialog savePreference={allowCookies} />
                )}
            </Portal> */}
        </div>
    )
}
