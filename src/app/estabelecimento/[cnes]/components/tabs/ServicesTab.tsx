import { Paragraph } from '@/components/Typography'
import { css } from '../../../../../../styled-system/css'
import { Link } from '@/components/Link'
import { ServiceItem } from '@/components/ServiceItem'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { EstablishmentServices } from '@/interfaces/EstablishmentServices'
import {
    FlaskIcon,
    FlowerIcon,
    InfoIcon,
    XIcon,
    BabyIcon,
    BedIcon,
    FirstAidIcon,
    StethoscopeIcon,
} from '@phosphor-icons/react/ssr'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/Button'

const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

interface ServicesTabProps {
    cnes: number
    establishment: EstablishmentResponse | undefined
    setSelectedTab: (
        tab: 'overview' | 'indicators' | 'services' | 'comments'
    ) => void
}

export function ServicesTab({ cnes }: ServicesTabProps) {
    const { data, isLoading } = useSWR<EstablishmentServices>(
        `${API_URL}/establishment/${cnes}/services`,
        fetcher
    )
    return (
        <>
            <div
                className={css({
                    display: 'flex',
                    flexDir: 'column',
                    gap: '1rem',
                    mt: '1rem',
                })}
            >
                <header
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    })}
                >
                    <Paragraph bolder size="subheadline">
                        Serviços básicos
                    </Paragraph>
                    {isLoading && <Spinner color="subtle" />}
                    <Button
                        size="small"
                        aria-label="Informações"
                        iconButton
                        variant="subtle"
                    >
                        <InfoIcon />
                    </Button>
                </header>
                <ServiceItem
                    serviceName="Atendimento ambulatorial"
                    serviceDescription="Consultas agendadas, exames de rotina e procedimentos simples que não exigem internação."
                    serviceIcon={<FirstAidIcon />}
                    available={isLoading ? null : data?.has_ambulatory_care}
                />
                <ServiceItem
                    serviceName="Atendimento hospitalar"
                    serviceDescription="Estrutura completa para internações, cuidados intensivos e monitoramento contínuo do paciente."
                    serviceIcon={<BedIcon />}
                    available={isLoading ? null : data?.has_hospital_care}
                />
                <ServiceItem
                    serviceName="Centro cirúrgico"
                    serviceDescription="Unidade equipada com tecnologia avançada para a realização de cirurgias programadas ou de emergência."
                    serviceIcon={<StethoscopeIcon />}
                    available={isLoading ? null : data?.has_surgical_center}
                />
                <ServiceItem
                    serviceName="Centro neonatal"
                    serviceDescription="Cuidados especializados para recém-nascidos que necessitam de atenção extra ou tratamento intensivo."
                    serviceIcon={<BabyIcon />}
                    available={isLoading ? null : data?.has_neonatal_center}
                />
                <ServiceItem
                    serviceName="Centro obstétrico"
                    serviceDescription="Espaço dedicado à assistência segura da gestante, desde o pré-parto até o nascimento do bebê."
                    serviceIcon={<FlowerIcon />}
                    available={isLoading ? null : data?.has_obstetric_center}
                />
                <ServiceItem
                    serviceName="Serviços de apoio"
                    serviceDescription="Suporte diagnóstico e terapêutico, como laboratórios, radiologia e serviços de nutrição ou fisioterapia."
                    serviceIcon={<FlaskIcon />}
                    available={isLoading ? null : data?.has_support_service}
                />
                <Paragraph bolder size="subheadline">
                    Outros serviços
                </Paragraph>
                <ServiceItem
                    serviceName="Nenhum serviço adicional disponível"
                    serviceDescription=""
                    serviceIcon={<XIcon />}
                    showDescription={false}
                    available={null}
                />
            </div>
            <div>
                <Paragraph bolder size="caption">
                    Os Serviços dos Estabelecimentos
                </Paragraph>
                <Paragraph size="caption" subtle>
                    Os Serviços dos Estabelecimentos de Saúde englobam toda a
                    infraestrutura física, tecnológica e profissional destinada
                    à promoção, prevenção e recuperação da saúde. Eles
                    representam a capacidade operacional da unidade em oferecer
                    desde consultas de rotina até intervenções complexas e
                    suporte diagnóstico.
                </Paragraph>
                <Link href={'#'} variant="text" size="sm">
                    Saiba mais
                </Link>
            </div>
        </>
    )
}
