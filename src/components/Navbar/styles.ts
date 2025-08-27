import { css } from '../../../styled-system/css'

export const navbarContainer = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '.25rem',
    position: 'fixed',
    top: 0,
    bgColor: 'white',
    padding: '1rem',

    '& h1': {
        fontSize: '1.5rem',
        fontWeight: 600,
    },

    '& nav': {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '0 auto',
    },

    '& .logo-search': {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },

    '& .vr': {
        borderLeft: '1px solid',
        borderLeftColor: 'rgba(0, 0, 0, 0.1)',
        height: '2rem',
        margin: '0 .25rem',
    },
})
