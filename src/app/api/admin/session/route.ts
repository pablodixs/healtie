import { NextRequest, NextResponse } from 'next/server'
import {
    ADMIN_COOKIE,
    ADMIN_SESSION_SECONDS,
    backendUrl,
    isSameOrigin,
} from '@/lib/admin-session'

export async function POST(request: NextRequest) {
    if (!isSameOrigin(request))
        return NextResponse.json(
            { message: 'Origem inválida.' },
            { status: 403 }
        )
    const body = await request.json().catch(() => null)
    let upstream: Response
    try {
        upstream = await fetch(backendUrl('/auth/login'), {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
            cache: 'no-store',
        })
    } catch {
        return NextResponse.json(
            { message: 'O serviço de autenticação está indisponível.' },
            { status: 503 }
        )
    }
    if (!upstream.ok) {
        const message =
            upstream.status === 429
                ? 'Muitas tentativas. Aguarde e tente novamente.'
                : upstream.status >= 500
                  ? 'O serviço de autenticação está indisponível.'
                  : 'E-mail ou senha inválidos.'
        return NextResponse.json({ message }, { status: upstream.status })
    }
    const data = await upstream.json()
    const response = NextResponse.json({ authenticated: true })
    response.cookies.set(ADMIN_COOKIE, data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: ADMIN_SESSION_SECONDS,
    })
    return response
}
export async function GET(request: NextRequest) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (!token)
        return NextResponse.json({ authenticated: false }, { status: 401 })
    const upstream = await fetch(backendUrl('/auth/me'), {
        headers: { authorization: `Bearer ${token}` },
        cache: 'no-store',
    })
    if (!upstream.ok) {
        const response = NextResponse.json(
            { authenticated: false },
            { status: 401 }
        )
        response.cookies.delete(ADMIN_COOKIE)
        return response
    }
    return NextResponse.json({
        authenticated: true,
        user: await upstream.json(),
    })
}
export async function DELETE(request: NextRequest) {
    if (!isSameOrigin(request))
        return NextResponse.json(
            { message: 'Origem inválida.' },
            { status: 403 }
        )
    const response = NextResponse.json({ authenticated: false })
    response.cookies.delete(ADMIN_COOKIE)
    return response
}
