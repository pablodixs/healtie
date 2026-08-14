import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, backendUrl } from '@/lib/admin-session'

export default async function ProtectedDataSusLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value
    if (!token) redirect('/admin/login?next=/datasus/obter-regiao')
    const response = await fetch(backendUrl('/auth/me'), {
        headers: { authorization: `Bearer ${token}` },
        cache: 'no-store',
    }).catch(() => null)
    if (!response?.ok) redirect('/admin/login?next=/datasus/obter-regiao')
    return children
}
