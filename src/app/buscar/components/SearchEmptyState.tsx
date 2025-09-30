'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { TrendUpIcon } from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../../styled-system/css'

import { Subheading } from '@/components/Typography/Subheading'

export function SearchEmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1 }}
            className={container}
        >
            <header>
                <Subheading>Sugestões</Subheading>
            </header>
            <section>
                <Link className={linkStyle} href={'#'}>
                    <TrendUpIcon size={18} /> Hospital Regional de Taguatinga
                </Link>
                <Link className={linkStyle} href={'#'}>
                    <TrendUpIcon size={18} /> Vacina da gripe
                </Link>
                <Link className={linkStyle} href={'#'}>
                    <TrendUpIcon size={18} /> Ginecologista
                </Link>
                <Link className={linkStyle} href={'#'}>
                    <TrendUpIcon size={18} /> Pronto socorro
                </Link>
            </section>
        </motion.div>
    )
}

const container = css({
    width: '100%',
    maxWidth: '800px',

    '& section': {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },

    '& header': {
        borderBottom: '1px solid',
        borderColor: 'gray.200',
        paddingY: '1rem',
        marginBottom: '1rem',
    },
})

const linkStyle = css({
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5ch',
    color: 'gray.500',

    _hover: {
        color: 'tint',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
    },
})
