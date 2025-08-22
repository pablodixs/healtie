'use client'

import { useState } from 'react'

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
                <NavbarLink href="/">
                    <HouseSimpleIcon /> Página Inicial
                </NavbarLink>
                <NavbarLink href="/mapa">
                    <MapTrifoldIcon /> Mapa
                </NavbarLink>
                <NavbarLink href="/estabelecimentos">
                    <HospitalIcon /> Estabelecimentos
                </NavbarLink>
                <NavbarLink href="/onde-ir">
                    <PathIcon /> Onde ir?
                </NavbarLink>
            </nav>
            <div>
                <NavbarLink href="/ajuda">
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
