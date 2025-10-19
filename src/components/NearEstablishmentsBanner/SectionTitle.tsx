import { FunctionComponent } from 'react'
import { css } from '../../../styled-system/css'
import { IconWeight } from '@phosphor-icons/react'

interface SectionTitleProps {
    title: string
    Icon: FunctionComponent<{ weight?: IconWeight | undefined }>
}

export function SectionTitle({ title, Icon }: SectionTitleProps) {
    return (
        <div
            className={css({
                fontSize: '1.125rem',
                fontWeight: 550,
                color: 'primary',
                letterSpacing: '-0.015em',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
                gap: '0.5rem',

                '& svg': {
                    color: 'neutral.400',
                    fontSize: '1.25rem',
                },
            })}
        >
            <Icon weight="bold" />
            <h2>{title}</h2>
        </div>
    )
}
