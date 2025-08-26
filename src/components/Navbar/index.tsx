'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'motion/react'

import { css, cva } from '../../../styled-system/css'
import { NavbarLink } from './NavbarLink'
import {
    HospitalIcon,
    HouseSimpleIcon,
    MapTrifoldIcon,
    PathIcon,
    QuestionIcon,
} from '@phosphor-icons/react/dist/ssr'

import { ListIcon } from '@phosphor-icons/react'
import { Button } from '../Button'
import { useScroll } from '@/hooks/useScroll'

// Configurações de spring para diferentes tipos de animação
const springConfig = {
    gentle: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
        mass: 0.8,
    },
    bouncy: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 200,
        mass: 0.6,
    },
    smooth: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 120,
        mass: 1,
    },
}

// Variantes para o botão collapse
const collapseButtonVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        transition: springConfig.bouncy,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: springConfig.bouncy,
    },
}

// Variantes para a navegação
const navigationVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
        transition: springConfig.gentle,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring' as const,
            damping: 25,
            stiffness: 120,
            mass: 1,
            staggerChildren: 0.05,
            delayChildren: 0.025,
        },
    },
}

// Variantes para os itens de navegação
const navItemVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        transition: springConfig.gentle,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: springConfig.bouncy,
    },
}

export function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(false)
    const [isInitialMount, setIsInitialMount] = useState<boolean>(true)
    const { direction } = useScroll()

    useEffect(() => {
        // Marca que o componente foi montado após um pequeno delay
        const timer = setTimeout(() => {
            setIsInitialMount(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (direction === 'down') {
            setIsNavCollapsed(true)
        } else if (direction === 'up') {
            setIsNavCollapsed(false)
        }
    }, [direction])

    return (
        <motion.div
            className={navbarContainer()}
            initial={{
                opacity: 0,
                y: -20,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 200,
                mass: 0.8,
                delay: isInitialMount ? 0.1 : 0,
            }}
            layout
            whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                transition: {
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                },
            }}
            style={{
                transformOrigin: 'center',
            }}
        >
            <AnimatePresence mode="wait">
                {isNavCollapsed && (
                    <motion.div
                        key="collapse-button"
                        variants={collapseButtonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover={{
                            scale: 1.1,
                            transition: {
                                type: 'spring',
                                damping: 10,
                                stiffness: 400,
                            },
                        }}
                        whileTap={{
                            scale: 0.95,
                            transition: {
                                type: 'spring',
                                damping: 15,
                                stiffness: 600,
                            },
                        }}
                    >
                        <Button
                            variant="text"
                            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                        >
                            <ListIcon />
                        </Button>
                    </motion.div>
                )}
                {!isNavCollapsed && (
                    <motion.nav
                        key="navigation"
                        variants={navigationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={navbarItemsListContainer}
                    >
                        <motion.div variants={navItemVariants}>
                            <NavbarLink href="/">
                                <HouseSimpleIcon /> Página Inicial
                            </NavbarLink>
                        </motion.div>
                        <motion.div variants={navItemVariants}>
                            <NavbarLink href="/mapa">
                                <MapTrifoldIcon /> Mapa
                            </NavbarLink>
                        </motion.div>
                        <motion.div variants={navItemVariants}>
                            <NavbarLink href="/estabelecimentos">
                                <HospitalIcon /> Estabelecimentos
                            </NavbarLink>
                        </motion.div>
                        <motion.div variants={navItemVariants}>
                            <NavbarLink href="/onde-ir">
                                <PathIcon /> Onde ir?
                            </NavbarLink>
                        </motion.div>
                        <motion.div variants={navItemVariants}>
                            <NavbarLink href="/ajuda">
                                <QuestionIcon /> Ajuda
                            </NavbarLink>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const navbarContainer = cva({
    base: {
        padding: '.5rem',
        width: 'fit-content',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'background',
        borderRadius: 'full',
    },
})

const navbarItemsListContainer = css({
    display: 'flex',
    gap: '1rem',
})
