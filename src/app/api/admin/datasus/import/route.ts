import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, backendUrl, isSameOrigin } from '@/lib/admin-session'
export async function POST(request: NextRequest) {
    if (!isSameOrigin(request))
        return NextResponse.json(
            { message: 'Origem inválida.' },
            { status: 403 }
        )
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (!token)
        return NextResponse.json(
            { message: 'Sessão expirada.' },
            { status: 401 }
        )
    const upstream = await fetch(backendUrl('/datasus/get-all'), {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify(await request.json()),
        cache: 'no-store',
    })
    const data = await upstream
        .json()
        .catch(() => ({ message: 'Não foi possível iniciar a importação.' }))
    const response = NextResponse.json(data, { status: upstream.status })
    if (upstream.status === 401) response.cookies.delete(ADMIN_COOKIE)
    const retry = upstream.headers.get('retry-after')
    if (retry) response.headers.set('retry-after', retry)
    return response
}
