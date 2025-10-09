'use client'

import { usePathname } from 'next/navigation'

import { css } from '../../../styled-system/css'

import { NavbarLink } from '../Navbar/NavbarLink'
import { NAV_LINKS } from './navLinks'

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className={mobileNavContainer}>
            {NAV_LINKS.map(({ href, label, Icon }) => {
                const isActive = pathname === href
                return (
                    <NavbarLink key={href} href={href} aria-label={label}>
                        <Icon weight={isActive ? 'fill' : 'regular'} />{' '}
                        <span>{label}</span>
                    </NavbarLink>
                )
            })}
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
