import { HTMLAttributes, ReactNode } from 'react'
import { cva } from '../../../styled-system/css'

interface SubheadingProps extends HTMLAttributes<HTMLHeadingElement> {
    centered?: boolean
    children: ReactNode
    size?: 'lg' | 'md' | 'sm' | 'xl'
}

export function Subheading({
    children,
    centered,
    size = 'md',
    ...props
}: SubheadingProps) {
    return (
        <h2 className={subHeadingStyles({ centered, size })} {...props}>
            {children}
        </h2>
    )
}

const subHeadingStyles = cva({
    base: {
        position: 'relative',
        fontSize: {
            md: '1.875rem',
            base: '1.5rem',
        },
        color: '#151515',
        fontWeight: 570,
        lineHeight: 'tight',
        letterSpacing: 'tight',
        textWrap: 'balance',
    },
    variants: {
        centered: {
            true: {
                textAlign: 'center',
            },
        },
        size: {
            sm: {},
            md: {},
            lg: {
                fontSize: {
                    base: '2rem',
                    md: '2.625rem',
                },
                lineHeight: '120%',
                letterSpacing: '-0.075rem',
            },
            xl: {
                fontSize: {
                    base: '2.5rem',
                    md: '3rem',
                    lineHeight: '110%',
                },
            },
        },
    },
})
