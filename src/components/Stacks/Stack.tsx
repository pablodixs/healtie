import { ReactNode } from 'react'
import { stackStyles } from './styles'

interface StackProps {
    children: ReactNode
    direction?: 'row' | 'column'
    center?: boolean
    padding?: boolean
}

export function Stack({
    children,
    direction = 'column',
    center = false,
    padding = false,
}: StackProps) {
    return (
        <div className={stackStyles({ direction, center, padding })}>
            {children}
        </div>
    )
}
