'use client'

import {
    MagnifyingGlassIcon,
    MapTrifoldIcon,
    CompassIcon,
    HouseIcon,
} from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../styled-system/css'

import { NavbarLink } from './NavbarLink'

export function MobileNav() {
    return (
        <div className={mobileNavContainer}>
            <NavbarLink href="/">
                <HouseIcon /> Início
            </NavbarLink>
            <NavbarLink href="/mapa">
                <MapTrifoldIcon /> Mapa
            </NavbarLink>
            <NavbarLink href="/onde-ir">
                <CompassIcon /> Onde Ir
            </NavbarLink>
            <NavbarLink href="/buscar">
                <MagnifyingGlassIcon /> Buscar
            </NavbarLink>
        </div>
    )
}

const mobileNavContainer = css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: 'auto',
    paddingX: '1rem',
    bgColor: 'white',
    width: '100%',
    zIndex: 1000,
    borderTop: '1px solid',
    borderColor: 'neutral.200',
    justifyContent: 'space-between',
    alignItems: 'center',

    display: {
        md: 'none',
        base: 'flex',
    },
})
