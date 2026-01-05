'use client'

import { motion } from 'framer-motion'
import { css } from '../../../../styled-system/css'

import { Spinner } from '@/components/spinner'
import { Paragraph } from '@/components/Typography'

interface SearchLoadingViewProps {
    query?: string
}

export function SearchLoadingView({ query }: SearchLoadingViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
            className={css({
                width: '100%',
                maxWidth: '1280px',
                display: 'flex',
                flexDirection: 'column',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1ch',
                })}
            >
                <Spinner size="sm" color="subtle" />
                <Paragraph subtle>
                    Buscando por &quot;{query}&quot;...
                </Paragraph>
            </div>
        </motion.div>
    )
}
