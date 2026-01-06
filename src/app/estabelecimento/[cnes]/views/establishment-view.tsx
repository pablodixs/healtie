'use client'

import { useState } from 'react'

import { MapContextProvider } from '@/context/MapContext'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

import { Portal } from '@/components/Portal'
import { Divider } from '@/components/Divider'
import { HeaderView } from '../components/HeaderView'
import { ReportModal } from '../../components/ReportModal'
import { ServicesTab } from '../components/tabs/ServicesTab'
import { IndicatorsTab, OverviewTab } from '../components/tabs'
import { contentContainer, mainContainer } from '../components/styles'
import { NavigationTabItem, NavigationTabs } from '@/components/NavigationTabs'

type Props = {
    data: EstablishmentResponse
}

export default function EstablishmentView({ data }: Props) {
    const [selectedTab, setSelectedTab] = useState<
        'overview' | 'indicators' | 'services' | 'comments'
    >('overview')

    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    // const [isIAmHereModalOpen, setIsIAmHereModalOpen] = useState<boolean>(false)

    return (
        <MapContextProvider>
            <main className={mainContainer}>
                <HeaderView
                    establishment={data}
                    setIsReportModalOpen={setIsReportModalOpen}
                    // setIsIAmHereModalOpen={setIsIAmHereModalOpen}
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
                            cnes={data.cnes}
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
