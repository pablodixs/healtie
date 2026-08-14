import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE = 'healtie_admin_session'
export const ADMIN_SESSION_SECONDS = 30 * 60
export function backendUrl(path: string) {
    const base =
        process.env.HEALTIE_API_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        process.env.NEXT_PUBLIC_HEALTIE_API_URL
    if (!base) throw new Error('HEALTIE_API_URL is not configured')
    return `${base.replace(/\/$/, '')}${path}`
}
export function isSameOrigin(request: NextRequest) {
    const origin = request.headers.get('origin')
    if (!origin) return false
    const host =
        request.headers.get('x-forwarded-host') ?? request.headers.get('host')
    const protocol =
        request.headers.get('x-forwarded-proto') ??
        request.nextUrl.protocol.replace(':', '')
    return origin === `${protocol}://${host}`
}
export function safeNext(value: string | null) {
    return value?.startsWith('/') && !value.startsWith('//')
        ? value
        : '/datasus/obter-regiao'
}
