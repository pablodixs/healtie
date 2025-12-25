import { ReactNode, Suspense } from 'react'
import { css } from '../../../../styled-system/css'
import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense
            fallback={
                <div
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80dvh',
                    })}
                >
                    <CircleNotchIcon
                        className={css({
                            animation: 'spin',
                            color: 'neutral.500',
                        })}
                        weight="bold"
                        size={22}
                    />{' '}
                </div>
            }
        >
            <main>{children}</main>
        </Suspense>
    )
}
