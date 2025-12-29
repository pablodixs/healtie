import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    color?: 'default' | 'subtle'
}

export function Spinner({ size = 'md', color = 'default' }: SpinnerProps) {
    const sizes = {
        sm: 16,
        md: 24,
        lg: 32,
    }

    return (
        <CircleNotchIcon
            className={css({
                animation: 'spin',
                willChange: 'transform',
                color: color === 'subtle' ? 'neutral.400' : 'tint',
            })}
            weight="bold"
            size={sizes[size]}
        />
    )
}
