import { ReactNode } from 'react'
import { stackStyles } from './styles'

interface StackProps {
    children: ReactNode
    direction?: 'row' | 'column'
    center?: boolean
    padding?: boolean
    between?: boolean
}

export function Stack({
    children,
    direction = 'column',
    center = false,
    padding = false,
    between = false,
}: StackProps) {
    return (
        <div className={stackStyles({ direction, center, padding, between })}>
            {children}
        </div>
    )
}
