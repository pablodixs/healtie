import Link from 'next/link'
import { ReactNode } from 'react'
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
        borderRadius: 'md',
        lineHeight: 1,
        fontWeight: 500,
        fontSize: '0.875rem',
        color: '#202020',
        width: '100%',
        transition: 'all ease-in-out 0.2s',
        padding: '.5rem .75rem',

        '& svg': {
            fontSize: '1.25rem',
        },

        _hover: {
            backgroundColor: 'background',
        },
    },
})
