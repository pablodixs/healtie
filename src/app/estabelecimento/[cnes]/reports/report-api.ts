import axios from 'axios'
import { API_URL } from '@/lib/apiConfig'
import type { ReportType } from './report-types'

export type CreateReportPayload = {
    type: ReportType
    observedAt: string
    value?: number
    occurrence?: boolean
    reporterToken: string
}

const REPORTER_TOKEN_KEY = 'healtie_reporter_token'

function getReporterToken() {
    const stored = window.localStorage.getItem(REPORTER_TOKEN_KEY)
    if (stored) return stored

    const token = crypto.randomUUID()
    window.localStorage.setItem(REPORTER_TOKEN_KEY, token)
    return token
}

export async function createEstablishmentReport(
    cnes: number,
    payload: Omit<CreateReportPayload, 'reporterToken'>
) {
    return axios.post(`${API_URL}/establishment/${cnes}/reports`, {
        ...payload,
        reporterToken: getReporterToken(),
    })
}

export function getReportErrorMessage(error: unknown) {
    if (!axios.isAxiosError(error)) {
        return 'Não foi possível enviar. Tente novamente.'
    }

    if (!error.response) {
        return 'Não foi possível enviar. Verifique sua conexão e tente novamente.'
    }

    switch (error.response.status) {
        case 409:
            return 'Você já enviou este relato recentemente.'
        case 429:
            return 'Muitos relatos foram enviados. Aguarde um pouco e tente novamente.'
        default:
            return (
                error.response.data?.message ??
                'Não foi possível enviar. Tente novamente.'
            )
    }
}
