import { HTMLAttributes, ReactNode } from 'react'
import { buttonStyles } from './styles'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?:
        | 'primary'
        | 'secondary'
        | 'subtle'
        | 'text'
        | 'ghost'
        | 'textSubtle'
    size?: 'small' | 'medium' | 'large' | 'larger'
    iconButton?: boolean
    fullWidth?: boolean
}

export function Button({
    children,
    variant = 'primary',
    size,
    iconButton = false,
    fullWidth = false,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonStyles({ variant, size, iconButton, fullWidth })}
            {...props}
        >
            {children}
        </button>
    )
}
