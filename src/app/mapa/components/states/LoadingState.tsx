import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { stateContainer } from './styles'
import { css } from '../../../../../styled-system/css'

export function LoadingState() {
    return (
        <div className={stateContainer}>
            <CircleNotchIcon
                className={css({
                    animation: 'spin',
                    color: 'neutral.300',
                    my: '2rem',
                })}
                weight="bold"
                size={32}
            />
        </div>
    )
}
