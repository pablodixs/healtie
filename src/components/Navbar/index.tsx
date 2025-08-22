'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { css, cva } from '../../../styled-system/css'
import { NavbarLink } from './NavbarLink'
import {
    HospitalIcon,
    HouseSimpleIcon,
    MapTrifoldIcon,
    PathIcon,
    QuestionIcon,
} from '@phosphor-icons/react/dist/ssr'

interface NavbarProps {
    isCollapsed?: boolean
}

export function Navbar({ isCollapsed = false }: NavbarProps) {
    const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(isCollapsed)

    return (
        <div className={navbarContainer()}>
            <div></div>
            <nav className={navbarItemsListContainer}>
                <NavbarLink>
                    <HouseSimpleIcon /> Página Inicial
                </NavbarLink>
                <NavbarLink>
                    <MapTrifoldIcon /> Mapa
                </NavbarLink>
                <NavbarLink>
                    <HospitalIcon /> Estabelecimentos
                </NavbarLink>
                <NavbarLink>
                    <PathIcon /> Onde ir?
                </NavbarLink>
            </nav>
            <div>
                <NavbarLink>
                    <QuestionIcon /> Ajuda
                </NavbarLink>
            </div>
        </div>
    )
}

const navbarContainer = cva({
    base: {
        padding: '.5rem',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
})

const navbarItemsListContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
})
