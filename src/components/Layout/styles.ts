import { css, cva } from '../../../styled-system/css'

export const mainLayoutContainer = css({})

export const mainLayoutContentContainer = cva({
    base: {
        marginTop: 'expandedHeader',
        margin: '0 auto',
        maxWidth: '1280px',
    },
})
