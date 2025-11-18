'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
    CaretRightIcon,
    ClockCountdownIcon,
    PillIcon,
    ProhibitInsetIcon,
    StethoscopeIcon,
    XIcon,
} from '@phosphor-icons/react'

import { css } from '../../../../styled-system/css'

import { Paragraph } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Tooltip } from '@/components/Tooltip'

import {
    DotsThreeCircleIcon,
    UsersFourIcon,
} from '@phosphor-icons/react/dist/ssr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import axios from 'axios'
import { Label } from '@/components/Form/Label'

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

export function ReportModal({
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
            `https://healtie-bh7zc.ondigitalocean.app/api/establishments/${establishment.cnes}/indicators`,
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
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange?.(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{
                    duration: 0.2,
                }}
                className={modalContainer}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className={bodyWrapperStyles}>
                    <header className={headerStyles}>
                        <Paragraph bolder marginCompact subtle>
                            Reportar
                        </Paragraph>
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
                    <section
                        className={css({
                            mt: '3rem',
                        })}
                    >
                        <EstablishmentIcon
                            type={
                                establishment.type as
                                    | 'Hospital Geral'
                                    | 'Unidade Básica de Saúde'
                                    | 'Unidade de Pronto Atendimento'
                            }
                            delay
                        />
                        <h1
                            className={css({
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                letterSpacing: '-0.02em',
                                color: 'primary',
                                textAlign: 'center',
                                mt: '0.5rem',
                            })}
                        >
                            {establishment.name}
                        </h1>
                    </section>
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
                            <button
                                onClick={() => setCurrentIndicator('waitTime')}
                                className={buttonStyles}
                            >
                                <span>
                                    <ClockCountdownIcon />
                                </span>
                                Tempo de espera
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentIndicator('medicationShortage')
                                }
                                className={buttonStyles}
                            >
                                <span>
                                    <PillIcon />
                                </span>
                                Falta de medicamentos
                            </button>
                            <button
                                onClick={() => setCurrentIndicator('occupancy')}
                                className={buttonStyles}
                            >
                                <span>
                                    <UsersFourIcon />
                                </span>
                                Ocupação
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentIndicator('serviceShortage')
                                }
                                className={buttonStyles}
                            >
                                <span>
                                    <ProhibitInsetIcon />
                                </span>
                                Falta de serviços
                            </button>
                            <button
                                onClick={() => setCurrentIndicator('noDoctors')}
                                className={buttonStyles}
                            >
                                <span>
                                    <StethoscopeIcon />
                                </span>
                                Sem médicos
                            </button>
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
    borderRadius: '0.75rem',
    width: '100%',
    minW: '600px',
    maxW: '500px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    pb: '6rem',
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
    padding: '1rem',
    backdropFilter: 'blur(2px)',
})

const headerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
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
    overflowY: 'auto',
    maxHeight: 'calc(90vh - 5rem)',
})
