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
import { fetcher } from '@/lib/swrFetcher'
import useSWR from 'swr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'

export default function Page() {
    const path = usePathname()
    const id = path.split('/').pop()
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false)
    const [isIAmHereModalOpen, setIsIAmHereModalOpen] = useState<boolean>(false)

    const { data, isLoading, error } = useSWR<EstablishmentResponse>(
        `https://healtie-bh7zc.ondigitalocean.app/v1/establishment/${id}`,
        fetcher
    )

    type TabType = 'overview' | 'indicators' | 'services' | 'comments'
    const [selectedTab, setSelectedTab] = useState<TabType>('overview')

    useEffect(() => {
        document.title = data ? `${data.name} | Healtie` : 'Healtie'
    }, [data])

    if (isLoading)
        return (
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '1rem',
                    justifyContent: 'center',
                    height: '80dvh',
                })}
            >
                <CircleNotchIcon
                    className={css({
                        animation: 'spin',
                        color: 'neutral.300',
                    })}
                    weight="bold"
                    size={32}
                />
            </div>
        )

    if (error) {
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

    if (!data) {
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
                    establishment={data}
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
                    {/* <NavigationTabItem
                        selectedTab={selectedTab === 'comments'}
                        onSelectedChange={() => {
                            setSelectedTab('comments')
                        }}
                        title="Comentários" */}
                    {/* /> */}
                </NavigationTabs>
                <section className={contentContainer}>
                    {selectedTab === 'overview' && (
                        <OverviewTab
                            establishment={data}
                            setSelectedTab={setSelectedTab}
                        />
                    )}
                    {selectedTab === 'indicators' && (
                        <IndicatorsTab
                            establishment={data}
                            setSelectedTab={setSelectedTab}
                        />
                    )}
                    {selectedTab === 'services' && (
                        <ServicesTab
                            establishment={data}
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
                        establishment={data}
                    />
                )}
                {/* {isIAmHereModalOpen && (
                    <IAmHereDialog
                        establishment={data}
                        onOpenChange={setIsIAmHereModalOpen}
                    />
                )} */}
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
