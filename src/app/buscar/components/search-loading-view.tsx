import { Spinner } from '@/components/spinner'
import { css } from '../../../../styled-system/css'

export function SearchLoadingView() {
    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            })}
        >
            <Spinner size="lg" />
        </div>
    )
}
