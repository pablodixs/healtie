export const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_HEALTIE_API_URL

export const API_ENDPOINTS = {
    establishment: {
        search: `${API_URL}/establishment/search`,
        suggestions: `${API_URL}/establishment/search/suggestions`,
    },
} as const
