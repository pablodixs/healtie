import Link from 'next/link'
import { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cva } from '../../../styled-system/css'

interface NavbarLinkProps {
    children: ReactNode
    href: string
}

export function NavbarLink({ children, href }: NavbarLinkProps) {
    return (
        <div>
            <Link className={navbarLink()} href={href}>
                {children}
            </Link>
        </div>
    )
}

const navbarLink = cva({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem',
        borderRadius: 'full',
        lineHeight: 1,
        fontWeight: 480,
        fontSize: '0.875rem',
        color: 'primary',
        width: '100%',
        transition: 'all ease-in-out 0.2s',

        '& svg': {
            fontSize: '1.25rem',
        },

        _hover: {
            color: 'tint',
        },
    },
})
