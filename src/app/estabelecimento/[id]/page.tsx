'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { css } from '../../../../styled-system/css'

import { Subheading } from '@/components/Typography'

import { Portal } from '@/components/Portal'
import { HeaderView } from './components/HeaderView'
import { ReportModal } from '../components/ReportModal'
import { DetailsAsideView } from './components/DetailsAsideView'
import { TokenMissingState } from '@/components/Map'
import { MapContextProvider } from '@/context/MapContext'
import { NavigationTabItem, NavigationTabs } from '@/components/NavigationTabs'

import { establishments } from '@/utils/unidades.json'
import { Establishment } from '@/interfaces/Establishment'

export default function Page() {
    const path = usePathname()
    const id = path.split('/').pop()
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false)

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
            <main
                className={css({
                    minHeight: '90dvh',
                    maxW: '1280px',
                    margin: '0 auto',
                })}
            >
                <HeaderView
                    establishment={establishment}
                    setIsReportModalOpen={setIsReportModalOpen}
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
                <section
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: '1fr 300px',
                        gap: '2rem',
                    })}
                >
                    {selectedTab === 'overview' && (
                        <>
                            <div>
                                <Subheading>Visão Geral</Subheading>
                            </div>
                            <DetailsAsideView establishment={establishment} />
                        </>
                    )}
                </section>
            </main>
            <Portal>
                {isReportModalOpen && (
                    <ReportModal
                        isOpen={isReportModalOpen}
                        onOpenChange={setIsReportModalOpen}
                        establishment={establishment as Establishment}
                    />
                )}
            </Portal>
        </MapContextProvider>
    )
}
