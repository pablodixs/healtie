'use client'

import { css } from '../../../styled-system/css'
import { motion } from 'motion/react'
import { Paragraph } from '../Typography'
import { EstablishmentIcon } from '../EstablishmentIcon'
import { Button } from '../Button'
import { XIcon } from '@phosphor-icons/react'
import { IAmHereForm } from './IAmHereForm'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

interface IAmHereDialogProps {
    onOpenChange: (open: boolean) => void
    establishment: EstablishmentResponse
}

export function IAmHereDialog({
    onOpenChange,
    establishment,
}: IAmHereDialogProps) {
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
                <header
                    className={css({
                        display: 'flex',
                        justifyContent: 'flex-end',
                    })}
                >
                    <Button
                        onClick={() => onOpenChange(false)}
                        iconButton
                        variant="subtle"
                    >
                        <XIcon />
                    </Button>
                </header>
                <div
                    className={css({
                        display: 'flex',
                        gap: '.5rem',
                        alignItems: 'center',
                    })}
                >
                    {/* <EstablishmentIcon
                        decoration
                        type={establishment.type as 'HOSPITAL' | 'UBS' | 'UPA'}
                    /> */}
                    <Paragraph bolder>{establishment.name}</Paragraph>
                </div>

                <IAmHereForm />
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
