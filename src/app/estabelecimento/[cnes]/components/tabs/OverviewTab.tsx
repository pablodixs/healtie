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
    BabyIcon,
    BedIcon,
    FirstAidIcon,
    FlaskIcon,
    FlowerIcon,
    StethoscopeIcon,
} from '@phosphor-icons/react/dist/ssr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { IndicatorsData } from './IndicatorsTab'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { EstablishmentServices } from '@/interfaces/EstablishmentServices'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
    const { data: indicatorsData } = useSWR<IndicatorsData>(
        `https://healtie-bh7zc.ondigitalocean.app/v1/establishment/${establishment?.cnes}/indicators`,
        fetcher
    )
    const { data: servicesData, isLoading } = useSWR<EstablishmentServices>(
        `https://healtie-bh7zc.ondigitalocean.app/v1/establishment/${establishment?.cnes}/services`,
        fetcher
    )

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
                            Atualizado{' '}
                            {indicatorsData?.last_updated &&
                                formatDistanceToNow(
                                    new Date(indicatorsData.last_updated),
                                    {
                                        addSuffix: true,
                                        locale: ptBR,
                                    }
                                )}
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
                    <HealtieClassificationIndicator data={indicatorsData} />
                    <WaitTimeIndicator data={indicatorsData} />
                    <OccupancyIndexIndicator data={indicatorsData} />
                    <ResolutionIndexIndicator data={indicatorsData} />
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
                                serviceName="Atendimento ambulatorial"
                                serviceDescription="Consultas agendadas, exames de rotina e procedimentos simples que não exigem internação."
                                serviceIcon={<FirstAidIcon />}
                                showDescription={false}
                                available={
                                    isLoading
                                        ? null
                                        : servicesData?.has_ambulatory_care
                                }
                            />
                            <ServiceItem
                                serviceName="Atendimento hospitalar"
                                serviceDescription="Estrutura completa para internações, cuidados intensivos e monitoramento contínuo do paciente."
                                serviceIcon={<BedIcon />}
                                showDescription={false}
                                available={
                                    isLoading
                                        ? null
                                        : servicesData?.has_hospital_care
                                }
                            />
                            <ServiceItem
                                serviceName="Centro cirúrgico"
                                serviceDescription="Unidade equipada com tecnologia avançada para a realização de cirurgias programadas ou de emergência."
                                serviceIcon={<StethoscopeIcon />}
                                showDescription={false}
                                available={
                                    isLoading
                                        ? null
                                        : servicesData?.has_surgical_center
                                }
                            />
                            <ServiceItem
                                serviceName="Centro neonatal"
                                serviceDescription="Cuidados especializados para recém-nascidos que necessitam de atenção extra ou tratamento intensivo."
                                serviceIcon={<BabyIcon />}
                                showDescription={false}
                                available={
                                    isLoading
                                        ? null
                                        : servicesData?.has_neonatal_center
                                }
                            />
                            <ServiceItem
                                serviceName="Centro obstétrico"
                                serviceDescription="Espaço dedicado à assistência segura da gestante, desde o pré-parto até o nascimento do bebê."
                                serviceIcon={<FlowerIcon />}
                                showDescription={false}
                                available={
                                    isLoading
                                        ? null
                                        : servicesData?.has_obstetric_center
                                }
                            />
                            <ServiceItem
                                serviceName="Serviços de apoio"
                                serviceDescription="Suporte diagnóstico e terapêutico, como laboratórios, radiologia e serviços de nutrição ou fisioterapia."
                                serviceIcon={<FlaskIcon />}
                                showDescription={false}
                                available={
                                    isLoading
                                        ? null
                                        : servicesData?.has_support_service
                                }
                            />
                        </div>
                    </div>
                </section>
            </div>
            <DetailsAsideView establishment={establishment} />
        </>
    )
}
