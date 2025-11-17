'use client'
import { motion } from 'motion/react'
import { GaugeIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import {
    titleContainer,
    barContainer,
    barFill,
    barBackground,
    descriptionContainer,
} from './styles'

export interface IndicatorsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any | null
}

export function HealtieClassificationIndicator({ data }: IndicatorsProps) {
    return (
        <div
            className={css({
                padding: '1rem',
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
                    <GaugeIcon />
                    <p>Classificação do Healtie </p>
                </div>
                <strong
                    className={css({
                        color: data?.healtieClassification
                            ? 'inherit'
                            : 'neutral.400',
                    })}
                >
                    {data?.healtieClassification || 'Sem dados'}
                </strong>
            </header>
            <div className={barContainer}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${data?.healtieClassification || 0}%` }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4,
                        type: 'spring',
                        bounce: 0,
                    }}
                    className={barFill}
                />
                <div className={barBackground} />
            </div>
            <footer className={descriptionContainer}>
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
                <span>60</span>
                <span>70</span>
                <span>80</span>
                <span>90</span>
                <span>100</span>
            </footer>
        </div>
    )
}
