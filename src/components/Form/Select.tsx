import { SelectHTMLAttributes } from 'react'
import { selectStyles } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ ...props }: SelectProps) {
    return <select {...props} className={selectStyles} />
}
