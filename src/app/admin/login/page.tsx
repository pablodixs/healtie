import { safeNext } from '@/lib/admin-session'
import { LoginForm } from './login-form'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const params = await searchParams
    return <LoginForm nextPath={safeNext(params.next ?? null)} />
}
