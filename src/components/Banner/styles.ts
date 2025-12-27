import { cva } from '../../../styled-system/css'

export const bannerStyles = cva({
    base: {
        minWidth: '100%',
        padding: '1rem 1.5rem',
        bgColor: 'neutral.100',
        borderRadius: 'lg',
        color: 'primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& h2': {
            fontWeight: 500,
            fontSize: '0.9375rem',
        },

        '& p': {
            fontSize: '0.875rem',
            color: 'rgba(0, 0, 0, 0.6)',

            '& a': {
                color: 'tint',
                textDecoration: 'underline',
            },
        },

        '& svg': {
            fontSize: '1.5rem',
        },

        '& > div': {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
    },
    variants: {
        variant: {
            info: {},
            success: {
                bgColor: 'green.100',
                color: 'green.700',
            },
            error: {
                bgColor: 'red.100',
                color: 'red.700',
            },
        },
        size: {
            sm: {
                padding: '.5rem .75rem',
                fontSize: '0.875rem',

                '& p': {
                    fontSize: '0.75rem',
                },
            },
            md: {},
        },
    },
})
