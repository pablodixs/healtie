import { cva } from '../../../styled-system/css'

export const headerContainer = cva({
    base: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',

        '& div': {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },

        '& .logo, .auth': {
            width: '33.33%',
        },

        '& .auth': {
            display: 'flex',
            justifyContent: 'flex-end',
        },
    },
    variants: {
        isCompacted: {
            true: {
                // height: 'headerExpanded',
                // padding: '.5rem 1rem',
            },
            false: {
                // padding: '1rem',
                // height: 'header',
            },
        },
    },
})
