'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { cva } from '../../../styled-system/css'

import logo from './../../assets/images/logotype.svg'
import icon from '../../assets/images/icon.svg'

import { MenuList } from './MenuList'
import {
    ArrowLineLeftIcon,
    ArrowLineRightIcon,
} from '@phosphor-icons/react/dist/ssr'

interface NavbarProps {
    isCollapsed?: boolean
}

export function Navbar({ isCollapsed = false }: NavbarProps) {
    const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(isCollapsed)

    return (
        <motion.nav
            className={navbarContainer({ isCollapsed: isNavCollapsed })}
            animate={{
                width: isNavCollapsed ? 80 : 240,
                alignItems: isNavCollapsed ? 'center' : 'flex-start',
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
            <AnimatePresence mode="wait">
                {isNavCollapsed ? (
                    <motion.div
                        key="icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image src={icon} alt="Healtie Logo" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image src={logo} alt="Healtie Logo" />
                    </motion.div>
                )}
            </AnimatePresence>
            <MenuList isNavCollapsed={isNavCollapsed} />
            <div>
                <button
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                    }}
                    onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                >
                    {isNavCollapsed ? (
                        <ArrowLineRightIcon size={20} />
                    ) : (
                        <>
                            <ArrowLineLeftIcon size={20} />
                            <span>Recolher</span>
                        </>
                    )}
                </button>
            </div>
        </motion.nav>
    )
}

const navbarContainer = cva({
    base: {
        padding: '1rem',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Removemos as transições CSS já que o motion.div controla as animações
    },
    variants: {
        isCollapsed: {
            true: {
                // width e alignItems são controlados pelo motion.div
            },
            false: {
                // width é controlado pelo motion.div
            },
        },
    },
})
