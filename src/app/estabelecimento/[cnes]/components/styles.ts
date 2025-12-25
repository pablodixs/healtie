import { css } from '../../../../../styled-system/css'

export const mainContainer = css({
    minH: 'calc(100dvh - 4rem)',
    paddingX: {
        base: '1rem',
        md: '0',
    },
})

export const contentContainer = css({
    display: {
        base: 'block',
        md: 'grid',
    },
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
})
