'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'

import { contentContainer } from '../styles'

const INITIAL_CONTAINER_STATE = { opacity: 0, filter: 'blur(10px)', y: 50 }
const ANIMATE_CONTAINER_STATE = { opacity: 1, filter: 'blur(0)', y: 0 }
const EXIT_CONTAINER_STATE = { opacity: 0, filter: 'blur(10px)', y: 50 }

export function AnimatedMainContainer({ children }: { children: ReactNode }) {
    return (
        <motion.main
            layout
            key={'establishment-details'}
            initial={INITIAL_CONTAINER_STATE}
            animate={ANIMATE_CONTAINER_STATE}
            exit={EXIT_CONTAINER_STATE}
            className={contentContainer}
        >
            {children}
        </motion.main>
    )
}
