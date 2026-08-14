'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Heading } from '@/components/Typography'
import { Input } from '@/components/Form/Input'
import { Label } from '@/components/Form/Label'
import { Button } from '@/components/Button'
import { css } from '../../../../styled-system/css'

const credentials = z.object({
    email: z.email('Informe um e-mail válido.'),
    password: z.string().min(1, 'Informe sua senha.'),
})

export function LoginForm({ nextPath }: { nextPath: string }) {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        const form = new FormData(event.currentTarget)
        const parsed = credentials.safeParse({
            email: form.get('email'),
            password: form.get('password'),
        })
        if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? 'Verifique os campos.')
            document.getElementById('email')?.focus()
            return
        }
        setLoading(true)
        try {
            const response = await fetch('/api/admin/session', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(parsed.data),
            })
            if (!response.ok) {
                const data = await response.json().catch(() => null)
                setError(data?.message ?? 'Não foi possível entrar.')
                return
            }
            router.replace(nextPath)
            router.refresh()
        } catch {
            setError('Não foi possível conectar ao servidor.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <main
            className={css({
                minHeight: '70vh',
                display: 'grid',
                placeItems: 'center',
                px: '1rem',
            })}
        >
            <section
                className={css({
                    width: '100%',
                    maxWidth: '28rem',
                    p: { base: '1.5rem', md: '2rem' },
                    borderRadius: '2xl',
                    background: 'white',
                    boxShadow: 'lg',
                })}
                aria-labelledby="login-title"
            >
                <Heading id="login-title">Acesso administrativo</Heading>
                <p className={css({ color: 'gray', mb: '1.5rem' })}>
                    Entre para gerenciar a importação de dados do DataSUS.
                </p>
                <form onSubmit={submit} noValidate>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="username"
                        aria-invalid={Boolean(error)}
                        required
                    />
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'login-error' : undefined}
                        required
                    />
                    <p
                        id="login-error"
                        role="alert"
                        className={css({
                            color: 'red.700',
                            minHeight: '1.5rem',
                            mb: '1rem',
                        })}
                    >
                        {error}
                    </p>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Entrando…' : 'Entrar'}
                    </Button>
                </form>
            </section>
        </main>
    )
}
