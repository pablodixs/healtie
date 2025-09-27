import Link from 'next/link'
import { HTMLAttributes, ReactNode } from 'react'
import { cva } from '../../../styled-system/css'

interface NavbarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    children: ReactNode
    href: string
}

export function NavbarLink({ children, href, ...props }: NavbarLinkProps) {
    return (
        <div>
            <Link className={navbarLink()} href={href} {...props}>
                {children}
            </Link>
        </div>
    )
}

const navbarLink = cva({
    base: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'md',
        lineHeight: 1,
        fontWeight: 500,
        fontSize: '0.875rem',
        color: '#202020',
        width: '100%',
        transition: 'all ease-in-out 0.2s',
        padding: '.5rem .75rem',

        '& svg': {
            fontSize: '1.375rem',
        },

        _hover: {
            color: 'tint',
        },
    },
})
