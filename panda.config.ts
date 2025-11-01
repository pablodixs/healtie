import { defineConfig } from '@pandacss/dev'

const HEADER_SIZE = '4.625rem'
const EXPANDED_HEADER_SIZE = '6.25rem'

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

    // Files to exclude
    exclude: [],

    // Conditions
    conditions: {
        extend: {
            selected: '&[data-selected="true"]',
        },
    },

    // Useful for theme customization
    theme: {
        extend: {
            keyframes: {
                gradientMove: {
                    '0%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                    },
                },
            },
            tokens: {
                fonts: {
                    text: { value: 'Sans Text, sans-serif' },
                    display: { value: 'Sans Display, sans-serif' },
                },
                colors: {
                    background: { value: '#f6f7f9' },
                    primary: { value: '#343433' },
                    cream: { value: '#f6f4ef' },
                    tint: { value: '#018DFF' },
                },
                sizes: {
                    header: { value: HEADER_SIZE },
                },
                spacing: {
                    header: { value: HEADER_SIZE },
                    expandedHeader: { value: EXPANDED_HEADER_SIZE },
                },
            },
        },
    },

    // The output directory for your css system
    outdir: 'styled-system',
})
