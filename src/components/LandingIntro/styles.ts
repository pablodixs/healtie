import { cva } from '../../../styled-system/css'

export const landingIntroStyles = cva({
    base: {
        minHeight: '60dvh',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { md: '1rem', base: '1.25rem' },

        '& img': {
            maxWidth: '100%',
            maxHeight: '400px',
            borderRadius: 'lg',
        },

        '& p': {
            maxWidth: { md: '70%', base: '100%' },
        },
    },
})
