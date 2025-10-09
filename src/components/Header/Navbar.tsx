'use client'

import { memo } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import { css } from '../../../styled-system/css'

import { NavbarLink } from '../Navbar/NavbarLink'
import { NAV_LINKS } from './navLinks'

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
    filter: 'blur(max(0px, 2px))',
}
const FINAL_ANIMATION_PROPERTIES = {
    width: '6ch',
    opacity: 1,
    filter: 'blur(max(0px, 0px))',
}
const EXIT_ANIMATION_PROPERTIES = {
    width: 0,
    opacity: 0,
    marginLeft: 0,
    filter: 'blur(max(0px, 2px))',
}

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
                    <NavbarLink key={href} href={href} aria-label={label}>
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
    display: {
        md: 'flex',
        base: 'none',
    },
    gap: '1.125rem',
    flex: 1,
    justifyContent: 'center',
    textWrap: 'nowrap',
})

export default memo(Navbar)
