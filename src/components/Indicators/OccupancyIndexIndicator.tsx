'use client'

import { motion } from 'motion/react'
import { UsersFourIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import {
    titleContainer,
    barContainer,
    barFill,
    barBackground,
    descriptionContainer,
} from './styles'
import { IndicatorsProps } from './HealtieClassificationIndicator'

export function OccupancyIndexIndicator({ data }: IndicatorsProps) {
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
                    <UsersFourIcon />
                    <p>Ocupação</p>
                </div>
                <strong
                    className={css({
                        color: data?.occupation ? 'inherit' : 'neutral.400',
                    })}
                >
                    {data?.occupation || 'Sem dados'}
                </strong>
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
                    style={{
                        background: '#f48c06',
                        width: '10%',
                        left: `${data?.occupation || 0}%`,
                    }}
                />
                <div className={barBackground} />
            </div>
            <footer className={descriptionContainer}>
                <span>Vazio</span>
                <span>Moderado</span>
                <span>Lotado</span>
            </footer>
        </div>
    )
}
