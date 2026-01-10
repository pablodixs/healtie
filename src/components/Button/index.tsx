import { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonStyles } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?:
        | 'primary'
        | 'secondary'
        | 'subtle'
        | 'text'
        | 'ghost'
        | 'textSubtle'
        | 'bordered'
        | 'danger'
    size?: 'small' | 'medium' | 'large' | 'larger'
    iconButton?: boolean
    fullWidth?: boolean
    align?: 'left' | 'center' | 'right'
}

export function Button({
    children,
    variant = 'primary',
    size,
    iconButton = false,
    fullWidth = false,
    align,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonStyles({
                variant,
                size,
                iconButton,
                fullWidth,
                align,
            })}
            {...props}
        >
            {children}
        </button>
    )
}
