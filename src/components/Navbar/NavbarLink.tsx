import Link from 'next/link'
import { ReactNode } from 'react'
import { cva } from '../../../styled-system/css'

interface NavbarLinkProps {
    children: ReactNode
    href: string
}

export function NavbarLink({ children, href }: NavbarLinkProps) {
    return (
        <Link className={navbarLink()} href={href}>
            {children}
        </Link>
    )
}

const navbarLink = cva({
    base: {
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem',
        borderRadius: '8px',
        lineHeight: 1,
        fontWeight: 450,
        fontSize: '0.875rem',
        color: 'primary',
        transition: 'all 0.1s ease-in-out',

        '& svg': {
            fontSize: '1.25rem',
        },

        _hover: {
            backgroundColor: 'cream',
        },
    },
})
