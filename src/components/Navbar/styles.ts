import { css } from '../../../styled-system/css'

export const navbarContainer = css({
    position: 'relative',

    '& .sidebar': {
        marginTop: 'calc(2rem + 3.375rem)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '12.5rem',
        paddingLeft: '.25rem',
        height: 'calc(100dvh - 4.625rem)',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
    },
})
