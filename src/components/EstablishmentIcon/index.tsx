'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
} from '@phosphor-icons/react'

import { markerContainer } from '../Map/maker.styles'

interface EstablishmentIconProps {
    type:
        | 'Hospital Geral'
        | 'Unidade Básica de Saúde'
        | 'Unidade de Pronto Atendimento'
    delay?: boolean
    size?: 'default' | 'small' | 'large' | 'xs'
    decoration?: boolean
    animation?: boolean
    square?: boolean
}

export function EstablishmentIcon({
    type,
    delay,
    size = 'default',
    decoration = false,
    animation = true,
    square = false,
}: EstablishmentIconProps) {
    if (decoration) {
        return (
            <AnimatePresence initial={animation}>
                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: [0.5, 1],
                        rotate: [0, 10, -10, 5, 0],
                        transformOrigin: 'center bottom',
                    }}
                    exit={{
                        scale: 0,
                    }}
                    transition={{ delay: delay ? 0.25 : 0 }}
                    className={markerContainer({
                        type: type as
                            | 'Hospital Geral'
                            | 'Unidade Básica de Saúde'
                            | 'Unidade de Pronto Atendimento',
                        size,
                        square,
                    })}
                >
                    {type === 'Hospital Geral' && (
                        <HospitalIcon weight="fill" />
                    )}
                    {type === 'Unidade Básica de Saúde' && (
                        <FirstAidIcon weight="fill" />
                    )}
                    {type === 'Unidade de Pronto Atendimento' && (
                        <AmbulanceIcon weight="fill" />
                    )}
                </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence initial={animation}>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: [0, 1.5],
                        rotate: [0, 10, -10, 5, 0],
                        transformOrigin: 'center bottom',
                    }}
                    exit={{
                        scale: 0,
                    }}
                    transition={{ delay: delay ? 0.25 : 0 }}
                    className={markerContainer({
                        type: type as
                            | 'Hospital Geral'
                            | 'Unidade Básica de Saúde'
                            | 'Unidade de Pronto Atendimento',
                        size,
                        square,
                    })}
                >
                    {type === 'Hospital Geral' && (
                        <HospitalIcon weight="fill" />
                    )}
                    {type === 'Unidade Básica de Saúde' && (
                        <FirstAidIcon weight="fill" />
                    )}
                    {type === 'Unidade de Pronto Atendimento' && (
                        <AmbulanceIcon weight="fill" />
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
