'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import {
    ClockCountdownIcon,
    PillIcon,
    ProhibitInsetIcon,
    StethoscopeIcon,
    XIcon,
} from '@phosphor-icons/react'

import { css } from '../../../../styled-system/css'

import { Paragraph, Subheading } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Tooltip } from '@/components/Tooltip'

import { Establishment } from '@/interfaces/Establishment'

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
            document.body.style.overflow = 'hidden' // Disable scrolling
        } else {
            document.body.style.overflow = 'unset' // Re-enable scrolling
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, type: 'spring', bounce: 0 }}
                className={modalContainer}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <header className={headerStyles}>
                    <Paragraph bolder marginCompact>
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
                <section>
                    <Paragraph centered size="subheadline" bolder>
                        {establishment.name}
                    </Paragraph>
                </section>
                <section
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem',
                        mt: '1.5rem',
                    })}
                >
                    <button className={buttonStyles}>
                        <span>
                            <ClockCountdownIcon size={32} />
                        </span>
                        Tempo de espera
                    </button>
                    <button className={buttonStyles}>
                        <span>
                            <PillIcon size={32} />
                        </span>
                        Falta de medicamentos
                    </button>
                    <button className={buttonStyles}>
                        <span>
                            <ProhibitInsetIcon size={32} />
                        </span>
                        Falta de serviços
                    </button>
                    <button className={buttonStyles}>
                        <span>
                            <StethoscopeIcon size={32} />
                        </span>
                        Sem médicos
                    </button>
                </section>
            </motion.div>
        </motion.div>
    )
}

const modalContainer = css({
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
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
    marginBottom: '0.5rem',
})

const buttonStyles = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.75rem',
    padding: '.5rem',
    fontWeight: 500,
    color: 'primary',
    cursor: 'pointer',
    aspectRatio: '1/1',
    borderRadius: '0.75rem',
    lineHeight: '120%',

    '& span': {
        display: 'block',
        width: 'fit-content',
        padding: '0.5rem',
        borderRadius: '50%',
        background: 'linear-gradient(to bottom, #AE35FF 0%, #9900FF 100%)',
        color: 'white',
    },

    _hover: {
        backgroundColor: 'background',
    },
})
