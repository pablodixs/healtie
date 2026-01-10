'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
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
            { indicators }
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
                    duration: 0.4,
                    type: 'spring',
                    bounce: 0,
                }}
                className={modalContainer}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div>
                    <Subheading>Reportar</Subheading>
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1ch',
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
                </div>

                <div className={bodyWrapperStyles}>
                    <header className={headerStyles}>
                        <Tooltip placement="bottom" content="Fechar">
                            <Button
                                variant="ghost"
                                iconButton
                                onClick={() => onOpenChange?.(false)}
                                aria-label="Fechar "
                            >
                                <XIcon weight="bold" />
                            </Button>
                        </Tooltip>
                    </header>

                    {currentIndicator === null && (
                        <section
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5rem',
                                mt: '.5rem',
                            })}
                        >
                            <Paragraph bolder subtle marginCompact>
                                O que você quer reportar?
                            </Paragraph>
                            <div
                                className={css({
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(200px  , 1fr))',
                                    gap: '1rem',
                                })}
                            >
                                {reportOptions.map((option) => (
                                    <button
                                        key={option.key}
                                        className={css({
                                            padding: '0.5rem',
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            borderRadius: '1rem',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.1s',

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
                                        <Paragraph bolder>
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
                        </section>
                    )}
                    {currentIndicator === 'waitTime' && (
                        <div>
                            <Paragraph bolder subtle marginCompact>
                                Reportar tempo de espera
                            </Paragraph>
                            <Label htmlFor="waitTime">
                                Tempo de espera (minutos)
                            </Label>
                            <input
                                id="waitTime"
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
                                        wait_time: Number(e.target.value),
                                    }))
                                }
                            />
                        </div>
                    )}
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
                <footer className={footerStyles}>
                    <div
                        className={css({
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '.5rem',
                        })}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange?.(false)}
                        >
                            Cancelar
                        </Button>
                        {currentIndicator !== null && (
                            <Button onClick={handleSubmit}>Enviar</Button>
                        )}
                    </div>
                </footer>
            </motion.div>
        </motion.div>
    )
}

const modalContainer = css({
    backgroundColor: 'white',
    p: '1.5rem',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    position: 'relative',
    py: '4.5rem',
    gap: '3rem',
})

const overlay = css({
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const headerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const buttonStyles = css({
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    padding: '.5rem',
    fontWeight: 500,
    color: 'primary',
    cursor: 'pointer',
    borderRadius: '0.75rem',

    '& span': {
        display: 'block',
        width: 'fit-content',
        padding: '0.375rem',
        borderRadius: '50%',
        background: 'neutral.100',

        '& svg': {
            fontSize: '1.25rem',
        },
    },

    _hover: {
        backgroundColor: 'neutral.50',
    },
})

const footerStyles = css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: '1rem',
    borderTop: '1px solid',
    borderColor: 'gray.100',
    borderRadius: '0 0 0.75rem 0.75rem',
})

const bodyWrapperStyles = css({
    flex: 1,
    margin: '0 auto',
    overflowY: 'auto',
})
