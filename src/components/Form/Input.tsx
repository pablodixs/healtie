import { InputHTMLAttributes } from 'react'
import { inputStyles } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean
}

export function Input({ fullWidth, ...props }: InputProps) {
    return <input {...props} className={inputStyles({ fullWidth })} />
}
