'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { css } from '../../../styled-system/css'

interface CollapsibleItemProps {
    title: string
    children: ReactNode
}

export function CollapsibleItem({ title, children }: CollapsibleItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className={collapsibleItemContainer}>
            <button onClick={() => setIsExpanded(!isExpanded)}>{title}</button>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const collapsibleItemContainer = css({
    '& button': {
        fontSize: '1.125rem',
        fontWeight: 500,
    },
})
