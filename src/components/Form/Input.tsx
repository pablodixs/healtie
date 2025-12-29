import { InputHTMLAttributes } from 'react'
import { inputStyles } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean
    inputSize?: 'md' | 'lg'
}

export function Input({ fullWidth, inputSize = 'md', ...props }: InputProps) {
    return (
        <input
            {...props}
            className={inputStyles({ fullWidth, size: inputSize })}
        />
    )
}
