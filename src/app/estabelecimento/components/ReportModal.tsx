'use client'

import { useEffect } from 'react'
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

import { Establishment } from '@/interfaces/Establishment'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'
import { DotsThreeCircleIcon } from '@phosphor-icons/react/dist/ssr'

interface ReportModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    establishment: Establishment
}

export function ReportModal({
    isOpen,
    onOpenChange,
    establishment,
}: ReportModalProps) {
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
                        {/* <EstablishmentIcon
                            type={
                                establishment.abb as 'HOSPITAL' | 'UBS' | 'UPA'
                            }
                            delay
                        /> */}
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
                        <button className={buttonStyles}>
                            <span>
                                <ClockCountdownIcon />
                            </span>
                            Tempo de espera
                        </button>
                        <button className={buttonStyles}>
                            <span>
                                <PillIcon />
                            </span>
                            Falta de medicamentos
                        </button>
                        <button className={buttonStyles}>
                            <span>
                                <ProhibitInsetIcon />
                            </span>
                            Falta de serviços
                        </button>
                        <button className={buttonStyles}>
                            <span>
                                <StethoscopeIcon />
                            </span>
                            Sem médicos
                        </button>
                        <button className={buttonStyles}>
                            <span>
                                <DotsThreeCircleIcon />
                            </span>
                            Outro
                        </button>
                    </section>
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
                        <Button>
                            Continuar <CaretRightIcon />
                        </Button>
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
