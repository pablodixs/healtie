import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, backendUrl } from '@/lib/admin-session'
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (!token)
        return NextResponse.json(
            { message: 'Sessão expirada.' },
            { status: 401 }
        )
    const { id } = await context.params
    const upstream = await fetch(
        backendUrl(`/datasus/jobs/${encodeURIComponent(id)}`),
        { headers: { authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    return NextResponse.json(await upstream.json().catch(() => ({})), {
        status: upstream.status,
    })
}
