import { cva } from '../../../styled-system/css'

export const buttonStyles = cva({
    base: {
        width: 'fit-content',
        cursor: 'pointer',
        border: 'none',
        borderRadius: 'full',
        fontWeight: '500',
        lineHeight: 'short',
        transition: 'all 0.2s ease',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.75rem',
        textWrap: 'nowrap',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        willChange: 'transform, background-color, box-shadow',

        _disabled: {
            cursor: 'not-allowed',
            backgroundColor: 'neutral.200',
            color: 'neutral.700',

            _active: {
                scale: 1,
            },

            _hover: {
                backgroundColor: 'neutral.200',
            },
        },

        padding: {
            lg: '0.625rem 1rem',
            base: '0.75rem 1rem',
        },

        '& svg': {
            fontSize: '1.125rem',
        },

        _active: {
            scale: 0.95,
        },
    },
    variants: {
        variant: {
            primary: {
                backgroundColor: 'tint',
                color: 'white',

                '&:hover': {
                    backgroundColor: 'blue.600',
                },
            },
            secondary: {
                backgroundColor: 'primary',
                color: 'white',

                '&:hover': {
                    backgroundColor: '#151515',
                },
            },
            subtle: {
                backgroundColor: 'cream',
                color: '#151515',
            },
            bordered: {
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease-in-out',

                _hover: {
                    backgroundColor: 'inherit',
                    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.25)',
                },
            },
            text: {
                backgroundColor: 'transparent',
                color: 'primary',
                padding: 0,
                justifyContent: 'flex-start',
                gap: '.25rem',

                _hover: {
                    color: '#202020',
                    scale: 'inherit',
                },
            },
            textSubtle: {
                backgroundColor: 'transparent',
                color: 'gray.500',
                padding: 0,
                justifyContent: 'flex-start',
                gap: '.25rem',

                _hover: {
                    color: '#202020',
                    scale: 'inherit',
                },
            },
            ghost: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                color: 'rgba(0, 0, 0, 0.85)',
            },
        },
        align: {
            left: {
                justifyContent: 'flex-start',
            },
            center: {
                justifyContent: 'center',
            },
            right: {
                justifyContent: 'flex-end',
            },
        },
        size: {
            small: {
                fontSize: '0.75rem',
                padding: '0.5rem 0.75rem',

                '& svg': {
                    fontSize: '1rem',
                },
            },
            medium: {
                padding: {
                    lg: '0.5rem 1rem',
                    base: '0.75rem 1rem',
                },
            },
            large: {
                padding: '.75rem 1.5rem',
                fontSize: '1rem',
            },
            larger: {
                padding: '1rem 1.5rem',
                fontSize: '1.125rem',
            },
        },
        iconButton: {
            true: {
                padding: '.5rem',
                aspectRatio: '1/1',
            },
        },
        fullWidth: {
            true: {
                width: '100%',
                flex: 1,
            },
        },
    },
})
