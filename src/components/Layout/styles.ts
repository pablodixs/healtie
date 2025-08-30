import { css, cva } from '../../../styled-system/css'

export const mainLayoutContainer = css({})

export const mainLayoutContentContainer = cva({
    base: {
        marginTop: 'header',
        display: 'grid',
        gridTemplateColumns: '12.5rem 1fr',
    },
})
