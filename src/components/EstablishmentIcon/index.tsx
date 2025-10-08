'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
} from '@phosphor-icons/react'

import { markerContainer } from '../Map/maker.styles'

interface EstablishmentIconProps {
    type: 'HOSPITAL' | 'UBS' | 'UPA'
    delay?: boolean
}

export function EstablishmentIcon({ type, delay }: EstablishmentIconProps) {
    return (
        <AnimatePresence>
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
                        type: type as 'HOSPITAL' | 'UBS' | 'UPA',
                    })}
                >
                    {type === 'HOSPITAL' && <HospitalIcon weight="fill" />}
                    {type === 'UBS' && <FirstAidIcon weight="fill" />}
                    {type === 'UPA' && <AmbulanceIcon weight="fill" />}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
