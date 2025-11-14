'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { css } from '../../../../styled-system/css'

import { Portal } from '@/components/Portal'
import { HeaderView } from './components/HeaderView'
import { ReportModal } from '../components/ReportModal'
import { TokenMissingState } from '@/components/Map'
import { MapContextProvider } from '@/context/MapContext'
import { NavigationTabItem, NavigationTabs } from '@/components/NavigationTabs'

import { establishments } from '@/utils/unidades.json'
import { Establishment } from '@/interfaces/Establishment'
import { Divider } from '@/components/Divider'
import { IAmHereDialog } from '@/components/IAmHererDialog'
import { IndicatorsTab, OverviewTab } from './components/tabs'
import { ServicesTab } from './components/tabs/ServicesTab'

export default function Page() {
    const path = usePathname()
    const id = path.split('/').pop()
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false)
    const [isIAmHereModalOpen, setIsIAmHereModalOpen] = useState<boolean>(false)

    type TabType = 'overview' | 'indicators' | 'services' | 'comments'
    const [selectedTab, setSelectedTab] = useState<TabType>('overview')

    const establishment = establishments.find((est) => est.cnes === Number(id))

    useEffect(() => {
        document.title = establishment
            ? `${establishment.name} | Healtie`
            : 'Estabelecimento não encontrado | Healtie'
    }, [establishment])

    if (!establishment) {
        return (
            <div
                className={css({
                    minHeight: '100dvh',
                })}
            >
                <TokenMissingState />
            </div>
        )
    }

    return (
        <MapContextProvider>
            <main className={mainContainer}>
                <HeaderView
                    establishment={establishment}
                    setIsReportModalOpen={setIsReportModalOpen}
                    setIsIAmHereModalOpen={setIsIAmHereModalOpen}
                />
                <NavigationTabs>
                    <NavigationTabItem
                        selectedTab={selectedTab === 'overview'}
                        onSelectedChange={() => {
                            setSelectedTab('overview')
                        }}
                        title="Visão geral"
                    />
                    <NavigationTabItem
                        selectedTab={selectedTab === 'indicators'}
                        onSelectedChange={() => {
                            setSelectedTab('indicators')
                        }}
                        title="Indicadores"
                    />
                    <NavigationTabItem
                        selectedTab={selectedTab === 'services'}
                        onSelectedChange={() => {
                            setSelectedTab('services')
                        }}
                        title="Serviços"
                    />
                    <NavigationTabItem
                        selectedTab={selectedTab === 'comments'}
                        onSelectedChange={() => {
                            setSelectedTab('comments')
                        }}
                        title="Comentários"
                        badge="1"
                    />
                </NavigationTabs>
                <section className={contentContainer}>
                    {selectedTab === 'overview' && (
                        <OverviewTab
                            establishment={establishment}
                            setSelectedTab={setSelectedTab}
                        />
                    )}
                    {selectedTab === 'indicators' && (
                        <IndicatorsTab
                            establishment={establishment}
                            setSelectedTab={setSelectedTab}
                        />
                    )}
                    {selectedTab === 'services' && (
                        <ServicesTab
                            establishment={establishment}
                            setSelectedTab={setSelectedTab}
                        />
                    )}
                </section>
            </main>
            <Divider />
            <Portal>
                {isReportModalOpen && (
                    <ReportModal
                        isOpen={isReportModalOpen}
                        onOpenChange={setIsReportModalOpen}
                        establishment={establishment as Establishment}
                    />
                )}
                {isIAmHereModalOpen && (
                    <IAmHereDialog
                        establishment={establishment}
                        onOpenChange={setIsIAmHereModalOpen}
                    />
                )}
            </Portal>
        </MapContextProvider>
    )
}

const mainContainer = css({
    minH: 'calc(100dvh - 4rem)',
    paddingX: {
        base: '1rem',
        md: '0',
    },
})

const contentContainer = css({
    display: {
        base: 'block',
        md: 'grid',
    },
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
})
