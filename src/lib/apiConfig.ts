export const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

export const API_ENDPOINTS = {
    establishment: {
        search: `${API_URL}/establishment/search`,
        suggestions: `${API_URL}/establishment/search/suggestions`,
        byId: (cnes: string) => `${API_URL}/establishment/${cnes}`,
        services: (cnes: string) => `${API_URL}/establishment/${cnes}/services`,
        indicators: (cnes: string) => `${API_URL}/establishment/${cnes}/indicators`,
        report: (cnes: string) => `${API_URL}/establishment/${cnes}/report`,
        nearby: `${API_URL}/establishment/nearby`,
        all: `${API_URL}/establishment`,
    },
} as const
