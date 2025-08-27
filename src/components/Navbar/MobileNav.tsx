'use client'

import { useState } from 'react'
import {
    HospitalIcon,
    HouseSimpleIcon,
    ListIcon,
    MagnifyingGlassIcon,
    MapTrifoldIcon,
    PathIcon,
} from '@phosphor-icons/react'

import { css } from '../../../styled-system/css'
import { Button } from '../Button'
import { NavbarItems } from './NavbarItems'
import { NavbarLink } from './NavbarLink'

export function MobileNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={mobileNavContainer}>
            <Button>
                <MagnifyingGlassIcon />
            </Button>
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <ListIcon />
            </Button>
            {isMenuOpen && (
                <>
                    <NavbarLink href="/">
                        <HouseSimpleIcon /> Página Inicial
                    </NavbarLink>
                    <NavbarLink href="/">
                        <MapTrifoldIcon /> Mapa
                    </NavbarLink>
                    <NavbarLink href="/">
                        <HospitalIcon /> Estabelecimentos
                    </NavbarLink>
                    <NavbarLink href="/onde-ir">
                        <PathIcon /> Onde Ir
                    </NavbarLink>
                    <span className="vr" />
                    <NavbarLink href="/">Entrar</NavbarLink>
                    <Button variant="secondary">Criar conta</Button>
                </>
            )}
        </div>
    )
}

const mobileNavContainer = css({
    display: {
        md: 'none',
        base: 'flex',
    },
})
