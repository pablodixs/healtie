import { cva } from '../../../styled-system/css'

export const landingIntroStyles = cva({
    base: {
        padding: '3rem',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',

        '& img': {
            maxWidth: '100%',
            borderRadius: 'lg',
        },

        '& p': {
            maxWidth: '70%',
        },
    },
})
