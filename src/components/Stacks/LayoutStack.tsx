import { HTMLAttributes, ReactNode } from 'react'
import { cva } from '../../../styled-system/css'

interface LayoutStackProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    compact?: boolean
}

export function LayoutStack({ children, compact, ...props }: LayoutStackProps) {
    return (
        <div className={mainContainer({ compact })} {...props}>
            {children}
        </div>
    )
}

const mainContainer = cva({
    base: {
        maxWidth: '1280px',
        margin: '0 auto',
    },
    variants: {
        compact: {
            true: {
                maxWidth: '1024px',
            },
        },
    },
})
