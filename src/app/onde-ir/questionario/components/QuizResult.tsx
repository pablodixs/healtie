'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import {
    ArrowClockwiseIcon,
    HospitalIcon,
    FirstAidIcon,
    BandaidsIcon,
    CheckCircleIcon,
    ClockIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../../styled-system/css'
import { stack } from '../../../../../styled-system/patterns'
import useSWR from 'swr'
import { EstablishmentPointResponse } from '@/interfaces/Establishment'
import { fetcher } from '@/lib/swrFetcher'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { MapMarkerDecoration } from '@/components/Map/MapMarkerDecoration'
import Link from 'next/link'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'

interface QuizResultProps {
    result: string
    onRestart: () => void
}

const resultContainerStyles = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem',
    textAlign: 'center',
    margin: '0 auto',
})

const iconContainerStyles = css({
    padding: '1.5rem',
    borderRadius: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
})

const urgentStyles = css({
    backgroundColor: '#fee2e2',
    color: '#dc2626',
})

const moderateStyles = css({
    backgroundColor: '#fef3c7',
    color: '#d97706',
})

const lightStyles = css({
    backgroundColor: '#dcfce7',
    color: '#16a34a',
})

const autoStyles = css({
    backgroundColor: '#dbeafe',
    color: '#2563eb',
})

const buttonContainerStyles = css({
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    width: '100%',
})

const infoBoxStyles = css({
    backgroundColor: 'background',
    borderRadius: 'lg',
    padding: '1.5rem',
    width: '100%',
    textAlign: 'left',
})

function HospitalResult({ onRestart }: { onRestart: () => void }) {
    const { coords } = useUserGeolocation()
    const { data, isLoading } = useSWR<EstablishmentPointResponse[]>(
        coords
            ? `healtie-bh7zc.ondigitalocean.app/v1/establishment/nearby?latitude=${coords.latitude}&longitude=${coords.longitude}&radiusInKm=5000&type=HOSPITAL`
            : null,
        fetcher
    )

    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.4 }}
            className={resultContainerStyles}
        >
            <div className={`${iconContainerStyles} ${urgentStyles}`}>
                <HospitalIcon weight="fill" />
            </div>

            <div>
                <Heading>Vá para o Hospital imediatamente!</Heading>
                <Paragraph size="subheadline" centered>
                    Baseado nos seus sintomas, você precisa de atendimento
                    hospitalar urgente.
                </Paragraph>
            </div>

            <div className={infoBoxStyles}>
                <div
                    className={stack({
                        direction: 'row',
                        align: 'center',
                        gap: '0.5rem',
                    })}
                >
                    <WarningCircleIcon size={20} color="#dc2626" />
                    <Paragraph bolder>O que fazer agora:</Paragraph>
                </div>
                <Paragraph>• Procure o hospital mais próximo</Paragraph>
                <Paragraph>
                    • Se não conseguir se locomover, chame uma ambulância (SAMU
                    192)
                </Paragraph>
                <Paragraph>
                    • Leve documentos e lista de medicamentos que você usa
                </Paragraph>
                <Paragraph>
                    • Não dirija sozinho se estiver passando mal
                </Paragraph>
            </div>
            {data && data.length > 0 && (
                <div>
                    <Paragraph bolder size="subheadline">
                        Hospitais próximos
                    </Paragraph>
                    <div
                        className={css({
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                        })}
                    >
                        {data.map((e) => {
                            return (
                                <Link
                                    href={`/estabelecimento/${e.cnes}`}
                                    key={e.cnes}
                                    className={css({
                                        display: 'flex',
                                        gap: '0.5rem',
                                        alignItems: 'center',
                                    })}
                                >
                                    <MapMarkerDecoration
                                        establishmentType={
                                            e.type as
                                                | 'Hospital Geral'
                                                | 'Unidade Básica de Saúde'
                                                | 'Unidade de Pronto Atendimento'
                                        }
                                    />
                                    <div>
                                        <Paragraph marginCompact bolder>
                                            {e.name}
                                        </Paragraph>
                                        <span
                                            className={css({
                                                fontSize: '0.875rem',
                                                color: 'green.600',
                                            })}
                                        >
                                            A{' '}
                                            {formatDistance(
                                                calculateDistance(
                                                    e.geolocation.latitude,
                                                    e.geolocation.longitude,
                                                    coords!.latitude,
                                                    coords!.longitude
                                                )
                                            )}{' '}
                                            de distância
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
            <div className={buttonContainerStyles}>
                <Button variant="secondary" onClick={onRestart}>
                    <ArrowClockwiseIcon /> Refazer Triagem
                </Button>
            </div>
        </motion.div>
    )
}

function UpaResult({ onRestart }: { onRestart: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.4 }}
            className={resultContainerStyles}
        >
            <div className={`${iconContainerStyles} ${moderateStyles}`}>
                <BandaidsIcon weight="fill" />
            </div>

            <div>
                <Heading>Procure a UPA mais próxima</Heading>
                <Paragraph size="subheadline" centered>
                    Seus sintomas indicam necessidade de atendimento rápido em
                    uma Unidade de Pronto Atendimento.
                </Paragraph>
            </div>

            <div className={infoBoxStyles}>
                <div
                    className={stack({
                        direction: 'row',
                        align: 'center',
                        gap: '0.5rem',
                    })}
                >
                    <ClockIcon size={20} color="#d97706" />
                    <Paragraph bolder>Sobre as UPAs:</Paragraph>
                </div>
                <Paragraph>
                    • Funcionam 24 horas por dia, todos os dias
                    <br />
                    • Atendimento para casos de urgência e emergência
                    <br />
                    • Realizem exames básicos e procedimentos
                    <br />• Tempo de espera geralmente menor que hospitais
                </Paragraph>
            </div>

            <div className={buttonContainerStyles}>
                <Button variant="primary">Encontrar UPA próxima</Button>
                <Button variant="secondary" onClick={onRestart}>
                    <ArrowClockwiseIcon /> Refazer Triagem
                </Button>
            </div>
        </motion.div>
    )
}

function UbsResult({ onRestart }: { onRestart: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.4 }}
            className={resultContainerStyles}
        >
            <div className={`${iconContainerStyles} ${lightStyles}`}>
                <FirstAidIcon weight="fill" />
            </div>

            <div>
                <Heading>Procure a UBS mais próxima</Heading>
                <Paragraph size="subheadline" centered>
                    Seu caso pode ser resolvido na Unidade Básica de Saúde mais
                    próxima.
                </Paragraph>
            </div>

            <div className={infoBoxStyles}>
                <div
                    className={stack({
                        direction: 'row',
                        align: 'center',
                        gap: '0.5rem',
                    })}
                >
                    <CheckCircleIcon size={20} color="#16a34a" />
                    <Paragraph bolder>Serviços disponíveis na UBS:</Paragraph>
                </div>
                <Paragraph>
                    • Consultas médicas e de enfermagem
                    <br />
                    • Vacinação e exames preventivos
                    <br />
                    • Acompanhamento de doenças crônicas
                    <br />
                    • Atendimento odontológico básico
                    <br />• Orientações sobre cuidados com a saúde
                </Paragraph>
            </div>

            <div className={buttonContainerStyles}>
                <Button variant="primary">Encontrar UBS próxima</Button>
                <Button variant="secondary" onClick={onRestart}>
                    <ArrowClockwiseIcon /> Refazer Triagem
                </Button>
            </div>
        </motion.div>
    )
}

