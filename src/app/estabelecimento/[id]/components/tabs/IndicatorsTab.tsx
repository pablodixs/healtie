import { Paragraph } from '@/components/Typography'
import { css } from '../../../../../../styled-system/css'
import {
    HealtieClassificationIndicator,
    OccupancyIndexIndicator,
    ResolutionIndexIndicator,
    WaitTimeIndicator,
} from '@/components/Indicators'
import { Link } from '@/components/Link'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'

interface IndicatorsTabProps {
    establishment: EstablishmentResponse | undefined
    setSelectedTab: (
        tab: 'overview' | 'indicators' | 'services' | 'comments'
    ) => void
}

export interface IndicatorsData {
    rating: number | null
    resolution_index: number | null
    wait_time: number | null
    occupation: number | null
}

export function IndicatorsTab({ establishment }: IndicatorsTabProps) {
    const { data } = useSWR<IndicatorsData>(
        `https://healtie-bh7zc.ondigitalocean.app/v1/establishment/${establishment?.cnes}/indicators`,
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
                <HealtieClassificationIndicator data={data} />
                <WaitTimeIndicator data={data} />
                <OccupancyIndexIndicator data={data} />
                <ResolutionIndexIndicator data={data} />
            </div>
            <div>
                <Paragraph bolder size="caption">
                    Sobre os Indicadores dos Estabelecimentos
                </Paragraph>
                <Paragraph size="caption" subtle>
                    Os indicadores mostram, de forma simples e transparente,
                    como a unidade está performando no dia a dia. Eles reúnem
                    dados reais de atendimento — como tempo de espera, qualidade
                    percebida, eficiência e experiência do usuário — para ajudar
                    tanto os pacientes quanto a própria unidade a entender onde
                    estão os pontos fortes e o que ainda pode melhorar.
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
    )
}
