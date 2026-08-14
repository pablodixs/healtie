'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
    CaretLeftIcon,
    CaretRightIcon,
    ClockCountdownIcon,
    PillIcon,
    ProhibitInsetIcon,
    StethoscopeIcon,
    XIcon,
} from '@phosphor-icons/react'

import { Paragraph, Subheading } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Tooltip } from '@/components/Tooltip'

import { UsersFourIcon } from '@phosphor-icons/react/dist/ssr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import axios from 'axios'
import { Label } from '@/components/Form/Label'
import { css } from '../../../../../styled-system/css'
import Image from 'next/image'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'
import { WaitTimeOptionView } from './options/wait-time-option-view'

const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

interface ReportModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    establishment: EstablishmentResponse
}

interface IndicatorsRequestBody {
    occupation?: number | null
    wait_time?: number | null
    resolution_index?: number | null
}

interface ReportOption {
    label: string
    icon: ReactNode
    key: string
    description: string
    imageUrl: string
}

const reportOptions: ReportOption[] = [
    {
        label: 'Tempo de espera',
        icon: <ClockCountdownIcon />,
        key: 'waitTime',
        imageUrl: '/images/il/wait-time.png',
        description: 'Reportar tempo de espera para atendimento nesta unidade.',
    },
    {
        label: 'Falta de medicamentos',
        icon: <PillIcon />,
        key: 'medicationShortage',
        imageUrl: '/images/il/medication-shortage.png',
        description: 'Reportar falta de medicamentos nesta unidade.',
    },
    {
        label: 'Ocupação',
        icon: <UsersFourIcon />,
        key: 'occupancy',
        imageUrl: '/images/il/occupancy.png',
        description: 'Reportar taxa de ocupação desta unidade.',
    },
    {
        label: 'Falta de serviços',
        icon: <ProhibitInsetIcon />,
        key: 'serviceShortage',
        imageUrl: '/images/il/wait-time.png',
        description: 'Reportar falta de serviços nesta unidade.',
    },
    {
        label: 'Sem médicos',
        icon: <StethoscopeIcon />,
        key: 'noDoctors',
        imageUrl: '/images/il/wait-time.png',
        description: 'Reportar ausência de médicos nesta unidade.',
    },
]

