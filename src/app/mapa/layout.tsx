import { Metadata } from 'next'

import { Logo } from '@/components/Logo'
import { MapComponent } from '../../components/Map/Map'

import { errorStateContainer, mainContainer } from './styles'
import { MapContextProvider } from '@/context/MapContext'

export const metadata: Metadata = {
    title: 'Mapa - Healtie',
    description: '',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={mainContainer}>
            <MapContextProvider>
                {children}
                <MapComponent />
            </MapContextProvider>
            <div className={errorStateContainer}>
                <Logo style={{ scale: 1.5, opacity: 0.25 }} />
            </div>
        </main>
    )
}
