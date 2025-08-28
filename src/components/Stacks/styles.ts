import { cva } from '../../../styled-system/css'

export const stackStyles = cva({
    base: {
        width: '100%',
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
        between: {
            true: {
                justifyContent: 'space-between',
            },
        },
    },
})