export function ReportModalView({
    isOpen,
    onOpenChange,
    establishment,
}: ReportModalProps) {
    const [currentIndicator, setCurrentIndicator] = useState<string | null>(
        null
    )
    const [indicators, setIndicators] = useState<IndicatorsRequestBody>({
        occupation: null,
        wait_time: null,
        resolution_index: null,
    })

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const postIndicators = async () => {
        await axios.post(
            `${API_URL}/establishment/${establishment.cnes}/indicators`,
            indicators
        )
    }

    const handleSubmit = () => {
        postIndicators()
    }

    if (!isOpen) return null

    return (
        <motion.div
            className={overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange?.(false)}
        >
            <motion.div
                initial={{ y: '200%' }}
                animate={{ y: '0%' }}
                exit={{ y: '200%' }}
                transition={{
                    duration: 0.45,
                    type: 'spring',
                    bounce: 0,
                }}
                className={modalContainer}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <header className={headerStyles}>
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: '34px 1fr 34px',
                            alignItems: 'flex-start',
                        })}
                    >
                        <div className={css({ display: 'flex', gap: '1ch' })}>
                            <AnimatePresence>
                                {currentIndicator !== null && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            filter: 'blur(2px)',
                                            scale: 0.9,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            filter: 'blur(0px)',
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            filter: 'blur(2px)',
                                            scale: 0.9,
                                        }}
                                    >
                                        <Button
                                            iconButton
                                            variant="subtle"
                                            onClick={() => {
                                                if (currentIndicator !== null) {
                                                    setCurrentIndicator(null)
                                                }
                                            }}
                                        >
                                            <CaretLeftIcon weight="bold" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1ch',
                                flex: 1,
                            })}
                        >
                            <EstablishmentIcon
                                type={
                                    establishment.type as
                                        | 'Hospital Geral'
                                        | 'Unidade Básica de Saúde'
                                        | 'Unidade de Pronto Atendimento'
                                }
                                size="small"
                                decoration
                                animation={false}
                            />
                            <Paragraph marginCompact bolder>
                                {establishment.name}
                            </Paragraph>
                        </div>
                        <Button
                            iconButton
                            onClick={() => onOpenChange?.(false)}
                            variant="subtle"
                        >
                            <XIcon weight="bold" />
                        </Button>
                    </div>
                    <ProgressiveBlur />
                </header>
                <div className={bodyWrapperStyles}>
                    {currentIndicator === null && (
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5rem',
                                mt: '.5rem',
                            })}
                        >
                            <Subheading centered>
                                O que você quer reportar?
                            </Subheading>
                            <div
                                className={css({
                                    mt: '1rem',
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(160px, 1fr))',
                                    gap: '1rem',
                                })}
                            >
                                {reportOptions.map((option) => (
                                    <button
                                        onClick={() =>
                                            setCurrentIndicator(option.key)
                                        }
                                        key={option.key}
                                        className={css({
                                            padding: '0.5rem',
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            borderRadius: '1rem',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.1s',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            textAlign: 'left',
                                            gap: 0,

                                            _hover: {
                                                borderColor:
                                                    'rgba(0, 0, 0, 0.3)',
                                            },
                                        })}
                                    >
                                        <Image
                                            className={css({
                                                borderRadius: '8px',
                                                marginBottom: '0.5rem',
                                                width: '100%',
                                                height: 'auto',
                                            })}
                                            src={option.imageUrl}
                                            alt={option.label}
                                            width={200}
                                            height={120}
                                            quality={80}
                                        />
                                        <Paragraph marginCompact bolder>
                                            {option.label}
                                        </Paragraph>
                                        <Paragraph
                                            marginCompact
                                            subtle
                                            size="caption"
                                        >
                                            {option.description}
                                        </Paragraph>
                                    </button>
                                ))}
                            </div>
                        </motion.section>
                    )}
                    <AnimatePresence initial={false} mode="wait">
                        {currentIndicator === 'waitTime' && (
                            <WaitTimeOptionView establishment={establishment} />
                        )}
                    </AnimatePresence>

                    {currentIndicator === 'occupancy' && (
                        <div>
                            <Paragraph bolder subtle marginCompact>
                                Reportar Taxa de Ocupação
                            </Paragraph>
                            <Label htmlFor="occupancy">
                                Taxa de Ocupação (%)
                            </Label>
                            <input
                                id="occupancy"
                                className={css({
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: 'neutral.100',
                                    width: '100%',
                                })}
                                type="number"
                                onChange={(e) =>
                                    setIndicators((prev) => ({
                                        ...prev,
                                        occupancy: Number(e.target.value),
                                    }))
                                }
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

const modalContainer = css({
    backgroundColor: 'white',
    width: '100%',
    maxWidth: { md: '600px' },
    height: '100%',
    maxHeight: { md: '90dvh', base: '100vh' },
    display: 'flex',
    flexDirection: {
        base: 'column',
        md: 'row',
    },
    position: 'relative',
    gap: '1rem',
    borderRadius: { base: '0', md: '26px' },
    paddingTop: { base: '4.5rem', md: '1rem' },
    overflow: 'hidden',
    boxShadow: 'xl',
})

const overlay = css({
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    position: 'fixed',
    inset: 0,
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const headerStyles = css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1rem',
    zIndex: 1,
})

const bodyWrapperStyles = css({
    position: 'relative',
    flex: 1,
    overflowY: 'auto',
    pt: { base: '0', md: '3.25rem' },
    px: '1rem',
    pb: '1rem',
})
