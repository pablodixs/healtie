import { css } from '../../../styled-system/css'

export const headerContainer = css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1rem',
    height: 'header',

    '& div': {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },

    '& .logo': {
        width: '10.5rem',
    },
})
