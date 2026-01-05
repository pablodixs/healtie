'use client'

import { motion } from 'motion/react'
import { css } from '../../../../styled-system/css'
import { NearEstablishmentsBanner } from '@/components/NearEstablishmentsBanner'

export function SearchDefaultView() {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className={css({
                width: '100%',
                maxWidth: '800px',
                position: 'relative',
            })}
        >
            <NearEstablishmentsBanner />
        </motion.div>
    )
}