function AutoCareResult({ onRestart }: { onRestart: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.4 }}
            className={resultContainerStyles}
        >
            <div className={`${iconContainerStyles} ${autoStyles}`}>
                <CheckCircleIcon weight="fill" />
            </div>

            <div>
                <Heading>Continue se observando</Heading>
                <Paragraph size="subheadline" centered>
                    No momento, não há sinais de urgência. Continue monitorando
                    seus sintomas.
                </Paragraph>
            </div>

            <div className={infoBoxStyles}>
                <div
                    className={stack({
                        direction: 'row',
                        align: 'center',
                        gap: '0.5rem',
                    })}
                >
                    <ClockIcon size={20} color="#2563eb" />
                    <Paragraph bolder>Orientações para autocuidado:</Paragraph>
                </div>
                <Paragraph>
                    • Mantenha repouso e hidratação adequada
                    <br />
                    • Observe se os sintomas pioram ou persistem
                    <br />
                    • Procure atendimento se sentir piora
                    <br />
                    • Continue tomando medicações prescritas
                    <br />• Em caso de dúvida, consulte um profissional de saúde
                </Paragraph>
            </div>

            <div className={buttonContainerStyles}>
                <Button variant="primary">
                    Encontrar UBS para consulta preventiva
                </Button>
                <Button variant="secondary" onClick={onRestart}>
                    <ArrowClockwiseIcon /> Refazer Triagem
                </Button>
            </div>
        </motion.div>
    )
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
    switch (result) {
        case 'hospital':
            return <HospitalResult onRestart={onRestart} />
        case 'upa':
            return <UpaResult onRestart={onRestart} />
        case 'ubs':
            return <UbsResult onRestart={onRestart} />
        case 'auto':
            return <AutoCareResult onRestart={onRestart} />
        default:
            return (
                <motion.div
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={resultContainerStyles}
                >
                    <Paragraph>Resultado não encontrado.</Paragraph>
                    <Button variant="secondary" onClick={onRestart}>
                        <ArrowClockwiseIcon /> Refazer Triagem
                    </Button>
                </motion.div>
            )
    }
}
