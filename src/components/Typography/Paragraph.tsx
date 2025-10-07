import { HTMLAttributes, ReactNode } from 'react'

import { cva } from '../../../styled-system/css'

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode
    subtle?: boolean
    centered?: boolean
    size?: 'subheadline' | 'body' | 'caption'
    bolder?: boolean
    compact?: boolean
    marginCompact?: boolean
}

export function Paragraph({
    children,
    subtle,
    centered,
    size = 'body',
    bolder,
    compact,
    marginCompact,
    ...props
}: ParagraphProps) {
    return (
        <p
            className={paragraphStyles({
                subtle,
                centered,
                size,
                bolder,
                compact,
                marginCompact,
            })}
            {...props}
        >
            {children}
        </p>
    )
}

const paragraphStyles = cva({
    base: {
        fontSize: '1rem',
        color: 'primary',
        lineHeight: 'normal',
        margin: '.75rem 0',

        '& b': {
            fontWeight: 500,
        },
    },
    variants: {
        subtle: {
            true: {
                color: 'gray.500',
            },
        },
        centered: {
            true: {
                textAlign: 'center',
            },
        },
        bolder: {
            true: {
                fontWeight: 500,
            },
        },
        size: {
            subheadline: {
                fontSize: '1.125rem',
                lineHeight: 'short',
                letterSpacing: '-0.01em',
            },
            body: {
                fontSize: '1rem',
                lineHeight: 'normal',
            },
            caption: {
                fontSize: '0.875rem',
                lineHeight: 'normal',
            },
        },
        compact: {
            true: {
                maxWidth: '70ch',
            },
        },
        marginCompact: {
            true: {
                margin: '.25rem 0',
            },
        },
    },
})
