'use client'

import Link from 'next/link'
import { motion, stagger } from 'motion/react'
import {
    BandaidsIcon,
    FirstAidIcon,
    HospitalIcon,
    SyringeIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'

const list = {
    visible: {
        transition: {
            when: 'beforeChildren',
            delayChildren: stagger(0.15),
        },
    },
    hidden: {
        transition: {
            when: 'afterChildren',
        },
    },
}

const variants = {
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(5px)' },
}

export function SearchTags() {
    return (
        <motion.div
            className={searchTagsContainer}
            initial="hidden"
            animate="visible"
            variants={list}
        >
            <motion.div variants={variants}>
                <Link href="#">
                    <HospitalIcon /> Hospitais
                </Link>
            </motion.div>
            <motion.div variants={variants}>
                <Link href="#">
                    <BandaidsIcon /> Pronto-socorro
                </Link>
            </motion.div>
            <motion.div variants={variants}>
                <Link href="#">
                    <SyringeIcon /> Vacinação
                </Link>
            </motion.div>
            <motion.div variants={variants}>
                <Link href="#">
                    <FirstAidIcon /> UBS
                </Link>
            </motion.div>
        </motion.div>
    )
}

const searchTagsContainer = css({
    display: 'flex',
    gap: '.5rem',
    flexWrap: 'wrap',
    justifyContent: { base: 'center', md: 'flex-start' },

    '& a': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.25rem',
        boxShadow: 'xs',
        borderRadius: 'full',
        backgroundColor: 'white',
        padding: '.75rem 1rem',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        fontSize: '0.875rem',
        fontWeight: 450,
        color: 'primary',
        lineHeight: '0.875rem',
        transition: 'all cubic-bezier(0,1.5,1,1.5) 150ms',

        _hover: {
            backgroundColor: 'background',
            scale: '1.05',
        },
    },
})
