'use client'

import { motion, stagger } from 'motion/react'
// import {
//     FaceMaskIcon,
//     SyringeIcon,
//     TrendUpIcon,
//     VirusIcon,
// } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { Link } from '@/components/Link'
import { SyringeIcon } from '@phosphor-icons/react/dist/ssr'

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

// const variants = {
//     visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
//     hidden: { opacity: 0, scale: 0.8, filter: 'blur(5px)' },
// }

export function SearchTags() {
    return (
        <motion.div
            className={searchTagsContainer}
            initial="hidden"
            animate="visible"
            variants={list}
        >
            {/* <motion.div variants={variants}>
                <span className={label}>
                    <TrendUpIcon /> Em alta
                </span>
            </motion.div>
            <motion.div variants={variants}>
                <Link href="#">
                    <VirusIcon /> Dengue
                </Link>
            </motion.div>
            <motion.div variants={variants}>
                <Link href="#">
                    <FaceMaskIcon /> COVID-19
                </Link>
            </motion.div>
            <motion.div variants={variants}>
                <Link href="#">
                    <SyringeIcon /> Vacinação
                </Link>
            </motion.div> */}
            <Link variant="text" href={'/campanhas/N202510001'}>
                <SyringeIcon size={20} /> Começou a Campanha Nacional de
                Vacinação para Proteção de Crianças e Adolescentes
            </Link>
        </motion.div>
    )
}

const searchTagsContainer = css({
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
    alignItems: 'end',
    justifyContent: { base: 'center', md: 'flex-start' },

    // '& a': {
    //     display: 'inline-flex',
    //     alignItems: 'center',
    //     gap: '.5rem',
    //     fontSize: '0.875rem',
    //     fontWeight: 450,
    //     color: 'tint',
    //     lineHeight: '0.875rem',
    //     transition: 'all cubic-bezier(0,1.5,1,1.5) 150ms',

    //     '& svg': {
    //         fontSize: '1.25rem',
    //     },

    //     _hover: {
    //         textDecoration: 'underline',
    //     },
    // },
})

// const label = css({
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '.5rem',
//     fontSize: '0.875rem',
//     fontWeight: 450,
//     color: 'gray.400',
//     lineHeight: '0.875rem',

//     '& svg': {
//         fontSize: '1.25rem',
//     },
// })
