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
import { IndicatorsData } from '@/app/estabelecimento/[cnes]/components/tabs/IndicatorsTab'

export interface IndicatorsProps {
    data: IndicatorsData | undefined
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
                        color: data?.rating ? 'inherit' : 'neutral.400',
                    })}
                >
                    {data?.rating || 'Sem dados'}
                </strong>
            </header>
            <div className={barContainer}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${data?.rating}%` }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4,
                        type: 'spring',
                        bounce: 0,
                    }}
                    className={barFill}
                    style={{
                        background: data?.rating
                            ? data?.rating < 30
                                ? '#e5383b'
                                : data?.rating < 60
                                  ? '#f48c06'
                                  : '#4caf50'
                            : 'transparent',
                    }}
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
