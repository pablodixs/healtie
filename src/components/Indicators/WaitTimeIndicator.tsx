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
import { Spinner } from '../spinner'

export function WaitTimeIndicator({ data, isLoading }: IndicatorsProps) {
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
                    {isLoading ? (
                        <Spinner color="subtle" />
                    ) : (
                        <strong
                            className={css({
                                color: data ? 'inherit' : 'neutral.400',
                            })}
                        >
                            {data
                                ? data < 25
                                    ? 'Baixo'
                                    : data < 50
                                      ? 'Médio'
                                      : 'Alto'
                                : 'Sem dados'}
                        </strong>
                    )}
                    {data && (
                        <span
                            className={css({
                                fontSize: '0.875rem',
                                color: 'neutral.500',
                            })}
                        >
                            Cerca de {data} min
                        </span>
                    )}
                </div>
            </header>
            <div className={barContainer}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${data || 0}%` }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4,
                        type: 'spring',
                        bounce: 0,
                    }}
                    className={barFill}
                    style={{
                        background: data
                            ? data < 30
                                ? '#4caf50'
                                : data < 60
                                  ? '#f48c06'
                                  : '#e5383b'
                            : 'transparent',
                    }}
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
