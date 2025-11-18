'use client'
import { motion } from 'motion/react'
import { TimerIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import {
    titleContainer,
    barContainer,
    barFill,
    barBackground,
    descriptionContainer,
} from './styles'
import { IndicatorsProps } from './HealtieClassificationIndicator'

export function WaitTimeIndicator({ data }: IndicatorsProps) {
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
                    <TimerIcon />
                    <p>Tempo de Espera Médio</p>
                </div>
                <div
                    className={css({
                        display: 'flex',
                        flexDir: 'column',
                        alignItems: 'flex-end',
                    })}
                >
                    <strong
                        className={css({
                            color: data?.wait_time ? 'inherit' : 'neutral.400',
                        })}
                    >
                        {data?.wait_time || 'Sem dados'}
                    </strong>
                    {data?.wait_time && (
                        <span
                            className={css({
                                fontSize: '0.875rem',
                                color: 'neutral.500',
                            })}
                        >
                            Cerca de 2 horas
                        </span>
                    )}
                </div>
            </header>
            <div className={barContainer}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${data?.wait_time || 0}%` }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4,
                        type: 'spring',
                        bounce: 0,
                    }}
                    className={barFill}
                    style={{ background: '#e5383b' }}
                />
                <div className={barBackground} />
            </div>
            <footer className={descriptionContainer}>
                <span>Baixo</span>
                <span>Alto</span>
            </footer>
        </div>
    )
}
