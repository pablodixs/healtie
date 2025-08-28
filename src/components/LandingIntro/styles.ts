import { cva } from '../../../styled-system/css'

export const landingIntroStyles = cva({
    base: {
        padding: {
            md: '3rem',
            base: '1rem',
        },
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        gap: { md: 0, base: '1.25rem' },

        '& img': {
            maxWidth: '100%',
            borderRadius: 'lg',
        },

        '& p': {
            maxWidth: { md: '70%', base: '100%' },
        },
    },
})
