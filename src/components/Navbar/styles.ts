import { css } from '../../../styled-system/css'

export const navbarContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '.25rem',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    maxWidth: '1280px',
    margin: '0 auto',
    backgroundColor: 'white',
    zIndex: 1000,
    padding: {
        lg: '1rem 0',
        base: '.5rem',
    },

    '& h1': {
        fontSize: '1.5rem',
        fontWeight: 600,
    },

    '& .logo-search': {
        justifyContent: { md: 'flex-start', base: 'space-between' },
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
