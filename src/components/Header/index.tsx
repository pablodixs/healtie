'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { UserCircleIcon } from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../styled-system/css'
import { headerContainer } from './styles'

import { useScroll } from '@/hooks/useScroll'

import Navbar from './Navbar'
import { NavLogo } from './NavLogo'
import { ProgressiveBlur } from '../ProgressiveBlur'
import { NavbarLink } from '../Navbar/NavbarLink'

const HEADER_SIZE = '3rem'
const EXPANDED_HEADER_SIZE = '4rem'
const HEADER_TRANSITION = {
    duration: 0.5,
    type: 'spring' as const,
    stiffness: 110,
    damping: 12,
}
const GRADIENT_BACKGROUNDS = {
    default:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',
    hover: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
}

export function Header() {
    const { scrollY, direction } = useScroll()
    const [isHovered, setIsHovered] = useState(false)
    const [isCompacted, setIsCompacted] = useState(false)

    useEffect(() => {
        setIsCompacted(direction === 'down' && !isHovered)
    }, [isHovered, direction])

    return (
        <AnimatePresence mode="wait">
            <motion.header
                initial={false}
                animate={{
                    height: isCompacted ? HEADER_SIZE : EXPANDED_HEADER_SIZE,
                    padding: '1rem',
                    background: GRADIENT_BACKGROUNDS.default,
                }}
                transition={HEADER_TRANSITION}
                whileHover={{
                    background: GRADIENT_BACKGROUNDS.hover,
                }}
                className={headerContainer({
                    isCompacted,
                })}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <NavLogo scrollY={scrollY} />
                <Navbar isCompacted={isCompacted} />
                <div className="auth">
                    <NavbarLink href="/">
                        Entrar{' '}
                        <UserCircleIcon
                            className={css({ marginLeft: '.5rem' })}
                            size={24}
                        />
                    </NavbarLink>
                </div>
                <ProgressiveBlur />
            </motion.header>
        </AnimatePresence>
    )
}
