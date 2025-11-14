'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { css } from '../../../../styled-system/css'

import { Portal } from '@/components/Portal'
import { HeaderView } from './components/HeaderView'
import { ReportModal } from '../components/ReportModal'
import { DetailsAsideView } from './components/DetailsAsideView'
import { TokenMissingState } from '@/components/Map'
import { MapContextProvider } from '@/context/MapContext'
import { NavigationTabItem, NavigationTabs } from '@/components/NavigationTabs'

import { establishments } from '@/utils/unidades.json'
import { Establishment } from '@/interfaces/Establishment'
import { Divider } from '@/components/Divider'
import { IAmHereDialog } from '@/components/IAmHererDialog'
import {
    HealtieClassificationIndicator,
    OccupancyIndexIndicator,
    ResolutionIndexIndicator,
    WaitTimeIndicator,
} from '@/components/Indicators'
import { Paragraph } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Link } from '@/components/Link'

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
                        <>
                            <div>
                                <header
                                    className={css({
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    })}
                                >
                                    <div>
                                        <Paragraph
                                            bolder
                                            marginCompact
                                            size="subheadline"
                                        >
                                            Indicadores
                                        </Paragraph>
                                        <Paragraph
                                            marginCompact
                                            size="caption"
                                            subtle
                                        >
                                            Atualizado há 1 minuto
                                        </Paragraph>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            setSelectedTab('indicators')
                                        }
                                        variant="text"
                                    >
                                        Ver mais
                                    </Button>
                                </header>
                                <div
                                    className={css({
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            base: '1fr',
                                            md: '1fr 1fr',
                                        },
                                        gap: '1rem',
                                        mt: '1rem',
                                    })}
                                >
                                    <HealtieClassificationIndicator />
                                    <WaitTimeIndicator />
                                    <OccupancyIndexIndicator />
                                    <ResolutionIndexIndicator />
                                </div>
                                <header
                                    className={css({
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        my: '1rem',
                                    })}
                                >
                                    <Paragraph
                                        bolder
                                        marginCompact
                                        size="subheadline"
                                    >
                                        Serviços
                                    </Paragraph>
                                    <Button
                                        onClick={() =>
                                            setSelectedTab('services')
                                        }
                                        variant="text"
                                    >
                                        Ver mais
                                    </Button>
                                </header>
                            </div>
                            <DetailsAsideView establishment={establishment} />
                        </>
                    )}
                    {selectedTab === 'indicators' && (
                        <>
                            <div
                                className={css({
                                    display: 'flex',
                                    flexDir: 'column',
                                    gap: '1rem',
                                    mt: '1rem',
                                })}
                            >
                                <HealtieClassificationIndicator />
                                <WaitTimeIndicator />
                                <OccupancyIndexIndicator />
                                <ResolutionIndexIndicator />
                            </div>
                            <div>
                                <Paragraph bolder size="caption">
                                    Sobre os Indicadores dos Estabelecimentos
                                </Paragraph>
                                <Paragraph size="caption" subtle>
                                    Os indicadores mostram, de forma simples e
                                    transparente, como a unidade está
                                    performando no dia a dia. Eles reúnem dados
                                    reais de atendimento — como tempo de espera,
                                    qualidade percebida, eficiência e
                                    experiência do usuário — para ajudar tanto
                                    os pacientes quanto a própria unidade a
                                    entender onde estão os pontos fortes e o que
                                    ainda pode melhorar.
                                    {/* Os indicadores foram
                                    criados para transformar dados em clareza.
                                    Eles mostram, de um jeito simples e direto,
                                    como a unidade está funcionando no momento:
                                    o tempo que você realmente espera, a
                                    qualidade do atendimento percebida pelos
                                    usuários e a eficiência do fluxo da unidade.
                                    Tudo se conecta para oferecer uma visão
                                    transparente do desempenho — não só números,
                                    mas contexto. Com essas informações, você
                                    entende rapidamente o que esperar antes
                                    mesmo de chegar lá. Consegue comparar
                                    unidades, descobrir horários mais tranquilos
                                    e tomar decisões com mais segurança. Para a
                                    unidade, é uma forma inteligente de
                                    acompanhar sua evolução, identificar pontos
                                    de melhoria e medir o impacto das mudanças
                                    no dia a dia. É informação que trabalha por
                                    você: atualizada, confiável e feita para
                                    deixar a experiência de saúde mais clara,
                                    mais humana e muito mais simples. */}
                                </Paragraph>
                                <Link href={'#'} variant="text" size="sm">
                                    Saiba mais
                                </Link>
                            </div>
                        </>
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
