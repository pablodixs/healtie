'use client'

import { motion } from 'motion/react'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import {
    titleContainer,
    barContainer,
    barFill,
    barBackground,
    descriptionContainer,
} from './styles'

export function ResolutionIndexIndicator() {
    return (
        <div
            className={css({
                padding: '1rem 1.25rem',
                border: '1px solid',
                borderColor: 'neutral.200',
                borderRadius: '12px',
            })}
        >
            <header className={titleContainer}>
                <div
                    className={css({
                        display: 'flex',
                        gap: '.5rem',
                        alignItems: 'center',
                        fontWeight: 500,
                    })}
                >
                    <CheckCircleIcon />
                    <p>Índice de Resolução</p>
                </div>
                <strong>Sem dados</strong>
            </header>
            <div className={barContainer}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4,
                        type: 'spring',
                        bounce: 0,
                    }}
                    className={barFill}
                    style={{ background: '#f48c06', width: '0%', left: '0%' }}
                />
                <div className={barBackground} />
            </div>
            <footer className={descriptionContainer}>
                <span>Baixo</span>
                <span>Médio</span>
                <span>Alto</span>
            </footer>
        </div>
    )
}
