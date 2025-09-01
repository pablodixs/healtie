import { ComponentProps } from 'react'
import NextLink from 'next/link'
import { cva } from '../../../styled-system/css'

type LinkProps = ComponentProps<typeof NextLink>

export function Link(props: LinkProps) {
    return (
        <NextLink className={linkStyle()} {...props}>
            {props.children}
        </NextLink>
    )
}

const linkStyle = cva({
    base: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: 'full',
        fontWeight: '500',
        lineHeight: 'short',
        transition: 'all 0.2s cubic-bezier(.47,1.64,.41,.8)',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary',
        color: 'white',
        gap: '.75rem',
        padding: '0 1rem',

        '& svg': {
            fontSize: '1.125rem',
        },

        _hover: {
            scale: 1.05,
            backgroundColor: '#202020',
        },
    },
})
