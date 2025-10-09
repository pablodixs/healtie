'use client'

import {
    HospitalIcon,
    HouseSimpleIcon,
    MagnifyingGlassIcon,
    MapTrifoldIcon,
    PathIcon,
} from '@phosphor-icons/react'

import { css } from '../../../styled-system/css'
import { Button } from '../Button'
import { NavbarLink } from './NavbarLink'
import { CompassIcon } from '@phosphor-icons/react/dist/ssr'

export function MobileNav() {
    return (
        <div className={mobileNavContainer}>
            <NavbarLink href="/">
                <HouseSimpleIcon /> Início
            </NavbarLink>
            <NavbarLink href="/">
                <MapTrifoldIcon /> Mapa
            </NavbarLink>
            <NavbarLink href="/onde-ir">
                <CompassIcon /> Onde Ir
            </NavbarLink>
            <NavbarLink href="/onde-ir">
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
    padding: '1rem',
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
