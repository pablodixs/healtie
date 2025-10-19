'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'

import { contentContainer } from '../styles'

// Outer container should only handle layout animation (no transforms) to avoid
// stretching/jank in scrollable containers.
const OUTER_TRANSITION = {
    layout: { type: 'spring' as const, stiffness: 280, damping: 25 },
}

// Inner wrapper handles entrance/exit transforms and opacity.
const INNER_INITIAL = { opacity: 0, y: 20, filter: 'blur(10px)' }
const INNER_ANIMATE = { opacity: 1, y: 0, filter: 'blur(0)' }
const INNER_EXIT = { opacity: 0, y: 20, filter: 'blur(10px)' }
const INNER_TRANSITION = {
    opacity: { duration: 0.18 },
    y: { type: 'spring' as const, stiffness: 280, damping: 25 },
}

export function AnimatedMainContainer({ children }: { children: ReactNode }) {
    return (
        <motion.main
            layout
            layoutId="aside-container"
            transition={OUTER_TRANSITION}
            className={contentContainer}
        >
            <motion.div
                initial={INNER_INITIAL}
                animate={INNER_ANIMATE}
                exit={INNER_EXIT}
                transition={INNER_TRANSITION}
            >
                {children}
            </motion.div>
        </motion.main>
    )
}
