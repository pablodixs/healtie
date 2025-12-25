import { Metadata } from 'next'

import { Logo } from '@/components/Logo'
import { MapComponent } from '../../components/Map/Map'

import { errorStateContainer, mainContainer } from './styles'
import { MapContextProvider } from '@/context/MapContext'
import { css } from '../../../styled-system/css'
import { AsideSearchBar } from './components/AsideSearchBar'

export const metadata: Metadata = {
    title: 'Mapa | Healtie',
    description:
        'Explore e encontre estabelecimentos de saúde próximos a você no mapa do Healtie.',
    keywords: [
        'mapa',
        'saúde',
        'estabelecimentos de saúde',
        'ubs',
        'upa',
        'hospital',
        'localização',
        'healtie',
    ],
    openGraph: {
        title: 'Mapa do Healtie',
        description:
            'Explore e encontre estabelecimentos de saúde próximos a você no mapa do Healtie.',
        url: 'https://healtie.app/mapa',
        siteName: 'Healtie',
        images: [
            {
                url: 'https://healtie.app/images/og-mapa.png',
                width: 1900,
                height: 600,
                alt: 'Healtie',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
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
