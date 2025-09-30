'use client'

import { memo } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import {
    CompassIcon,
    HouseIcon,
    MagnifyingGlassIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react'

import { css } from '../../../styled-system/css'

import { NavbarLink } from '../Navbar/NavbarLink'

// Animations
const SPRING = {
    duration: 0.5,
    type: 'spring' as const,
    stiffness: 110,
    damping: 12,
}
const INITIAL_ANIMATION_PROPERTIES = {
    width: 0,
    marginLeft: '.5rem',
    opacity: 0,
    filter: 'blur(2px)',
}
const FINAL_ANIMATION_PROPERTIES = {
    width: '6ch',
    opacity: 1,
    filter: 'blur(0px)',
}
const EXIT_ANIMATION_PROPERTIES = {
    width: 0,
    opacity: 0,
    marginLeft: 0,
    filter: 'blur(2px)',
}

const NAV_LINKS = [
    { href: '/', label: 'Início', Icon: HouseIcon, key: 'home' },
    { href: '/mapa', label: 'Mapa', Icon: MapTrifoldIcon, key: 'map' },
    { href: '/onde-ir', label: 'Onde ir', Icon: CompassIcon, key: 'where' },
    {
        href: '/buscar',
        label: 'Buscar',
        Icon: MagnifyingGlassIcon,
        key: 'search',
    },
]

interface NavbarProps {
    isCompacted: boolean
}

function Navbar({ isCompacted }: NavbarProps) {
    const pathname = usePathname()

    return (
        <nav className={navStyles}>
            {NAV_LINKS.map(({ href, label, Icon }) => {
                const isActive = pathname === href
                return (
                    <NavbarLink key={href} href={href}>
                        <Icon weight={isActive ? 'fill' : 'regular'} />{' '}
                        <AnimatePresence mode="wait">
                            {!isCompacted && (
                                <motion.span
                                    transition={SPRING}
                                    initial={INITIAL_ANIMATION_PROPERTIES}
                                    animate={FINAL_ANIMATION_PROPERTIES}
                                    exit={EXIT_ANIMATION_PROPERTIES}
                                >
                                    {label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </NavbarLink>
                )
            })}
        </nav>
    )
}

const navStyles = css({
    display: 'flex',
    gap: '1.125rem',
    flex: 1,
    justifyContent: 'center',
    textWrap: 'nowrap',
})

export default memo(Navbar)
