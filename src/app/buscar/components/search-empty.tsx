'use client'

import { motion } from 'motion/react'
import { Paragraph } from '@/components/Typography'
import { css } from '../../../../styled-system/css'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

export function SearchEmpty() {
    return (
        <motion.div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'primary',
                mt: '2rem',
            })}
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0 }}
        >
            <MagnifyingGlassIcon size={36} />
            <Paragraph size="subheadline" bolder>
                Sua pesquisa não encontrou nenhum estabelecimento
                correspondente.
            </Paragraph>
        </motion.div>
    )
}
