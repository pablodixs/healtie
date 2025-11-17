import { Paragraph } from '@/components/Typography'
import { css } from '../../../../../../styled-system/css'
import { Button } from '@/components/Button'
import {
    HealtieClassificationIndicator,
    OccupancyIndexIndicator,
    ResolutionIndexIndicator,
    WaitTimeIndicator,
} from '@/components/Indicators'
import { DetailsAsideView } from '../DetailsAsideView'
import { ServiceItem } from '@/components/ServiceItem'
import {
    BabyCarriageIcon,
    BabyIcon,
    StethoscopeIcon,
    ToothIcon,
} from '@phosphor-icons/react/dist/ssr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

interface OverviewTabProps {
    establishment: EstablishmentResponse | undefined
    setSelectedTab: (
        tab: 'overview' | 'indicators' | 'services' | 'comments'
    ) => void
}

export function OverviewTab({
    establishment,
    setSelectedTab,
}: OverviewTabProps) {
    return (
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
                        <Paragraph bolder marginCompact size="subheadline">
                            Indicadores
                        </Paragraph>
                        <Paragraph marginCompact size="caption" subtle>
                            Atualizado há 1 minuto
                        </Paragraph>
                    </div>
                    <Button
                        onClick={() => setSelectedTab('indicators')}
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
                <section
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
                        gap: '1rem',
                    })}
                >
                    <div>
                        <header
                            className={css({
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                my: '1rem',
                            })}
                        >
                            <Paragraph bolder marginCompact size="subheadline">
                                Serviços
                            </Paragraph>
                            <Button
                                onClick={() => setSelectedTab('services')}
                                variant="text"
                            >
                                Ver mais
                            </Button>
                        </header>
                        <div
                            className={css({
                                display: 'flex',
                                flexDir: 'column',
                                gap: '1rem',
                            })}
                        >
                            <ServiceItem
                                serviceName="Consulta Médica"
                                serviceDescription="Consulta médica com um especialista."
                                serviceIcon={<StethoscopeIcon />}
                                showDescription={false}
                                available={true}
                            />
                            <ServiceItem
                                serviceName="Dentista"
                                serviceDescription="Consulta médica com um especialista."
                                serviceIcon={<ToothIcon />}
                                showDescription={false}
                                available={false}
                            />
                            <ServiceItem
                                serviceName="Pré-natal"
                                serviceDescription="Consulta médica com um especialista."
                                serviceIcon={<BabyCarriageIcon />}
                                showDescription={false}
                                available={null}
                            />
                            <ServiceItem
                                serviceName="Pediatria"
                                serviceDescription="Consulta médica com um especialista."
                                serviceIcon={<BabyIcon />}
                                showDescription={false}
                                available={null}
                            />
                        </div>
                    </div>
                </section>
            </div>
            <DetailsAsideView establishment={establishment} />
        </>
    )
}
