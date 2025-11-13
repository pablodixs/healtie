import { Metadata } from 'next'

import { Logo } from '@/components/Logo'
import { MapComponent } from '../../components/Map/Map'

import { errorStateContainer, mainContainer } from './styles'
import { MapContextProvider } from '@/context/MapContext'
import { css } from '../../../styled-system/css'
import { AsideSearchBar } from './components/AsideSearchBar'

export const metadata: Metadata = {
    title: 'Mapa - Healtie',
    description: '',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={mainContainer}>
            <MapContextProvider>
                <div
                    className={css({
                        position: 'absolute',
                        top: 'header',
                        left: 0,
                        width: '30%',
                        maxWidth: '400px',
                        zIndex: 5,
                        marginLeft: '1rem',
                        borderRadius: '32px',
                        minHeight: '74px',
                    })}
                >
                    <AsideSearchBar />
                </div>
                {children}
                <MapComponent />
            </MapContextProvider>
            <div className={errorStateContainer}>
                <Logo style={{ scale: 1.5, opacity: 0.25 }} />
            </div>
        </main>
    )
}
