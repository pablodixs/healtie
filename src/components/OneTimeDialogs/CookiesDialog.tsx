'use client'

import { motion } from 'motion/react'
import {
    ArrowUpRightIcon,
    CheckCircleIcon,
    CookieIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'

import { Button } from '../Button'
import { Paragraph } from '../Typography'
import { Link } from '../Link'
import { useState } from 'react'

interface CookiesDialogProps {
    savePreference: (accepted: boolean) => void
}

export function CookiesDialog({ savePreference }: CookiesDialogProps) {
    const [hasUserInteracted, setHasUserInteracted] = useState(false)

    const handleSavePreference = (accepted: boolean) => {
        setHasUserInteracted(true)
        savePreference(accepted)
    }

    return (
        <>
            {hasUserInteracted ? null : (
                <motion.dialog
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                    open
                    className={dialogContainer}
                >
                    <CookieIcon size={30} weight="fill" />
                    <h1 className={headingStyle}>
                        O Healtie se preocupa com sua privacidade
                    </h1>
                    <Paragraph marginCompact>
                        Utilizamos cookies para garantir o funcionamento da
                        plataforma, personalizar sua experiência e analisar o
                        uso do sistema. Ao continuar, você concorda com nossa{' '}
                        <Link variant="textSubtle" href={'/privacidade'}>
                            Política de Privacidade
                            <ArrowUpRightIcon size={14} weight="bold" />
                        </Link>
                        .
                    </Paragraph>
                    <footer className={footerStyle}>
                        <Button
                            onClick={() => handleSavePreference(false)}
                            variant="text"
                        >
                            Rejeitar
                        </Button>
                        <Button
                            onClick={() => handleSavePreference(true)}
                            variant="secondary"
                        >
                            Aceitar Cookies <CheckCircleIcon size={22} />
                        </Button>
                    </footer>
                </motion.dialog>
            )}
        </>
    )
}

const dialogContainer = css({
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '1rem',
    padding: '1rem',
    borderRadius: '1.5rem',
    zIndex: 1000,
    maxWidth: '26rem',
    backgroundColor: 'neutral.50',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
})

const headingStyle = css({
    fontSize: '1.125rem',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    marginTop: '0.25rem',
})

const footerStyle = css({
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '1rem',
})
