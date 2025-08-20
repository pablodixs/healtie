import { css } from '../../../styled-system/css'
import { motion, AnimatePresence } from 'motion/react'

import Link from 'next/link'
import {
    HospitalIcon,
    HouseIcon,
    MapTrifoldIcon,
    PathIcon,
} from '@phosphor-icons/react/dist/ssr'

interface MenuListProps {
    isNavCollapsed: boolean
}

export function MenuList({ isNavCollapsed }: MenuListProps) {
    return (
        <div className={menuListContainer}>
            <ul>
                <li className={menuLinkItemContainer}>
                    <Link href="/">
                        <HouseIcon weight={'bold'} />
                        <AnimatePresence>
                            {!isNavCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10, width: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        width: 'auto',
                                    }}
                                    exit={{ opacity: 0, x: -10, width: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1],
                                        width: { duration: 0.2 },
                                    }}
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Página Inicial
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </li>
                <li className={menuLinkItemContainer}>
                    <Link href="/mapa">
                        <MapTrifoldIcon weight={'bold'} />
                        <AnimatePresence>
                            {!isNavCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10, width: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        width: 'auto',
                                    }}
                                    exit={{ opacity: 0, x: -10, width: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1],
                                        width: { duration: 0.2 },
                                    }}
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Mapa
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </li>
                <li className={menuLinkItemContainer}>
                    <Link href="/estabelecimentos">
                        <HospitalIcon weight={'bold'} />
                        <AnimatePresence>
                            {!isNavCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10, width: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        width: 'auto',
                                    }}
                                    exit={{ opacity: 0, x: -10, width: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1],
                                        width: { duration: 0.2 },
                                    }}
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Estabelecimentos
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </li>
                <li className={menuLinkItemContainer}>
                    <Link href="/onde-ir">
                        <PathIcon weight={'bold'} />
                        <AnimatePresence>
                            {!isNavCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10, width: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        width: 'auto',
                                    }}
                                    exit={{ opacity: 0, x: -10, width: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1],
                                        width: { duration: 0.2 },
                                    }}
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Onde ir?
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

const menuListContainer = css({
    margin: '2rem 0',
    color: 'primary',

    '& ul': {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
})

const menuLinkItemContainer = css({
    '& a': {
        padding: '.25rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '500',

        '& svg': {
            fontSize: '1.25rem',
        },
    },
})
