import { Metadata } from 'next'

import { Logo } from '@/components/Logo'
import { MapComponent } from '../../components/Map/Map'

import {
    errorStateContainer,
    mainContainer,
    searchBarContainer,
    styles,
} from './styles'
import { MapContextProvider } from '@/context/MapContext'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'

export const metadata: Metadata = {
    title: 'Mapa - Healtie',
    description: '',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={mainContainer}>
            <MapContextProvider>
                <section className={styles}>
                    <section className={searchBarContainer}>
                        <SearchBar placeholder="Buscar unidades de saúde" />
                        <ProgressiveBlur />
                    </section>
                    {children}
                </section>
                <MapComponent />
            </MapContextProvider>
            <div className={errorStateContainer}>
                <Logo style={{ scale: 1.5, opacity: 0.25 }} />
            </div>
        </main>
    )
}
