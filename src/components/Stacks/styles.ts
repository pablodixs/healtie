import { cva } from '../../../styled-system/css'

export const stackStyles = cva({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    variants: {
        direction: {
            row: {
                flexDirection: 'row',
            },
            column: {
                flexDirection: 'column',
            },
        },
        center: {
            true: {
                justifyContent: 'center',
            },
        },
        padding: {
            true: {
                padding: '1rem',
            },
        },
    },
})
